import { scrollReveal } from './scrollReveal';
import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function AboutCompany() {
  const { t, language } = useLanguage();

  const [activeVisionCard, setActiveVisionCard] = useState<number | null>(null);

  // Generate random dots for background effect extending outward
  const dots = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      // Random angle in full circle
      const angle = Math.random() * Math.PI * 2;
      // Use square root for more uniform spread within area, max radius 450px
      const maxRadius = 450;
      const radius = Math.sqrt(Math.random()) * maxRadius;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Dots further out have less opacity
      const distanceRatio = radius / maxRadius;
      const maxOpacity = Math.max(0.1, 1 - distanceRatio) * 0.7; // Central dots up to 0.7 opacity

      return {
        x,
        y,
        maxOpacity,
        size: Math.random() * 2.5 + 1.5, // 1.5px to 4px
        duration: 2 + Math.random() * 3, // 2-5s twinkle
        delay: Math.random() * 3, // random start time
      };
    });
  }, []);

  return (
    <div className="text-white min-h-screen pt-0">
      {/* WORK ON SELF / HERO */}
      <section className="brand-hero relative h-screen w-full flex items-center justify-center overflow-hidden z-10" data-nav-theme="dark">
        {/* Background Image: Muscular figure */}
        <div className="brand-hero-media absolute inset-0 z-0 overflow-hidden">
          <motion.img
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
            src="/BRAND1.png"
            alt="Muscular figure"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Data stream overlays / UI annotations */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none"></div>

          {/* Diagonal frosted glass stripes overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.03)_4px,rgba(255,255,255,0.03)_8px)] backdrop-blur-[2px] pointer-events-none"></div>

          {/* Right Highlight Beam */}
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[140%] bg-gradient-to-l from-white/30 via-white/5 to-transparent blur-[100px] pointer-events-none transform -rotate-12 mix-blend-screen"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center flex flex-col items-center mt-20 -translate-y-[92px]"
        >
          <h2 className="brand-hero-title text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-display font-bold mb-3 md:mb-4 uppercase tracking-tighter leading-none italic">
            WORK ON SELF.
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-medium mb-4 md:mb-7 uppercase tracking-[0.15em] md:tracking-[0.2em] font-display italic bg-clip-text text-transparent bg-[linear-gradient(110deg,#86868b_20%,#ffffff_50%,#86868b_80%)] bg-[length:200%_auto] animate-shimmer">
            Everything else follows.
          </h3>
        </motion.div>
      </section>

      {/* DETAILED SECTIONS */}
      <section className="brand-details pb-32 bg-[#020408] relative overflow-hidden" data-nav-theme="light">
        {/* Background Neon Glows (using brand color) */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-boom-green/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[45%] right-[10%] w-[700px] h-[700px] bg-boom-green/5 blur-[140px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[800px] h-[800px] bg-boom-green/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

        {/* COMPANY OVERVIEW SECTION */}
        <div className="brand-intro relative pt-[240px] pb-[180px] z-20 flex justify-center items-center">
          {/* Background Dots */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: dot.size,
                  height: dot.size,
                  x: dot.x,
                  y: dot.y,
                }}
                animate={{
                  opacity: [0, dot.maxOpacity, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              {...scrollReveal(0)}
            >
              <div className="flex flex-col items-center gap-8 text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-wide max-w-3xl mx-auto text-[#86868b]">
                <p className="text-justify md:text-center">
                  {language === "zh"
                    ? "熵减纪元（Entropy Era）是一家致力于人类表现优化的科技公司，专注于持续生理监测、人体状态建模与 AI Coach系统。我们希望融合多学科交叉与人工智能，帮助每个人持续优化自身状态，持续对抗人体熵增，不断提升生命质量与人体表现，最终构建每个人专属的 Human Operating System，共同开启属于全人类的熵减纪元。"
                    : "Entropy Era is a technology company dedicated to human performance optimization, focusing on continuous physiological monitoring, human state modeling, and AI Coach systems. We hope to integrate interdisciplinary intersections and artificial intelligence to help everyone continuously optimize their state, continuously combat human entropy increase, continuously improve the quality of life and human performance, and ultimately build a Human Operating System exclusive to everyone, jointly opening an entropy reduction era belonging to all mankind."}
                </p>
                <p className="italic text-white/80 font-medium text-sm md:text-base text-center">
                  {t(
                    "“生命以负熵为生。”—— 薛定谔，《生命是什么？》",
                    '"Life feeds on negative entropy." — Erwin Schrödinger, What is Life?',
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="relative flex items-center pt-[100px] pb-[100px] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Media */}
            <div className="brand-mission-photo w-full lg:w-1/2 relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group">
              <img
                src="/BRAND2.jpg"
                alt="Mission"
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Tech Overlays */}
              <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-boom-green/50"></div>
              <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-boom-green/50"></div>

              <div className="absolute top-1/4 right-1/4 flex flex-col items-end">
                <div className="w-2 h-2 bg-boom-green mb-1 animate-pulse"></div>
                <div className="text-[10px] font-mono text-boom-green uppercase tracking-widest text-right">
                  TARGET: 100%
                  <br />
                  SYNCHRONIZING...
                </div>
              </div>

              <div className="absolute bottom-1/4 left-8 text-[10px] font-mono text-white/50 uppercase tracking-widest translate-y-[100px]">
                SEC_01 // CORE_OVERRIDE
              </div>

              {/* Animated Scanning Boxes */}
              <ScanningBox
                initialTop="30%"
                initialLeft="20%"
                initialSize={60}
                delay={0}
                bounds={{ topMin: 15, topMax: 70, leftMin: 15, leftMax: 60 }}
              />
              <ScanningBox
                initialTop="60%"
                initialLeft="60%"
                initialSize={80}
                delay={500}
                bounds={{ topMin: 40, topMax: 80, leftMin: 40, leftMax: 70 }}
              />
            </div>

            {/* Right: Text */}
            <div className="brand-mission-card w-full lg:w-1/2 p-8 md:p-14 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
              <motion.div
                {...scrollReveal(0)}
                className="relative z-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-boom-green text-2xl">01</span>
                  <div className="h-px bg-white/20 w-16"></div>
                  <span className="uppercase tracking-widest text-boom-text-dim text-2xl font-medium">
                    {t("使命", "Mission")}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.15rem] font-display font-medium text-white mb-8 leading-[1.2] tracking-tight">
                  {t(
                    "让每个人都拥有优化自身状态的能力",
                    "Empower everyone with the ability to optimize their own state",
                  )}
                </h3>
                <div className="space-y-6 text-boom-text-dim max-w-xl leading-relaxed text-sm md:text-base lg:text-lg">
                  <p>
                    {t(
                      "过去，人们依靠经验管理身体，",
                      "In the past, people managed their bodies through experience,",
                    )}
                  </p>
                  <p className="text-white font-medium border-l-2 border-boom-green pl-4">
                    {t(
                      "未来，人们将依靠持续理解身体。",
                      "In the future, people will rely on continuous understanding of their bodies.",
                    )}
                  </p>
                  <p>
                    {t(
                      "BOOM 正在将顶级教练团队的判断能力融入 AI，让每个人都拥有属于自己的健康导航系统，在运动、恢复、营养、睡眠、心理与健康管理中，持续获得指导。",
                      "BOOM is integrating the judgment capabilities of top coaching teams into AI, giving everyone their own health navigation system, providing continuous guidance in training, recovery, nutrition, sleep, psychology, and health management.",
                    )}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* VISION SECTION (Reference Image Layout) */}
        <div className="relative flex items-center pt-[100px] pb-[100px] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Top Text Section */}
            <motion.div
              {...scrollReveal(0)}
              className="flex items-center gap-4 mb-[26px] lg:mb-[42px]"
            >
              <span className="font-mono text-boom-green text-2xl">02</span>
              <div className="h-px w-16 bg-white/20"></div>
              <span className="text-boom-text-dim text-2xl uppercase tracking-widest font-medium">
                {t("愿景", "Vision")}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16 lg:mb-24">
              {/* Left: Heading */}
              <motion.div
                {...scrollReveal(0)}
                className="relative z-10"
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.15rem] font-display font-medium text-white mb-4 leading-[1.2] tracking-tight">
                  {t("以健康为根基，", "Grounded in Health,")}
                  <br className="hidden md:block" />
                  {t("而非以失衡为代价", "Not at the Cost of Imbalance")}
                </h3>
              </motion.div>

              {/* Right: Paragraphs */}
              <motion.div
                {...scrollReveal(0.2)}
                className="relative z-10"
              >
                <div className="space-y-[14px] text-boom-text-dim leading-relaxed text-base lg:text-lg max-w-xl">
                  <p className="text-white font-medium">
                    {t(
                      "我们相信，健康不仅是不生病或长寿，而是精神、生理、智力、关系与情绪的持续平衡与成长。",
                      "We believe that health is not just the absence of disease or living longer, but the continuous balance and growth of spirit, physiology, intellect, relationships, and emotions.",
                    )}
                  </p>
                  <p>
                    {t("BOOM 正在构建 ", "BOOM is building the ")}
                    <span className="text-boom-green">
                      Human Operating System
                    </span>
                    {t(
                      "，帮助每个人持续理解自身状态、优化自身状态，在压力和忙碌成为常态的当下，回归本源，实现五维健康与人类潜能的持续释放。",
                      " to help everyone continuously understand and optimize their own state. In an era where stress is the norm, we help you return to your roots, achieving five-dimensional health and the continuous release of human potential.",
                    )}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Images Section: 5 Dimensions of Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[5px] mt-8 lg:-mt-[30px] w-full relative z-20">
              {/* Image 1: Spirit */}
              <motion.div
                {...scrollReveal(0)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setActiveVisionCard(0);
                  }
                }}
                transition={{ delay: 0.1 }}
                onMouseEnter={() => setActiveVisionCard(0)}
                onMouseLeave={() => setActiveVisionCard(null)}
                className={`brand-vision-card relative aspect-[2/3] overflow-hidden rounded-3xl group shadow-2xl bg-black ${activeVisionCard === 0 ? "is-active" : ""}`}
              >
                <img
                  src="/brand02-1.png"
                  alt="Spirit"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-none group-hover:scale-105 group-[.is-active]:blur-none group-[.is-active]:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 group-[.is-active]:bg-black/10 transition-all duration-500"></div>

                <div className="absolute top-6 right-6 text-right">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.25em] block group-hover:text-white group-[.is-active]:text-white transition-colors">
                    BOOM.SYSTEM
                  </span>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/60 font-mono tracking-[0.2em] mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100">
                    {t("维度 01", "DIMENSION 01")}
                  </span>
                  <h4 className="text-sm lg:text-base font-display font-light text-white uppercase tracking-wider -mb-[1px] opacity-80 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">
                    SPIRIT
                  </h4>
                  <span className="text-sm font-light text-boom-text-dim tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 group-hover:text-white group-[.is-active]:opacity-100 group-[.is-active]:text-white transition-all duration-300">
                    {t("精神", "Spirit")}
                  </span>
                </div>
              </motion.div>

              {/* Image 2: Physiology */}
              <motion.div
                {...scrollReveal(0)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setActiveVisionCard(1);
                  }
                }}
                transition={{ delay: 0.2 }}
                onMouseEnter={() => setActiveVisionCard(1)}
                onMouseLeave={() => setActiveVisionCard(null)}
                className={`brand-vision-card relative aspect-[2/3] overflow-hidden rounded-3xl group shadow-2xl bg-black ${activeVisionCard === 1 ? "is-active" : ""}`}
              >
                <img
                  src="/brand02-2-1.jpg"
                  alt="Physiology"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-none group-hover:scale-105 group-[.is-active]:blur-none group-[.is-active]:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 group-[.is-active]:bg-black/10 transition-all duration-500"></div>

                <div className="absolute top-6 right-6 text-right">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.25em] block group-hover:text-white group-[.is-active]:text-white transition-colors">
                    BOOM.SYSTEM
                  </span>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/60 font-mono tracking-[0.2em] mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100">
                    {t("维度 02", "DIMENSION 02")}
                  </span>
                  <h4 className="text-sm lg:text-base font-display font-light text-white uppercase tracking-wider -mb-[1px] opacity-80 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">
                    PHYSICAL
                  </h4>
                  <span className="text-sm font-light text-boom-text-dim tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 group-hover:text-white group-[.is-active]:opacity-100 group-[.is-active]:text-white transition-all duration-300">
                    {t("生理", "Physiology")}
                  </span>
                </div>
              </motion.div>

              {/* Image 3: Intellect */}
              <motion.div
                {...scrollReveal(0)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setActiveVisionCard(2);
                  }
                }}
                transition={{ delay: 0.3 }}
                onMouseEnter={() => setActiveVisionCard(2)}
                onMouseLeave={() => setActiveVisionCard(null)}
                className={`brand-vision-card relative aspect-[2/3] overflow-hidden rounded-3xl group shadow-2xl bg-black ${activeVisionCard === 2 ? "is-active" : ""}`}
              >
                <img
                  src="/brand02-3.jpg"
                  alt="Intellect"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-none group-hover:scale-105 group-[.is-active]:blur-none group-[.is-active]:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 group-[.is-active]:bg-black/10 transition-all duration-500"></div>

                <div className="absolute top-6 right-6 text-right">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.25em] block group-hover:text-white group-[.is-active]:text-white transition-colors">
                    BOOM.SYSTEM
                  </span>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/60 font-mono tracking-[0.2em] mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100">
                    {t("维度 03", "DIMENSION 03")}
                  </span>
                  <h4 className="text-sm lg:text-base font-display font-light text-white uppercase tracking-wider -mb-[1px] opacity-80 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">
                    MIND
                  </h4>
                  <span className="text-sm font-light text-boom-text-dim tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 group-hover:text-white group-[.is-active]:opacity-100 group-[.is-active]:text-white transition-all duration-300">
                    {t("智力", "Intellect")}
                  </span>
                </div>
              </motion.div>

              {/* Image 4: Relationships */}
              <motion.div
                {...scrollReveal(0)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setActiveVisionCard(3);
                  }
                }}
                transition={{ delay: 0.4 }}
                onMouseEnter={() => setActiveVisionCard(3)}
                onMouseLeave={() => setActiveVisionCard(null)}
                className={`brand-vision-card relative aspect-[2/3] overflow-hidden rounded-3xl group shadow-2xl bg-black ${activeVisionCard === 3 ? "is-active" : ""}`}
              >
                <img
                  src="/brand02-4.jpg"
                  alt="Relationships"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-none group-hover:scale-105 group-[.is-active]:blur-none group-[.is-active]:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 group-[.is-active]:bg-black/10 transition-all duration-500"></div>

                <div className="absolute top-6 right-6 text-right">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.25em] block group-hover:text-white group-[.is-active]:text-white transition-colors">
                    BOOM.SYSTEM
                  </span>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/60 font-mono tracking-[0.2em] mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100">
                    {t("维度 04", "DIMENSION 04")}
                  </span>
                  <h4 className="text-sm lg:text-base font-display font-light text-white uppercase tracking-wider -mb-[1px] opacity-80 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">
                    SOCIAL
                  </h4>
                  <span className="text-sm font-light text-boom-text-dim tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 group-hover:text-white group-[.is-active]:opacity-100 group-[.is-active]:text-white transition-all duration-300">
                    {t("关系", "Relationships")}
                  </span>
                </div>
              </motion.div>

              {/* Image 5: Emotions */}
              <motion.div
                {...scrollReveal(0)}
                onViewportEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    setActiveVisionCard(4);
                  }
                }}
                transition={{ delay: 0.5 }}
                onMouseEnter={() => setActiveVisionCard(4)}
                onMouseLeave={() => setActiveVisionCard(null)}
                className={`brand-vision-card relative aspect-[2/3] overflow-hidden rounded-3xl group shadow-2xl md:col-span-1 lg:col-span-1 bg-black ${activeVisionCard === 4 ? "is-active" : ""}`}
              >
                <img
                  src="/brand02-5.jpg"
                  alt="Emotions"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-none group-hover:scale-105 group-[.is-active]:blur-none group-[.is-active]:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 group-[.is-active]:bg-black/10 transition-all duration-500"></div>

                <div className="absolute top-6 right-6 text-right">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.25em] block group-hover:text-white group-[.is-active]:text-white transition-colors">
                    BOOM.SYSTEM
                  </span>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/60 font-mono tracking-[0.2em] mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100">
                    {t("维度 05", "DIMENSION 05")}
                  </span>
                  <h4 className="text-sm lg:text-base font-display font-light text-white uppercase tracking-wider -mb-[1px] opacity-80 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">
                    EMOTION
                  </h4>
                  <span className="text-sm font-light text-boom-text-dim tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 group-hover:text-white group-[.is-active]:opacity-100 group-[.is-active]:text-white transition-all duration-300">
                    {t("情绪", "Emotions")}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* VALUES SECTION (Using standard grid) */}
        <div className="relative pt-[100px] pb-[100px]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              {...scrollReveal(0)}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-boom-green text-2xl">03</span>
                <div className="h-px bg-white/20 w-16"></div>
                <span className="uppercase tracking-widest text-boom-text-dim text-2xl font-medium">
                  {t("价值观", "Values")}
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase">
                Core <span className="text-boom-text-dim">Principles</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ValueCard
                num="01"
                title="诚实 HONESTY"
                desc={t("以诚实面对现实", "Face reality with honesty")}
              />
              <ValueCard
                num="02"
                title="克制 RESTRAINT"
                desc={t("以克制尊重规律", "Respect rules with restraint")}
              />
              <ValueCard
                num="03"
                title="专注 FOCUS"
                desc={t(
                  "以专注聚焦本质",
                  "Focus on essence with concentration",
                )}
              />
              <ValueCard
                num="04"
                title="创新 INNOVATION"
                desc={t("以创新探索未来", "Explore the future with innovation")}
              />
              <ValueCard
                num="05"
                title="极致 EXTREME"
                desc={t("以极致追求卓越", "Pursue excellence with extreme")}
              />
              <ValueCard
                num="06"
                title="利他 ALTRUISM"
                desc={t("以利他创造价值", "Create value with altruism")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="brand-value-card flex flex-col border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group shadow-xl relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
      <span className="text-boom-text-dim font-mono text-xs mb-4 relative z-10">
        {num}
      </span>
      <h4 className="text-white font-bold font-display tracking-widest text-base md:text-lg mb-3 uppercase group-hover:text-boom-green transition-colors relative z-10">
        {title}
      </h4>
      <p className="text-boom-text-dim text-sm relative z-10">{desc}</p>
    </div>
  );
}

