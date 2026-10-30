import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import fragmentSource from '../shaders/human-flow.frag.glsl?raw';

const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

/** Cool grey-white and a gently moving blue ribbon, rendered with one triangle. */
export function WavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: false, antialias: false, depth: false, stencil: false,
      // Backdrop filters may sample between our 30fps draws. Keep the last
      // complete frame instead of exposing a discarded (black) buffer.
      powerPreference: 'low-power', preserveDrawingBuffer: true,
    });
    if (!gl) {
      canvas.dataset.status = 'fallback';
      return;
    }

    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let previousTime: number | null = null;
    let lost = false;
    let disposed = false;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Unable to allocate shader');
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || 'Unable to compile shader');
      }
      return shader;
    };

    const release = () => {
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };

    try {
      const vertex = compile(gl.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
      program = gl.createProgram();
      if (!program) throw new Error('Unable to allocate program');
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Unable to link shader');
      }
      gl.useProgram(program);
      buffer = gl.createBuffer();
      if (!buffer) throw new Error('Unable to allocate triangle');
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name: string) => gl.getUniformLocation(program!, name);
      const scene = uniform('u_scene');
      const paper = [245, 245, 247];
      gl.clearColor(paper[0] / 255, paper[1] / 255, paper[2] / 255, 1);
      gl.uniform3f(uniform('u_paper'), paper[0] / 255, paper[1] / 255, paper[2] / 255);
      const draw = () => {
        gl.uniform4f(scene, canvas.width, canvas.height, elapsed * .4, 4);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      const resize = () => {
        if (lost || disposed) return;
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const limits = gl.getParameter(gl.MAX_VIEWPORT_DIMS) as Int32Array;
        canvas.width = Math.max(1, Math.min(Math.round(rect.width * ratio), limits[0]));
        canvas.height = Math.max(1, Math.min(Math.round(rect.height * ratio), limits[1]));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        draw();
      };
      const tick = (now: number) => {
        frame = 0;
        if (disposed || lost || document.hidden || reducedMotion.matches) return;
        // Slow ambient motion needs only 30fps; time remains wall-clock based.
        if (now - lastFrame >= 1000 / 30) {
          if (previousTime !== null) elapsed += Math.min((now - previousTime) / 1000, .1);
          previousTime = now;
          lastFrame = now;
          draw();
        }
        frame = requestAnimationFrame(tick);
      };
      const syncAnimation = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = null;
        if (!disposed && !lost && !document.hidden) {
          if (reducedMotion.matches) draw();
          else frame = requestAnimationFrame(tick);
        }
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        lost = true;
        cancelAnimationFrame(frame);
        canvas.dataset.status = 'fallback';
      };
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      document.addEventListener('visibilitychange', syncAnimation);
      reducedMotion.addEventListener('change', syncAnimation);
      canvas.addEventListener('webglcontextlost', contextLost);
      resize();
      canvas.dataset.status = 'ready';
      syncAnimation();

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        document.removeEventListener('visibilitychange', syncAnimation);
        reducedMotion.removeEventListener('change', syncAnimation);
        canvas.removeEventListener('webglcontextlost', contextLost);
        release();
      };
    } catch (error) {
      canvas.dataset.status = 'fallback';
      console.error('Waves background:', error);
      release();
    }
  }, [pathname]);

  if (!['/', '/without-boom', '/brand'].includes(pathname)) return null;

  return (
    <div className="waves-background" aria-hidden="true">
      <div className="waves-viewport"><canvas ref={canvasRef} /></div>
    </div>
  );
}
