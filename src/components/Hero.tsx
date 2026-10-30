import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} id="overview" data-nav-theme="dark" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Graphic */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="w-[800px] h-[800px] rounded-full border border-boom-green/20 box-glow absolute blur-3xl opacity-20"></div>
        <div className="w-[400px] h-[400px] rounded-full bg-boom-green absolute blur-[150px] opacity-10"></div>
        <img
          src="/hero-runners-keli.png"
          alt={t('浅蓝背景中奔跑的三位运动者', 'Three athletes running against a light blue background')}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover translate-y-[20px] scale-105"
        />
      </motion.div>

      <div className="hero-copy-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="hero-content relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-4 md:mb-8"
        >
          <div className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-64 rounded-[40px] md:rounded-[60px] bg-boom-gray border border-white/10 mx-auto shadow-2xl relative flex items-center justify-center overflow-hidden">
            {/* The Device mockup */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, ease: "linear", repeat: Infinity }}
               className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 border-boom-green shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            ></motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-title font-display"
        >
          BOOM ONE
        </motion.h1>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-subtitle font-sans"
        >
          <span>{t('全天候决策型', '24/7 Decision-Making')}</span>{' '}
          <span className="hero-coach-label">AI COACH</span>
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="hero-tagline font-sans"
        >
          <span>Explore Within.</span>{' '}<span>Break Beyond.</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-boom-green to-transparent"
      />
    </section>
  );
}
