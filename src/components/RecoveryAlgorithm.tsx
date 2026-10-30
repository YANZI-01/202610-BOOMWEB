import { scrollReveal } from './scrollReveal';
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { GlassCard } from "./GlassCard";
import { RefreshCw } from "lucide-react";

export function RecoveryAlgorithm() {
  const { t } = useLanguage();
  return (
    <section
      id="recovery"
      className="pt-10 pb-20 md:pt-16 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto relative"
    >
      <div className="text-center mb-16 md:mb-24">
        <motion.h3
          {...scrollReveal(0)}
          className="text-boom-green font-display text-lg md:text-xl mb-4 font-medium tracking-wide"
        >
          04 // TRUE RECOVERY™
        </motion.h3>
        <motion.h2
          {...scrollReveal(0.1)}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display"
        >
          {t(
            "懂你的身体状态，更懂",
            "Understands your body's state, knows the best ",
          )}
          <br className="md:hidden" />
          <span className="text-boom-green text-glow">
            {t("最佳恢复与训练时机。", "timing for recovery and training.")}
          </span>
        </motion.h2>
        <motion.p
          {...scrollReveal(0.2)}
          className="text-boom-text-dim text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto"
        >
          {t(
            "真正的进步，发生在恢复期间",
            "Real progress happens during recovery.",
          )}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
        <motion.div
          {...scrollReveal(0)}
          className="relative h-[420px] sm:h-[480px] md:h-[550px] lg:col-span-8"
        >
          <GlassCard className="w-full h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-boom-gray/30 border border-white/10 rounded-[24px] md:rounded-[40px] relative overflow-hidden">
            {/* Text Header (Now higher z-index to overlay image) */}
            <div className="relative z-40 bg-black/40 p-3 sm:p-4 rounded-xl backdrop-blur-md inline-block self-start border border-white/5 -mt-6 sm:-mt-8 ml-2 sm:ml-4">
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                {t("恢复判断算法", "Recovery Algorithm")}
              </h4>
              <p className="text-boom-text-dim text-xs md:text-sm">
                {t(
                  "告别冰冷静止的分数。",
                  "Say goodbye to cold, static scores.",
                )}
                <br />
                {t(
                  "你的身体不是一个数字，而是一个持续变化的过程。",
                  "Your body isn't a number, but a continuously changing process.",
                )}
              </p>
            </div>

            {/* Full Custom Supercompensation Curve Chart */}
            <div className="absolute inset-0 top-[28%] md:top-1/4 left-0 w-full h-[72%] md:h-3/4 overflow-x-auto overflow-y-hidden overscroll-x-contain md:overflow-visible pointer-events-auto select-none z-20 scrollbar-hide">
              <div className="min-w-[500px] md:min-w-0 w-full h-full relative px-4">
                <svg
                  viewBox="0 0 500 300"
                  className="w-full h-full fill-none overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="curveGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="4%" stopColor="rgba(15,132,196,0.85)" />
                      <stop offset="24%" stopColor="#39c9ff" />
                      <stop offset="68%" stopColor="#39c9ff" />
                      <stop offset="88%" stopColor="rgba(255,255,255,0.7)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                    </linearGradient>
                    <pattern
                      id="diagonalHatch"
                      patternUnits="userSpaceOnUse"
                      width="10"
                      height="10"
                    >
                      <line
                        x1="-2"
                        y1="12"
                        x2="12"
                        y2="-2"
                        stroke="rgba(57,201,255,0.2)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  {/* Axes */}
                  <line
                    x1="10"
                    y1="290"
                    x2="10"
                    y2="10"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="10,10 7,15 13,15"
                    fill="rgba(255,255,255,0.4)"
                  />
                  <line
                    x1="10"
                    y1="290"
                    x2="495"
                    y2="290"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="495,290 490,287 490,293"
                    fill="rgba(255,255,255,0.4)"
                  />

                  {/* Baseline */}
                  <line
                    x1="10"
                    y1="180"
                    x2="500"
                    y2="180"
                    stroke="rgba(255,255,255,0.3)"
                    strokeDasharray="4,4"
                    strokeWidth="1"
                  />

                  {/* Vertical Guides for the 4 parts */}
                  <line
                    x1="120"
                    y1="60"
                    x2="120"
                    y2="290"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                  />
                  <line
                    x1="240"
                    y1="60"
                    x2="240"
                    y2="180"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                  />
                  <line
                    x1="440"
                    y1="60"
                    x2="440"
                    y2="180"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                  />

                  {/* Supercompensation Window Bracket */}
                  <path
                    d="M 240,40 L 240,35 L 440,35 L 440,40"
                    stroke="rgba(57,201,255,0.8)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <line
                    x1="340"
                    y1="35"
                    x2="340"
                    y2="30"
                    stroke="rgba(57,201,255,0.8)"
                    strokeWidth="1"
                  />

                  {/* Highlighted area under the peak */}
                  <path
                    d="M 240, 180 C 280, 155 300, 150 340, 150 C 380, 150 400, 155 440, 180 Z"
                    fill="url(#diagonalHatch)"
                  />

                  {/* The Curve */}
                  <path
                    d="M 20, 180 C 60, 180 80, 270 120, 270 C 160, 270 200, 205 240, 180 C 280, 155 300, 150 340, 150 C 380, 150 400, 155 440, 180 C 480, 205 480, 230 500, 240"
                    stroke="url(#curveGradient)"
                    className="recovery-neon-curve"
                    strokeWidth="3"
                    style={{ mixBlendMode: "screen" }}
                  />

                  {/* Nodes Circles on Curve */}
                  <circle
                    cx="20"
                    cy="180"
                    r="4"
                    fill="white"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                  />
                  <circle
                    cx="120"
                    cy="270"
                    r="4"
                    fill="white"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                  />
                  <circle
                    cx="240"
                    cy="180"
                    r="4"
                    fill="white"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                  />
                  <circle
                    cx="440"
                    cy="180"
                    r="4"
                    fill="white"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                  />
                </svg>

                {/* HTML Text Labels */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 font-sans">
                  {/* Axes Labels */}
                  <div
                    className="absolute text-white/50 text-[10px] whitespace-nowrap"
                    style={{
                      left: "2%",
                      top: "2%",
                      transform: "translate(-10px, -20px)",
                    }}
                  >
                    <div>{t("身体能力", "Body Capability")}</div>
                  </div>
                  <div
                    className="absolute text-white/50 text-[10px] whitespace-nowrap"
                    style={{
                      right: "0%",
                      top: "96.6%",
                      transform: "translate(-10px, 10px)",
                    }}
                  >
                    {t("时间", "Time")}
                  </div>

                  {/* Part 1: 高强度训练 */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "4%",
                      top: "60%",
                      transform: "translate(-8px, calc(-100% - 14px))",
                    }}
                  >
                    <div className="w-24 text-left p-1.5 drop-shadow-md bg-black/40 backdrop-blur-md rounded-lg">
                      <div className="text-white text-xs md:text-sm font-bold mb-0.5">
                        {t("高强度训练", "Intense Training")}
                      </div>
                      <div className="text-boom-text-dim text-[10px] leading-tight">
                        {t("身体疲劳", "Body Fatigue")}
                      </div>
                    </div>
                  </div>

                  {/* Part 2: 恢复开始 */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "24%",
                      top: "90%",
                      transform: "translate(-50%, calc(-100% - 14px))",
                    }}
                  >
                    <div className="w-28 text-center p-1.5 drop-shadow-md bg-black/40 backdrop-blur-md rounded-lg">
                      <div className="text-white text-xs md:text-sm font-bold mb-0.5">
                        {t("恢复开始", "Recovery Begins")}
                      </div>
                      <div className="text-boom-text-dim text-[10px] leading-tight">
                        {t("能量重建", "Energy Rebuild")}
                      </div>
                    </div>
                  </div>

                  {/* Part 3: 超量恢复窗口 */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "68%",
                      top: "10%",
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="w-28 sm:w-40 text-center p-1 sm:p-1.5">
                      <div className="text-boom-green text-xs sm:text-sm md:text-base font-bold mb-0.5">
                        {t("超量恢复窗口", "Supercompensation Window")}
                      </div>
                      <div className="text-boom-green/70 text-[9px] sm:text-[10px] leading-tight hidden md:block">
                        {t("身体能力", "Body Capability")}{" "}
                        {t("超越训练前水平", "Exceeds Pre-training level")}
                      </div>
                    </div>
                  </div>

                  {/* Part 4: 错过窗口 */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "88%",
                      top: "60%",
                      transform: "translate(-8px, calc(-100% - 14px))",
                    }}
                  >
                    <div className="w-24 text-left p-1.5 drop-shadow-md hidden md:block bg-black/40 backdrop-blur-md rounded-lg">
                      <div className="text-white text-xs font-bold mb-0.5">
                        {t("错过窗口", "Missed Window")}
                      </div>
                      <div className="text-boom-text-dim text-[10px] leading-tight">
                        {t("适应下降", "Adaptation Drops")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          {...scrollReveal(0)}
          className="space-y-12 lg:col-span-4"
        >
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t(
                "比你更懂身体何时该前进",
                "Understands better when your body should advance",
              )}
            </h4>
            <p className="text-boom-text-dim leading-relaxed">
              {t(
                "恢复不仅仅是休息，而是身体不断适应与成长的过程。BOOM ONE 持续追踪身体状态变化，识别超量恢复（Supercompensation）的最佳窗口，帮助你在正确的时间做出正确的训练与恢复决策。",
                "Recovery is more than just resting; it is a process of your body constantly adapting and growing. BOOM ONE continuously tracks your body state changes, identifying the optimal Supercompensation window to help you make the right training and recovery decisions at the right time.",
              )}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">
                {t("疲劳深度评估", "Deep Fatigue Assessment")}
              </span>
              <span className="text-boom-green">
                {t("100% 吻合", "100% Match")}
              </span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-boom-green h-full"
              ></motion.div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {t("恢复时效预测", "Recovery Time Prediction")}
                </span>
                <span className="text-boom-green flex items-center font-medium">
                  <RefreshCw className="w-4 h-4 mr-2 animate-[spin_3s_linear_infinite]" />
                  {t("实时更新", "Live Update")}
                </span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="bg-boom-green h-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
