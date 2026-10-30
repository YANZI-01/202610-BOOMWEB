import { scrollReveal } from './scrollReveal';
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Zap, Clock, Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { AnimatedCode } from "./AnimatedCode";

import { EnergyFlowCanvas } from "./EnergyFlowCanvas";
import { SparklesBackground } from "./SparklesBackground";

export function WithoutBoom() {
  const { t } = useLanguage();
  const [score, setScore] = useState(90);
  const [scoreColor, setScoreColor] = useState("text-[#29b6ff]");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const lastUpdateTime = useRef<number>(0);
  const [activeCurve, setActiveCurve] = useState<'early' | 'optimal' | 'late' | 'none'>('optimal');
  const [isWithoutBoomActive, setIsWithoutBoomActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const svgX = (x / rect.width) * 1000;
    const svgY = (y / rect.height) * 350;

    let isInteractive = true;
    if (activeCurve === 'early' && svgX > 440) isInteractive = false;
    if (activeCurve === 'late' && svgX < 620) isInteractive = false;

    if (svgY > 280 || !isInteractive) {
      if (isHovering) setIsHovering(false);
      return;
    } else {
      if (!isHovering) setIsHovering(true);
    }

    if (svgX >= 440 && svgX <= 620) {
      setScore(100);
      setScoreColor("text-[#29b6ff]");
    } else {
      const now = Date.now();
      if (now - lastUpdateTime.current > 100) {
        let finalScore = 0;
        if (svgX >= 390 && svgX < 440) {
          const dist = 440 - svgX;
          finalScore = Math.floor(99 - (dist / 50) * 19);
        } else if (svgX > 620 && svgX <= 670) {
          const dist = svgX - 620;
          finalScore = Math.floor(99 - (dist / 50) * 19);
        } else {
          const distToPeak = Math.min(
            Math.abs(svgX - 250),
            Math.abs(svgX - 650),
            Math.abs(svgX - 745),
            Math.abs(svgX - 885)
          );
          const peakBoost = Math.max(0, 20 - distToPeak / 2);
          const baseRandom = Math.floor(Math.random() * 31) + 30;
          finalScore = Math.floor(Math.min(80, baseRandom + peakBoost));
        }

        setScore(finalScore);
        setScoreColor("text-[#f97316]");
        lastUpdateTime.current = now;
      }
    }
  };

  return (
    <div className="why-boom-page text-white min-h-screen pt-32 pb-40 relative overflow-hidden" data-nav-theme="light">
      {/* SVG Noise filter for grainy texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Background Image with artistic processing */}
      <div
        className="why-boom-hero absolute top-0 left-0 w-full h-[500px] md:h-[800px] opacity-90 pointer-events-none z-0 bg-cover bg-[center_10%] md:bg-center"
        data-nav-theme="dark"
      >
        <img className="why-boom-hero-landscape" src="/why-boom-ridge-v3.png" alt="" aria-hidden="true" fetchPriority="high" />
      </div>

      {/* Dynamic Neon Green Glowing Blobs styling */}
      {/* Ambient background glow lower down */}
      <div className="absolute top-[35%] left-[-10%] w-[600px] h-[600px] bg-[#0F84C4]/20 blur-[160px] rounded-full pointer-events-none mix-blend-screen opacity-50 z-0"></div>

      {/* Ambient background glow near HOW BOOM WORKS */}
      <div className="absolute top-[60%] right-[-10%] w-[700px] h-[700px] bg-[#0F84C4]/15 blur-[180px] rounded-full pointer-events-none mix-blend-multiply opacity-35 z-0"></div>

      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-[#0F84C4]/20 blur-[140px] rounded-full pointer-events-none mix-blend-multiply opacity-35 z-0"></div>

      <div className="why-boom-content max-w-7xl mx-auto px-6 relative z-10 mt-[150px] md:mt-[400px]">
        <div className="why-boom-hero-copy text-center mb-0">
          <motion.h3
            {...scrollReveal(0)}
            className="text-boom-green font-display text-base md:text-lg mb-5 font-medium tracking-[0.18em]"
          >
            {t('WHY BOOM', 'WHY BOOM')}
          </motion.h3>
          <motion.h2
            {...scrollReveal(0.1)}
            className="text-[45px] md:text-6xl lg:text-[78px] font-medium tracking-tight max-w-5xl mx-auto leading-[1.08]"
          >
            <span className="text-white">
              {t('太早，太晚，', 'Too early. Too late. ')}
              <br className="why-boom-hero-break" />
              {t('很少刚刚好。', 'Rarely just right.')}
            </span>
          </motion.h2>
        </div>

        {/* COMPARATIVE CURVE CHART - Inspired by Image 1 */}
        <motion.div
          {...scrollReveal(0)}
          className="why-curve-stage relative w-full mx-auto flex flex-col items-center justify-center"
        >
          <div className="why-curve-card w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden" data-nav-theme="light">
            {/* Header of chart */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-12">
              <div>
                <h3 className="text-3xl md:text-4xl text-white font-medium mb-3 tracking-tight">
                  {t('训练只是开始，', 'Training is just the beginning,')}
                </h3>
                <p className="text-boom-text-dim max-w-xl text-sm md:text-base leading-relaxed">
                  {t('真正的进步，发生在恢复之后。', 'Real progress happens after recovery.')}
                </p>
              </div>
              <div className="mt-8 md:mt-0 text-left md:text-right shrink-0">
                <div className={`text-5xl md:text-6xl font-medium mb-1 tracking-tighter transition-colors duration-300 ${scoreColor}`}>
                  {score}<span className="text-3xl md:text-4xl text-white/30 font-light">/100</span>
                </div>
                <div className="text-xs md:text-sm text-boom-text-dim">
                  {t('把握最佳恢复时机', 'Seize the optimal window')}
                </div>
              </div>
            </div>

            {/* Chart Graphic Area */}
            <div className="why-curve-chart w-full mt-10 relative overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4 md:pb-0">
               <div
                 className={`why-curve-plot min-w-[800px] w-full h-[280px] md:h-[350px] relative ${isHovering ? 'cursor-none' : ''}`}
                 onMouseMove={handleMouseMove}
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
               >
                 {isHovering && (
                   <motion.div
                     className="absolute pointer-events-none z-50 flex flex-col items-center gap-1"
                     animate={{ x: mousePos.x - 45, y: mousePos.y - 40 }}
                   >
                     <motion.div
                       className="text-4xl"
                       animate={{ rotate: [-15, 15, -15] }}
                       transition={{ rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                     >
                       💪
                     </motion.div>
                     <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[#7dd6ff] text-sm font-medium tracking-wide whitespace-nowrap">
                       {t('再次训练', 'Train Again')}
                     </span>
                   </motion.div>
                 )}
                 <svg
                   viewBox="0 0 1000 350"
                   className="w-full h-full overflow-visible transition-colors"
                   preserveAspectRatio="none"
                 >
                  <defs>
                    <linearGradient id="boomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0F84C4" />
                      <stop offset="100%" stopColor="#6fd5ff" />
                    </linearGradient>
                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fdba74" />
                    </linearGradient>
                    <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(15,132,196,0.22)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </linearGradient>
                    <linearGradient id="orangeWindowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(234,88,12,0.3)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </linearGradient>
                  </defs>
                  {/* Solid Axes */}
                  <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5">
                    <path d="M 100 0 L 100 300" />
                    <path d="M 100 300 L 950 300" />
                  </g>

                  {/* Dashed Grid Lines */}
                  <g stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4">
                    {/* Target Vertical lines */}
                    <path d="M 440 0 L 440 300" stroke="rgba(15,132,196,0.24)" />
                    <path d="M 620 0 L 620 300" stroke="rgba(15,132,196,0.24)" />
                    <path d="M 330 0 L 330 300" stroke="rgba(255,255,255,0.1)" />
                    <path d="M 730 0 L 730 300" stroke="rgba(255,255,255,0.1)" />
                  </g>

                  {/* Axis Labels and Interactive Buttons */}
                  <g fill="rgba(255,255,255,0.3)" fontSize="12" className="font-mono">
                    <foreignObject x="450" y="310" width="160" height="30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCurve('optimal');
                        }}
                        className={`w-full h-full rounded-full text-xs font-mono transition-all duration-300 border shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center ${activeCurve === 'optimal' ? 'border-[#29b6ff] text-[#7dd6ff] bg-[#0F84C4]/20 shadow-lg shadow-[#0F84C4]/20' : 'border-white/20 text-white/70 hover:text-[#7dd6ff] hover:border-[#29b6ff]/50 hover:bg-white/5 bg-black/40 backdrop-blur-sm'}`}
                      >
                        {t('最佳时机', 'Optimal Timing')}
                      </button>
                    </foreignObject>

                    <foreignObject x="250" y="310" width="160" height="30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCurve('early');
                          setScore(70);
                          setScoreColor("text-[#f97316]");
                        }}
                        className={`w-full h-full rounded-full text-xs font-mono transition-all duration-300 border shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center ${activeCurve === 'early' ? 'border-[#f97316] text-[#f97316] bg-[#f97316]/20 shadow-lg shadow-[#f97316]/20' : 'border-white/20 text-white/70 hover:text-[#f97316] hover:border-[#f97316]/50 hover:bg-white/5 bg-black/40 backdrop-blur-sm'}`}
                      >
                        {t('过早训练', 'Train Too Early')}
                      </button>
                    </foreignObject>

                    <foreignObject x="650" y="310" width="160" height="30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCurve('late');
                          setScore(60);
                          setScoreColor("text-[#f97316]");
                        }}
                        className={`w-full h-full rounded-full text-xs font-mono transition-all duration-300 border shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center ${activeCurve === 'late' ? 'border-[#f97316] text-[#f97316] bg-[#f97316]/20 shadow-lg shadow-[#f97316]/20' : 'border-white/20 text-white/70 hover:text-[#f97316] hover:border-[#f97316]/50 hover:bg-white/5 bg-black/40 backdrop-blur-sm'}`}
                      >
                        {t('过晚训练', 'Train Too Late')}
                      </button>
                    </foreignObject>

                    <text x="950" y="325" alignmentBaseline="middle" textAnchor="end" className="uppercase tracking-widest text-[10px]">{t('刺激时机 - 越精准越好', 'Timing - Precision is better')}</text>
                  </g>

                  <g fill="rgba(255,255,255,0.3)" fontSize="12" className="font-mono" style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 150px' }}>
                    <text x="80" y="150" textAnchor="middle" className="uppercase tracking-widest text-[10px]">{t('表现水平 - 越高越好', 'Performance - Higher is better')}</text>
                  </g>

                  {/* Curves */}
                  {/* Next Best Competitor (Without BOOM 01) */}
                  <motion.path
                    d="M 100 250 C 200 100, 300 100, 400 160 C 475 200, 550 230, 620 245 S 840 275, 950 275"
                    fill="none"
                    stroke={activeCurve === 'early' ? 'url(#orangeGradient)' : (activeCurve === 'none' || activeCurve === 'optimal' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)')}
                    strokeWidth={activeCurve === 'early' ? "5" : "4"}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  />
                  <text x="950" y="260" fill={activeCurve === 'early' ? '#fdba74' : (activeCurve === 'none' || activeCurve === 'optimal' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)')} fontSize="14" className="font-medium" textAnchor="end" style={{ transition: 'fill 0.3s' }}>
                    WITHOUT BOOM <tspan dy="-5" fontSize="10">01</tspan>
                  </text>

                  {/* Next Best Competitor (Without BOOM 02) */}
                  <motion.path
                    d="M 100 250 C 200 100, 300 100, 400 160 C 450 175, 570 115, 620 115 C 650 115, 660 155, 690 155 C 720 155, 730 135, 760 135 C 790 135, 800 175, 830 175 C 860 175, 870 155, 900 155 C 930 155, 940 195, 950 195"
                    fill="none"
                    stroke={activeCurve === 'late' ? 'url(#orangeGradient)' : (activeCurve === 'none' || activeCurve === 'optimal' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)')}
                    strokeWidth={activeCurve === 'late' ? "5" : "4"}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  />
                  <text x="950" y="143" fill={activeCurve === 'late' ? '#fdba74' : (activeCurve === 'none' || activeCurve === 'optimal' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)')} fontSize="14" className="font-medium" textAnchor="end" style={{ transition: 'fill 0.3s' }}>
                    WITHOUT BOOM <tspan dy="-5" fontSize="10">02</tspan>
                  </text>

                  {/* Early Training Window Highlight */}
                  <rect x="100" y="0" width="340" height="300" fill="url(#orangeWindowGradient)" style={{ opacity: activeCurve === 'early' ? 1 : 0, transition: 'opacity 0.3s' }} />

                  {/* Supercompensation Window Highlight */}
                  <rect x="440" y="0" width="180" height="300" fill="url(#windowGradient)" style={{ opacity: activeCurve === 'optimal' || activeCurve === 'none' ? 1 : 0.3, transition: 'opacity 0.3s' }} />
                  <text x="530" y="30" fill={activeCurve === 'optimal' || activeCurve === 'none' ? '#7dd6ff' : 'rgba(15,132,196,0.34)'} fontSize="12" textAnchor="middle" className="font-medium tracking-widest">{t('超量恢复窗口', 'Supercompensation window')}</text>

                  {/* Late Training Window Highlight */}
                  <rect x="620" y="0" width="330" height="300" fill="url(#orangeWindowGradient)" style={{ opacity: activeCurve === 'late' ? 1 : 0, transition: 'opacity 0.3s' }} />

                  {/* Sonic (With BOOM) - Neon Curve */}
                  <motion.path
                    d="M 100 250 C 160 150, 210 100, 280 100 C 350 100, 380 175, 440 175 C 500 175, 550 70, 620 70 C 680 70, 720 100, 780 100 C 850 100, 880 40, 950 40"
                    fill="none"
                    stroke={activeCurve === 'optimal' || activeCurve === 'none' ? 'url(#boomGradient)' : 'rgba(255,255,255,0.05)'}
                    strokeWidth={activeCurve === 'optimal' ? "6" : "4"}
                    strokeLinecap="round"
                    style={{ filter: activeCurve === 'optimal' || activeCurve === 'none' ? 'drop-shadow(0px 0px 10px rgba(41,182,255,0.48))' : 'none' }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />

                  <text x="950" y="32" fill={activeCurve === 'optimal' || activeCurve === 'none' ? '#fff' : 'rgba(255,255,255,0.1)'} fontSize="14" className="font-medium" textAnchor="end" style={{ transition: 'fill 0.3s' }}>
                    WITH BOOM<tspan dy="-5" fontSize="10" fill="transparent" style={{ pointerEvents: 'none', userSelect: 'none' }}> 01</tspan>
                  </text>
               </svg>
               </div>
            </div>
            <div className="mt-4 pb-2 md:pb-0 text-left text-[10px] text-white/20 tracking-wider">
              {t('* 注：曲线经过艺术化处理，实际身体数值变化更加复杂', '* Note: Curves are artistically stylized, actual physiological changes are more complex')}
            </div>
          </div>
        </motion.div>

        <div className="why-comparison grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Side - Without Boom */}
          <motion.div
            {...scrollReveal(0)}
            onViewportEnter={() => {
              if (typeof window !== "undefined" && window.innerWidth < 1024) {
                setIsWithoutBoomActive(true);
              }
            }}
            className={`why-comparison-card why-comparison-without group bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-start shadow-xl h-full cursor-default transition-all duration-500 ${isWithoutBoomActive ? 'is-active' : ''}`}
            data-nav-theme="dark"
          >
            <div className="mb-10 text-left">
              <h3 className="text-2xl font-medium text-white/40 group-hover:text-white group-[.is-active]:text-white transition-colors duration-500 mb-3">WITHOUT BOOM</h3>
              <p className="text-white/30 group-hover:text-white/80 group-[.is-active]:text-white/80 font-light leading-relaxed transition-colors duration-500">
                {t('即使已有运动手表，你仍能看到配速、功率和训练负荷，但下一次\n训练是否仍该按计划进行，往往还需要自己判断。', 'Even with a sports watch, you can still see pace, power, and training load, but deciding whether the next training should still proceed as planned often requires your own judgment.')}
              </p>
            </div>

            {/* Inner Workflow Blocks - Inspired by Image 2 Left Card */}
            <div className="space-y-4">
              <div className="bg-black/50 group-hover:bg-black group-[.is-active]:bg-black rounded-2xl p-5 border border-white/5 backdrop-blur-sm transition-colors duration-500">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#f97316] transition-colors duration-500" />
                    <span className="font-medium text-sm text-[#f97316] transition-colors duration-500">{t('记录已经发生的训练', 'Recording past training')}</span>
                  </div>
                  <div className="text-[10px] text-[#f97316] bg-[#f97316]/10 group-hover:bg-[#f97316]/15 group-[.is-active]:bg-[#f97316]/15 border border-[#f97316]/20 px-2 py-1 rounded transition-colors duration-500">{t('已记录', 'Recorded')}</div>
                </div>
                <p className="text-xs lg:text-sm text-white/30 group-hover:text-white/70 group-[.is-active]:text-white/70 transition-colors duration-500">{t('配速、功率、GPS与训练负荷，告诉你这次训练发生了什么。', 'Pace, power, GPS, and training load tell you what happened in this training.')}</p>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-[1px] h-6 bg-white/10 group-hover:bg-white/20 group-[.is-active]:bg-white/20 relative transition-colors duration-500">
                  <div className="w-2 h-2 rounded-full border border-white/10 group-hover:border-white/30 group-[.is-active]:border-white/30 bg-[#0a0a0a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500"></div>
                </div>
              </div>

              <div className="bg-black/50 group-hover:bg-black group-[.is-active]:bg-black rounded-2xl p-5 border border-white/5 backdrop-blur-sm transition-colors duration-500">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f97316] transition-colors duration-500" />
                    <span className="font-medium text-sm text-[#f97316] transition-colors duration-500">{t('下一步仍需自己判断', 'Next step still requires self-judgment')}</span>
                  </div>
                  <div className="text-[10px] text-[#f97316] bg-[#f97316]/10 group-hover:bg-[#f97316]/15 group-[.is-active]:bg-[#f97316]/15 border border-[#f97316]/20 px-2 py-1 rounded transition-colors duration-500">{t('待判断', 'Uncertain')}</div>
                </div>
                <p className="text-xs lg:text-sm text-white/30 group-hover:text-white/70 group-[.is-active]:text-white/70 transition-colors duration-500">{t('身体状态持续变化，原定训练未必仍然适合今天。', 'The body state continues to change, and the planned training may not still be suitable for today.')}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - With Boom */}
          <motion.div
            {...scrollReveal(0.1)}
            className="relative lg:col-span-1 h-full"
            data-nav-theme="dark"
          >
            {/* Back Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0F84C4] to-[#6fd5ff] rounded-3xl blur-[20px] opacity-30 z-0"></div>

            {/* Neon Border Wrapper */}
            <div className="why-comparison-card why-comparison-with rounded-3xl p-[2px] relative h-full flex flex-col z-10 bg-gradient-to-r from-[#0F84C4] to-[#6fd5ff] shadow-2xl">
              <div className="bg-black rounded-[22px] h-full relative overflow-hidden flex flex-col justify-start p-8 lg:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6fd5ff]/20 blur-[60px] rounded-full pointer-events-none mix-blend-screen z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F84C4]/18 blur-[60px] rounded-full pointer-events-none mix-blend-screen z-0"></div>

                <div className="mb-10 text-left relative z-10">
              <h3 className="text-2xl font-medium text-white mb-3">WITH BOOM</h3>
              <p className="text-white/60 font-light leading-relaxed">
                {t('BOOM持续感知训练之外的身体变化，并将状态变化转化为下一次训练决策。', 'BOOM continuously senses body changes outside of training and translates these state changes into the next training decision.')}
              </p>
            </div>

            {/* Inner Workflow Blocks - Inspired by Image 2 Left Card */}
            <div className="mt-auto relative z-10 space-y-4">
              <div className="bg-[#111111] rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative overflow-hidden">
                 <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-white">
                     <CheckCircle2 className="w-4 h-4 text-[#29b6ff]" />
                     <span className="font-medium text-sm">{t('持续感知身体变化', 'Continuously sensing body changes')}</span>
                   </div>
                   <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-[#7dd6ff]">{t('实时', 'Live')}</div>
                 </div>
                 <p className="text-xs lg:text-sm text-white/70">
                   {t('融合连续生理信号、睡眠、生活压力与主观感受，动态更新当前状态。', 'Integrating continuous physiological signals, sleep, life stress, and subjective feelings to dynamically update the current state.')}
                 </p>
               </div>

               <div className="flex justify-center -my-2 relative z-10">
                 <div className="w-[1px] h-6 bg-white/20 relative">
                   <div className="w-2 h-2 rounded-full border border-white/30 bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                 </div>
               </div>

               <div className="bg-[#111111] rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-white">
                      <Zap className="w-4 h-4 text-[#29b6ff]" />
                      <span className="font-medium text-sm">{t('给出下一次训练决策', 'Providing the next training decision')}</span>
                    </div>
                    <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-[#7dd6ff]">{t('决策', 'Action')}</div>
                  </div>
                 <p className="text-xs lg:text-sm text-white/70">
                   {t('超量复黄金窗口 18:00一22:00，训练建议按原计划执行', 'Supercompensation golden window 18:00-22:00, training recommendations carried out as planned')}
                 </p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

        <motion.div
           {...scrollReveal(0)}
           className="why-energy-section mt-32 w-full relative left-1/2 -translate-x-1/2 z-20"
           data-nav-theme="light"
        >
          <EnergyFlowCanvas score={score}>
            <div className="why-energy-copy text-center w-full mx-auto px-4 pointer-events-none">
              <h3 className="text-boom-green font-display text-xl mb-4 font-medium tracking-wide uppercase">How Boom Works</h3>
              <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-6">
                {t('自由能恢复判断算法', 'Free Energy Algorithm')}
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                {t('传统模型关注你', 'Traditional models focus on how much you ')}<span className="text-white font-medium">{t('消耗了多少', 'consumed')}</span>{t('，', ', ')}<br />{t('而 BOOM 关注你', 'while BOOM focuses on how much you ')}<span className="text-[#7dd6ff] font-medium">{t('还剩多少', 'have left')}</span>{t('。', '.')}
              </p>
            </div>
          </EnergyFlowCanvas>
        </motion.div>

        <motion.div {...scrollReveal()} className="why-method-grid max-w-6xl mx-auto px-4 md:px-6 mt-[2px] relative z-30" data-nav-theme="dark">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw] z-20 overflow-hidden pointer-events-none">
            <SparklesBackground />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              {/* Card 01 */}
              <div className="rounded-[24px] p-[2px] transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-transparent to-transparent hover:from-[#0F84C4] hover:to-[#6fd5ff] group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#0F84C4] to-[#6fd5ff] rounded-[24px] blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-[-1]"></div>
                <div className="w-full h-full bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-transparent group-hover:bg-black/80 group-hover:backdrop-blur-2xl rounded-[22px] relative overflow-hidden transition-all duration-500 flex flex-col justify-start">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/kapian-01.jpg')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                  <div className="relative z-10 p-6 md:p-8 pointer-events-none">
                    <div className="text-white/50 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4 transition-colors tracking-widest uppercase"><span className="text-[#29b6ff]/70 group-hover:text-[#7dd6ff] transition-colors">01</span> <span className="group-hover:text-white transition-colors">/ Dynamic Balance</span></div>
                    <h4 className="flex items-center gap-3 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-tight">
                       <div className="w-5 h-5 rounded-full border border-dashed border-[#29b6ff] flex items-center justify-center animate-spin-slow opacity-60 shrink-0">
                          <div className="w-1 h-1 rounded-full bg-[#29b6ff]"></div>
                       </div>
                       {t('量化真实可用能量', 'Quantify True Available Energy')}
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                      {t('BOOM 将训练负荷、恢复指标、生活疲劳与连续生理信号整合进统一框架，模拟人体能量供给、消耗、恢复与适应的动态过程，量化当前仍可直接支配的有效能量——', 'BOOM integrates training load, recovery indicators, lifestyle fatigue, and continuous physiological signals into a unified framework, simulating the dynamic processes of human energy supply, consumption, recovery, and adaptation, to quantify the effective energy still directly at your disposal - ')}<strong className="text-white/80">{t('自由能', 'Free Energy')}</strong>{t('。', '.')}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-end mb-2">
                         <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{t('当前可用自由能', 'Current Free Energy')}</div>
                         <div className="text-[#7dd6ff] text-xs font-mono font-bold">85%</div>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div
                           initial={{ width: 0 }}
                           whileInView={{ width: '85%' }}
                           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                           className="h-full bg-gradient-to-r from-[rgba(15,132,196,0.5)] to-[#29b6ff] rounded-full relative"
                         >
                            <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                         </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 02 */}
              <div className="rounded-[24px] p-[2px] transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-transparent to-transparent hover:from-[#0F84C4] hover:to-[#6fd5ff] group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#0F84C4] to-[#6fd5ff] rounded-[24px] blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-[-1]"></div>
                <div className="w-full h-full bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-transparent group-hover:bg-black/80 group-hover:backdrop-blur-2xl rounded-[22px] relative overflow-hidden transition-all duration-500 flex flex-col justify-start">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/kapian-02.jpg')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                  <div className="relative z-10 p-6 md:p-8 pointer-events-none">
                    <div className="text-white/50 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4 transition-colors tracking-widest uppercase"><span className="text-[#29b6ff]/70 group-hover:text-[#7dd6ff] transition-colors">02</span> <span className="group-hover:text-white transition-colors">/ Continuous Tracking</span></div>
                    <h4 className="flex items-center gap-3 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-tight">
                       <div className="w-5 h-5 flex items-end justify-center gap-[2px] opacity-60 pb-0.5 shrink-0">
                          <div className="w-[2px] h-2.5 bg-white/40 group-hover:bg-white rounded-t-sm transition-colors duration-500"></div>
                          <div className="w-[2px] h-5 bg-[#29b6ff]/60 group-hover:bg-[#29b6ff] rounded-t-sm transition-colors duration-500 delay-75"></div>
                          <div className="w-[2px] h-3 bg-white/40 group-hover:bg-white rounded-t-sm transition-colors duration-500 delay-150"></div>
                       </div>
                       {t('追踪微观恢复轨迹', 'Track Micro-Recovery Trajectory')}
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                      {t('自由能直观反映疲劳程度。数值越高，代表剩余可用能量越多；数值越低，代表恢复需求越高。算法持续感知并更新你的状态。', 'Free energy reflects your fatigue level. Higher values mean more available energy; lower values mean higher recovery needs. The algorithm continuously senses and updates your state.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 03 */}
              <div className="rounded-[24px] p-[2px] transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-transparent to-transparent hover:from-[#0F84C4] hover:to-[#6fd5ff] group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#0F84C4] to-[#6fd5ff] rounded-[24px] blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-[-1]"></div>
                <div className="w-full h-full bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-transparent group-hover:bg-black/80 group-hover:backdrop-blur-2xl rounded-[22px] relative overflow-hidden transition-all duration-500 flex flex-col justify-start">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0 bg-cover bg-center focus:opacity-100" style={{ backgroundImage: "url('/kapian-03.jpg')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                  <div className="relative z-10 p-6 md:p-8 pointer-events-none">
                    <div className="text-white/50 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4 transition-colors tracking-widest uppercase"><span className="text-[#29b6ff]/70 group-hover:text-[#7dd6ff] transition-colors">03</span> <span className="group-hover:text-white transition-colors">/ Optimal Timing</span></div>
                    <h4 className="flex items-center gap-3 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-tight">
                       <div className="w-5 h-5 flex items-center justify-center opacity-60 shrink-0">
                           <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M 10 90 Q 50 10, 90 90" stroke="var(--why-blue, #29b6ff)" strokeWidth="8" fill="none" strokeLinecap="round" className="stroke-dasharray-100 stroke-dashoffset-100 group-hover:stroke-dashoffset-0 transition-all duration-1000 ease-out" />
                              <circle cx="50" cy="50" r="10" fill="var(--why-blue, #29b6ff)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500" />
                           </svg>
                       </div>
                       {t('捕捉下一次巅峰', 'Catch the Next Peak')}
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                      {t('基于自由能的变化趋势，系统能够精准判断超量恢复的顶点，帮助你在身体准备最充分的一刻，进行下一次训练。', 'Based on the trend of free energy changes, the system accurately pinpoints the peak of supercompensation, helping you train right when your body is most prepared.')}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-end mb-2">
                         <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{t('预计巅峰出现于', 'Peak Expected In')}</div>
                         <div className="text-[#7dd6ff] text-xs font-mono font-bold flex items-center gap-1.5">
                            <Clock className="w-3 h-3 opacity-70" />
                            <span>14H : 32M</span>
                         </div>
                      </div>
                      <div className="flex gap-1 h-2">
                         {[...Array(6)].map((_, i) => (
                           <div key={i} className="flex-1 h-full bg-white/5 rounded-sm overflow-hidden border border-white/[0.02]">
                             {i < 4 && (
                               <motion.div
                                 initial={{ width: 0 }}
                                 whileInView={{ width: '100%' }}
                                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * i }}
                                 className={`h-full ${i === 3 ? 'bg-[#29b6ff] animate-pulse' : 'bg-white/20'}`}
                               />
                             )}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Code / Abstract Visual */}
            <div className="lg:col-span-7 mt-6 md:mt-8 lg:mt-0 flex flex-col items-start w-full">
               <motion.div
                 layout
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="why-code-card bg-black/60 backdrop-blur-xl rounded-[32px] border border-white/10 overflow-hidden shadow-2xl group w-full flex flex-col shrink-0 relative h-[450px] sm:h-[600px] lg:h-[720px]"
               >
                 <motion.div
                   animate={{
                     opacity: [0.3, 0.7, 0.3],
                     scale: [1, 1.03, 1],
                     backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent z-0 pointer-events-none rounded-[32px] bg-[length:150%_150%]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 z-0 pointer-events-none"></div>

                 {/* Window Header */}
                 <div className="flex items-center px-6 py-4 bg-black/20 border-b border-white/5 relative z-10 shrink-0">
                    <div className="flex gap-2 shrink-0">
                       <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80 flex items-center justify-center group-hover:bg-[#ff5f56] transition-colors"><span className="opacity-0 group-hover:opacity-60 text-[8px] text-[#4d0000]">x</span></div>
                       <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 flex items-center justify-center group-hover:bg-[#ffbd2e] transition-colors"><span className="opacity-0 group-hover:opacity-60 text-[8px] text-[#4d2a00]">-</span></div>
                       <div className="w-3 h-3 rounded-full bg-[#27c93f]/80 flex items-center justify-center group-hover:bg-[#27c93f] transition-colors"><span className="opacity-0 group-hover:opacity-60 text-[8px] text-[#003300]">+</span></div>
                    </div>
                    <div className="ml-6 text-[10px] md:text-xs font-mono text-white/30 tracking-widest uppercase flex items-center gap-2 truncate">
                       <span className="text-white/60 hidden sm:inline">projects/boom</span>
                       <span className="opacity-50">src/core/FreeEnergyEngine.ts</span>
                    </div>
                 </div>

                 {/* Code / Content Area */}
                 <AnimatedCode />
               </motion.div>
               <div className="mt-[23px] text-right text-white/30 text-xs font-mono px-2 self-end shrink-0">
                  注：该代码卡片仅为艺术处理
               </div>
            </div>
          </div>

        </motion.div>

        <motion.div
          {...scrollReveal(0)}
          className="why-boom-cta mt-32 text-center relative z-20 max-w-4xl mx-auto"
        >
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#29b6ff] to-transparent mx-auto mb-12 origin-center"
          />

          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-medium tracking-tight leading-[1.3] md:leading-[1.2] mb-12 relative flex flex-wrap justify-center space-x-1">
            <motion.span
              {...scrollReveal(0.1)}
              className="text-white"
            >
              {t('同样的努力，', 'The same effort,')}
            </motion.span>

            <motion.span
              {...scrollReveal(0.3)}
              className="text-white"
            >
              {t('不同的结果。', 'different results.')}
            </motion.span>

            <motion.span
              {...scrollReveal(0.6)}
              className="block text-[#0F84C4] mt-2 w-full pb-2"
            >
              {t('找到属于你的最佳时机', 'Find your optimal timing')}
            </motion.span>
          </h2>

          <motion.div
            {...scrollReveal(1)}
            className="inline-block mt-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0F84C4] rounded-2xl blur-md opacity-14 group-hover:opacity-25 transition duration-1000 group-hover:duration-500"></div>
              <div className="relative bg-black/60 border border-white/10 backdrop-blur-xl px-8 py-5 rounded-2xl flex flex-col md:flex-row items-center gap-4">
                <span className="text-3xl md:text-4xl tracking-wider font-bold text-white">
                  BOOM
                </span>
                <span className="hidden md:block w-[1px] h-10 bg-white/20"></span>
                <span className="text-lg md:text-2xl text-white/80 font-light tracking-wide text-center md:text-left">
                  {t('帮助运动者安全稳定地提升运动表现', 'Helps athletes safely and steadily improve sports performance')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
