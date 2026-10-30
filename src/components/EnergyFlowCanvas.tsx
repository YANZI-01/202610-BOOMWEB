import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { SparklesBackground } from "./SparklesBackground";

interface EnergyFlowCanvasProps {
  score: number;
  children?: React.ReactNode;
}

export function EnergyFlowCanvas({ score, children }: EnergyFlowCanvasProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // High DPI support for sharp lines
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      progress: number;
      speed: number;
      offsetY: number;
      size: number;
      opacity: number;

      constructor() {
        this.progress = Math.random();
        this.speed = Math.random() * 0.005 + 0.002;
        this.offsetY = (Math.random() - 0.5) * 15;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update(scoreRatio: number) {
        this.speed = (Math.random() * 0.002 + 0.001) * (1 + scoreRatio * 3);
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
          this.offsetY = (Math.random() - 0.5) * 15;
        }
      }

      draw(canvasWidth: number, canvasHeight: number, timeVal: number, amplitudeBase: number) {
        const x = this.progress * canvasWidth;
        const waveProgress = this.progress;
        const basePhase = x * 0.005 + timeVal;

        // Amplitude also scales with progress for a right-growing wave
        const currentAmp = amplitudeBase * (0.5 + waveProgress * 0.8);
        let y = canvasHeight / 2 + Math.sin(basePhase) * currentAmp + this.offsetY;

        if (mouseRef.current) {
          const dx = x - mouseRef.current.x;
          if (Math.abs(dx) < 150) {
             const curve = Math.cos((Math.abs(dx) / 150) * (Math.PI / 2));
             y += (mouseRef.current.y - (canvasHeight / 2)) * Math.pow(curve, 2) * 0.6;
          }
        }

        ctx!.beginPath();
        ctx!.arc(x, y, this.size, 0, Math.PI * 2);
        // Particle fades in gradually and shines bright at the right
        const alpha = this.opacity * Math.pow(this.progress, 1.5);
        ctx!.fillStyle = `rgba(240, 245, 255, ${alpha})`;
        ctx!.fill();
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
        particles = [];
        for (let i = 0; i < 60; i++) particles.push(new Particle());
    }
    initParticles();

    let currentScore = score;

    const animate = () => {
      const logicalWidth = canvas.clientWidth;
      const logicalHeight = canvas.clientHeight;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      currentScore += (score - currentScore) * 0.05;
      const normalizedScore = Math.max(0, currentScore) / 100;
      time += 0.015 * (1 + normalizedScore * 1.5);

      const rgb = "240, 245, 255"; // Silvery white

      ctx.globalCompositeOperation = "lighter";

      // Right-facing silvery bright gradient
      const lineGrad = ctx.createLinearGradient(0, 0, logicalWidth, 0);
      lineGrad.addColorStop(0, `rgba(${rgb}, 0)`);
      lineGrad.addColorStop(0.2, `rgba(${rgb}, 0.1)`);
      lineGrad.addColorStop(0.6, `rgba(${rgb}, 0.7)`);
      lineGrad.addColorStop(0.9, `rgba(${rgb}, 1)`);
      lineGrad.addColorStop(1, `rgba(${rgb}, 1)`);

      const amplitudeBase = 15 + normalizedScore * 25;

      const drawWave = (amplitudeOffset: number, phaseOffset: number, lineWidth: number, alphaMultiplier: number) => {
          ctx.beginPath();
          for (let x = 0; x <= logicalWidth; x += 4) {
             const progress = x / logicalWidth;
             let y = logicalHeight / 2;

             // To create "pinches" like in the reference image (nodes)
             const basePhase = x * 0.005 + time + phaseOffset;

             // Amplitude grows gently towards the right
             const waveAmp = (amplitudeBase + amplitudeOffset) * (0.5 + progress * 0.8);

             // Smooth pinch factor to concentrate energy gently
             const env = Math.sin(x * 0.002 - time * 0.5);
             const pinchFactor = 0.3 + 0.7 * (env * env);

             y += Math.sin(basePhase) * waveAmp * pinchFactor;

             if (mouseRef.current) {
                const dx = x - mouseRef.current.x;
                if (Math.abs(dx) < 150) {
                   const dist = Math.abs(dx) / 150;
                   // Use a cosine bell for perfectly smooth C1 continuity at the boundary
                   const curve = (Math.cos(dist * Math.PI) + 1) / 2;
                   const dy = mouseRef.current.y - (logicalHeight / 2);
                   y += dy * curve * 0.6;
                }
             }
             if (x === 0) ctx.moveTo(x, y);
             else ctx.lineTo(x, y);
          }

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = lineGrad;
          ctx.globalAlpha = alphaMultiplier;
          ctx.stroke();
      };

      // Draw elegant layered sine wave
      drawWave(0, 0, 1.5, 1);       // Core thread
      drawWave(2, 0.1, 3, 0.5);     // Glow 1
      drawWave(-2, -0.1, 8, 0.2);   // Glow 2
      drawWave(4, 0.2, 16, 0.05);   // Wide ambient glow

      ctx.globalAlpha = 1;

      // Draw particles following the wave
      const targetCount = Math.floor((normalizedScore) * 100) + 30;
      if (particles.length < targetCount && Math.random() > 0.5) {
          particles.push(new Particle());
      } else if (particles.length > targetCount && Math.random() > 0.5) {
          particles.pop();
      }

      for (let i = 0; i < particles.length; i++) {
         particles[i].update(normalizedScore);
         particles[i].draw(logicalWidth, logicalHeight, time, amplitudeBase);
      }

      ctx.globalCompositeOperation = "source-over";

      if (mouseRef.current) {
        const { x, y } = mouseRef.current;

        ctx.beginPath();
        ctx.arc(x, y, 90, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, 0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.font = "11px monospace";
        ctx.textAlign = "center";

        ctx.fillText(`+${Math.round(currentScore)}% FREQ`, x, y - 24);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [score]);

  return (
    <div
      className="w-[100vw] relative left-1/2 -translate-x-1/2 min-h-[220px] flex items-center justify-center cursor-crosshair group overflow-hidden py-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
       <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw] z-0 overflow-hidden pointer-events-none">
         <SparklesBackground />
       </div>
       <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full block" />

       {children && (
         <div className="relative z-20 pointer-events-none">
           {children}
         </div>
       )}
    </div>
  );
}
