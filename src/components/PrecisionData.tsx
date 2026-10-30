import { scrollReveal } from './scrollReveal';
import { motion, useInView, useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GlassCard } from "./GlassCard";
import { Plus } from "lucide-react";

const SmoothWave = ({ isInView }: { isInView: boolean }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;
    const width = 1200;
    const height = 100;
    const amplitude = 30; // Reduced peak-to-valley distance
    const frequency = 4;
    const speed = -0.003;

    let path = "";
    for (let i = 0; i <= width; i += 5) {
      const x = i;
      // Using sine waves gives perfect G2 continuity and smooth interpolation
      const y =
        height / 2 +
        Math.sin((i / width) * Math.PI * 2 * frequency + time * speed) *
          amplitude *
          (0.9 + Math.sin(time * 0.002) * 0.1); // Add a subtle breathing scalar
      path += `${i === 0 ? "M" : "L"} ${x} ${y} `;
    }
    pathRef.current.setAttribute("d", path);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="precision-wave absolute inset-0 flex items-center w-full px-0 z-20"
    >
      <svg
        viewBox="0 0 1200 100"
        className="w-[200%] sm:w-[150%] md:w-[120%] lg:w-[100%] h-full stroke-boom-green fill-none drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          strokeWidth="7"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export function PrecisionData() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="precision"
      className="pt-20 pb-[50px] md:pt-32 md:pb-[50px] relative bg-black overflow-hidden"
    >
      <div className="precision-feature" data-nav-theme="dark">
      {/* Artistic Page Background */}
      <div className="precision-backdrop absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-center items-center">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        ></div>

        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        {/* Ambient Glows */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[#FFFFFF]/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#FFFFFF]/5 rounded-full blur-[150px] mix-blend-screen"></div>
        {/* Gradient overlay to smoothly blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-0 relative z-10 pt-8 pb-4">
          <div className="relative z-10">
            <motion.h3
              {...scrollReveal(0)}
              className="text-boom-green font-display text-lg md:text-xl mb-4 font-medium tracking-wide"
            >
              03 // 16HZ EXTREME PRECISION
            </motion.h3>
            <motion.h2
              {...scrollReveal(0.1)}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-0 font-display"
            >
              {t(
                "心跳不停，感知不止。",
                "Unceasing heartbeat, endless perception.",
              )}
            </motion.h2>
            <motion.p
              {...scrollReveal(0.2)}
              className="precision-description text-boom-text-dim text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto drop-shadow-lg bg-black/40 py-2.5 px-5 rounded-[20px] sm:rounded-full inline-block backdrop-blur-sm leading-relaxed"
            >
              {t(
                "身体时刻都在变化。BOOM ONE 以 16Hz 高频连续采集，",
                "The body is constantly changing. BOOM ONE uses 16Hz high-frequency continuous sampling,",
              )}
              <br />
              {t(
                "记录那些稍纵即逝却至关重要的信号。",
                "recording fleeting yet crucial signals.",
              )}
            </motion.p>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="precision-wave-area relative h-48 sm:h-64 md:h-96 w-full flex items-center justify-center my-6 md:my-10 mb-8 overflow-hidden z-20"
      >
        {/* Abstract visualization of 16Hz vs 1Hz */}

        <div className="absolute inset-0 flex items-center w-full px-0 opacity-30 z-10">
          {/* Slow wave - old tech */}
          <svg
            viewBox="0 0 1000 100"
            className="w-[150%] sm:w-[120%] md:w-full h-full stroke-white/20 fill-none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50 T1000,50"
              strokeWidth="2"
            />
          </svg>
        </div>

        <SmoothWave isInView={isInView} />

        <div className="precision-sampling absolute inset-0 z-[25] pointer-events-none" aria-hidden="true" />

        <div className="precision-edge-left absolute inset-y-0 left-0 w-[25%] md:w-[35%] bg-gradient-to-r from-black to-transparent z-30 pointer-events-none"></div>
        <div className="precision-edge-right absolute inset-y-0 right-0 w-[25%] md:w-[35%] bg-gradient-to-l from-black to-transparent z-30 pointer-events-none"></div>

        <motion.div
          animate={{ scale: [0.95, 1.08, 0.95] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="precision-wave-badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-boom-green/30 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full z-40"
        >
          <span className="font-display text-2xl sm:text-4xl text-white font-bold text-glow">
            16
            <span className="text-sm sm:text-xl text-boom-green ml-1">
              Hz/s
            </span>
          </span>
        </motion.div>
      </div>

      </div>

      <motion.div {...scrollReveal()} className="precision-card-gallery max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="precision-card-wordmark" aria-hidden="true">
          <span>PRECISION</span>
          <span>SYSTEM</span>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start gap-6 md:gap-6 z-10 relative mt-4 md:mt-[100px] pb-0 pt-8 min-h-auto md:min-h-[450px] lg:min-h-[540px]">
          {[
            {
              label: t("心率 HR", "Heart Rate"),
              desc: t(
                "了解身体负荷与运动强度变化",
                "Understand body load & intensity",
              ),
              bg: "/peidai 10.png",
              ui: (
                <div className="absolute bottom-6 left-4 right-4 scale-[0.6] origin-bottom-left group-[.is-active]:scale-[0.62] transition-transform duration-700">
                  <div className="relative w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="rgba(0,0,0,0.4)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="6"
                        strokeDasharray="200"
                        strokeDashoffset="50"
                        className="opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      />
                    </svg>
                    <span className="text-white font-bold text-3xl tracking-tight leading-none">
                      148
                    </span>
                    <span className="text-[9px] text-white/70 font-mono tracking-wider mt-1">
                      BPM / MAX
                    </span>
                  </div>
                </div>
              ),
            },
            {
              label: t("心率变异性 HRV", "Heart Rate Var."),
              desc: t(
                "洞察恢复状态与自主神经平衡",
                "Insight into recovery & balance",
              ),
              bg: "/03-02.jpg", // Gym training
              ui: (
                <div className="absolute bottom-6 left-4 right-4 w-full pr-8 group-[.is-active]:-translate-y-2 transition-transform duration-700">
                  <svg
                    viewBox="0 0 200 60"
                    className="w-full h-16 stroke-[#FFFFFF] fill-none drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                  >
                    <path
                      d="M0,30 L20,30 L30,10 L40,50 L50,30 L80,30 L90,15 L100,45 L110,30 L160,30 L170,20 L180,40 L190,30 L200,30"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ),
            },
            {
              label: t("血氧 SpO₂", "Blood Oxygen"),
              desc: t(
                "监测外周血氧饱和度，辅助观察身体供氧状态。",
                "Observe oxygen utilization",
              ),
              bg: "/03-03.jpg", // Climbing
              ui: (
                <div className="absolute bottom-6 left-4 right-10 h-[90px] flex items-end justify-between px-2 group-[.is-active]:scale-105 transition-transform duration-700">
                  {[...Array(12)].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-2 rounded-full relative group/bar"
                      style={{
                        height: `${Math.max(20, Math.random() * 40 + 20)}%`,
                        backgroundColor: "rgba(255,255,255, 0.2)",
                      }}
                    >
                      <div className="absolute top-0 w-full h-2 bg-[#FFFFFF] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: t("压力 Stress", "Stress Level"),
              desc: t(
                "识别压力累积与身体应激反应",
                "Identify stress accumulation",
              ),
              bg: "/03-04.jpg", // Calm/meditation
              ui: (
                <div className="absolute bottom-6 left-4 right-10 bg-black/60 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 group-[.is-active]:-translate-y-2 transition-transform duration-700 shadow-2xl">
                  <div className="w-7 h-7 rounded-full bg-[#FFFFFF] text-black flex flex-shrink-0 items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-[11px] font-bold tracking-wide">
                      Normal Stress
                    </span>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                      24h Pattern
                    </span>
                  </div>
                </div>
              ),
            },
            {
              label: t("睡眠 Sleep", "Sleep Quality"),
              desc: t(
                "评估夜间恢复与身体修复过程",
                "Evaluate nocturnal recovery",
              ),
              bg: "/04-1.png",
              ui: (
                <div className="absolute bottom-6 left-4 right-8 flex justify-between items-end px-2 group-[.is-active]:-translate-y-2 transition-transform duration-700">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 flex flex-col items-start min-w-[100px] drop-shadow-2xl">
                    <span className="text-[10px] text-white/80 mb-1 uppercase tracking-wider">
                      {t("睡眠时长", "Duration")}
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-display text-white font-semibold">
                        7
                      </span>
                      <span className="text-xs text-white/50 pr-1 mr-1">
                        h
                      </span>
                      <span className="text-xl font-display text-white font-semibold">
                        12
                      </span>
                      <span className="text-xs text-white/50">m</span>
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 flex flex-col items-start min-w-[90px] drop-shadow-2xl">
                    <span className="text-[10px] text-white/80 mb-1 uppercase tracking-wider">
                      {t("恢复性睡眠", "Deep Rate")}
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-display text-[#FFFFFF] font-semibold">
                        28
                      </span>
                      <span className="text-xs text-[#FFFFFF]/80">%</span>
                    </div>
                  </div>
                </div>
              ),
            },
          ].map((stat, i) => {
            const activeIndex = hoveredCard !== null ? hoveredCard : 2;
            const isActive = i === activeIndex;

            const sizeClass = isActive
              ? "w-full md:w-[340px] aspect-[4/5] md:aspect-[4/5] object-cover"
              : "w-full md:w-[220px] aspect-[4/5] md:aspect-[3/4]";
            const zIndexClass = isActive ? "z-20 md:z-[60]" : "z-10";
            const textScale = isActive
              ? "text-2xl lg:text-3xl"
              : "text-sm lg:text-base";
            const descScale = isActive ? "text-sm" : "text-xs";

            return (
              <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                key={i}
                data-metric={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setHoveredCard(i);
                  }
                }}
                viewport={{ amount: 0.6, margin: "-30% 0px -30% 0px" }}
                className={`shrink-0 max-w-[340px] md:max-w-none relative group ${isActive ? "is-active" : ""} cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${sizeClass} ${zIndexClass}`}
              >
                <div className="precision-card-surface absolute inset-0 w-full h-full overflow-hidden rounded-[28px] bg-boom-gray/50 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-[.is-active]:!-translate-y-6 group-[.is-active]:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Playing card decorations */}
                  <div className="absolute top-6 left-6 flex flex-col items-center opacity-80 z-20 transition-opacity duration-500 group-[.is-active]:opacity-100 mix-blend-overlay">
                    <span className="font-mono text-base font-bold text-white leading-none">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] text-boom-green mt-1">▲</span>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-[.is-active]:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay">
                    <div className="w-10 h-[2px] bg-white/40"></div>
                  </div>

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-[.is-active]:scale-110 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ backgroundImage: `url('${stat.bg}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none transition-opacity duration-500 opacity-90 group-[.is-active]:opacity-70"></div>

                  <div className="absolute bottom-28 md:bottom-32 left-6 right-6 z-10 text-left transition-transform duration-700 group-[.is-active]:translate-y-2">
                    <h4
                      className={`text-white font-display font-medium leading-tight mb-2 tracking-wide transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${textScale}`}
                    >
                      {stat.label}
                    </h4>
                    <p
                      className={`text-white/70 font-light leading-relaxed transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-80 group-[.is-active]:opacity-100 ${descScale}`}
                    >
                      {stat.desc}
                    </p>
                  </div>

                  <div className="metric-ui">{stat.ui}</div>

                  <div className="absolute bottom-6 right-6 flex flex-col items-center opacity-80 z-20 transition-opacity duration-500 group-[.is-active]:opacity-100 rotate-180 mix-blend-overlay">
                    <span className="font-mono text-base font-bold text-white leading-none">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] text-boom-green mt-1">▲</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