const scanningLabels = [
  "SCAPULAR RETRACTION //",
  "LATISSIMUS DORSI // L:85%",
  "CORE ENGAGEMENT //",
  "GLUTEAL ACTIVATION // S:98%",
  "DELTOID FLEXION // T:OPT",
  "TRICEPS BRACHII // F:LOW",
  "NEURAL SYNC //",
  "METABOLIC RATE // OPTIMAL",
];

function ScanningBox({
  initialTop,
  initialLeft,
  initialSize,
  delay,
  bounds,
}: {
  initialTop: string;
  initialLeft: string;
  initialSize: number;
  delay: number;
  bounds: { topMin: number; topMax: number; leftMin: number; leftMax: number };
}) {
  const [style, setStyle] = useState({
    top: initialTop,
    left: initialLeft,
    size: initialSize,
  });
  const [label, setLabel] = useState(scanningLabels[0]);

  useEffect(() => {
    let intervalId: any;

    const timeoutId = setTimeout(() => {
      const move = () => {
        const top =
          bounds.topMin + Math.random() * (bounds.topMax - bounds.topMin);
        const left =
          bounds.leftMin + Math.random() * (bounds.leftMax - bounds.leftMin);
        const size = 30 + Math.random() * 50;

        setStyle({ top: `${top}%`, left: `${left}%`, size });
        setLabel(
          scanningLabels[Math.floor(Math.random() * scanningLabels.length)],
        );
      };

      move();
      intervalId = setInterval(move, 1500);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [delay, bounds]);

  return (
    <motion.div
      animate={{
        top: style.top,
        left: style.left,
        width: style.size,
        height: style.size,
      }}
      transition={{
        duration: 0.8,
        ease: "backOut",
      }}
      className="absolute border-[0.5px] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)] pointer-events-none z-0"
    >
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-boom-green/60"></div>
      <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-boom-green/60"></div>
      <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-boom-green/60"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-boom-green/60"></div>

      <motion.div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-full h-[0.5px] bg-boom-green/40"></div>
        <div className="h-full w-[0.5px] bg-boom-green/40 absolute"></div>
        <div className="w-1/2 h-1/2 rounded-full border-[0.5px] border-boom-green/20 absolute"></div>
      </motion.div>

      <motion.span
        key={label}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute -bottom-4 right-0 text-[5px] font-mono text-boom-green/80 whitespace-nowrap bg-black/50 px-1 border border-boom-green/10"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
