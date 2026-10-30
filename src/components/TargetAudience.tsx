import { scrollReveal } from './scrollReveal';
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export function TargetAudience() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(0);

  const audiences = [
    {
      id: "run",
      title: t("长距离跑者", "Long-Distance Runners"),
      desc: t("日复一日的积累，只为突破自己的极限", "Day after day of accumulation, just to break personal limits"),
      img: "/05-1.png"
    },
    {
      id: "cycle",
      title: t("耐力骑行者", "Endurance Cyclists"),
      desc: t("在漫长的征程中，挑战更远的距离", "Challenging longer distances in the long journey"),
      img: "/05-2.png"
    },
    {
      id: "swim",
      title: t("公开水域 / 泳者", "Open Water Swimmers"),
      desc: t("在未知的环境中，与身体的极限共处", "Coexisting with physical limits in unknown environments"),
      img: "/05-3.png"
    },
    {
      id: "hyrox",
      title: t("HYROX 训练者", "HYROX Athletes"),
      desc: t("在高强度的组合挑战中，突破心肺边界", "Breaking cardiopulmonary boundaries in high-intensity combination challenges"),
      img: "/05-4.png"
    },
    {
      id: "heavy",
      title: t("高负荷任务者", "High-Load Taskers"),
      desc: t("在高压与高负荷下，保持稳定与专注", "Maintaining stability and focus under high pressure and load"),
      img: "/05-5.png"
    }
  ];

  return (
    <section id="audience" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.h3
            {...scrollReveal(0)}
            className="text-boom-green font-display text-xl mb-4 font-medium tracking-wide"
          >
            01 // FOR SERIOUS ATHLETES
          </motion.h3>
          <motion.h2
            {...scrollReveal(0.1)}
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-display"
          >
            {t('为耐力运动的', 'Built for')} <br/>
            <span className="text-boom-green text-glow">{t('严肃运动者', 'serious endurance athletes')}</span> {t('而生。', '.')}
          </motion.h2>
          <motion.p
            {...scrollReveal(0.2)}
            className="text-boom-text-dim text-lg mt-6 max-w-2xl whitespace-pre-line"
          >
            {t('他们尊重身体，相信长期主义。\n不迷信拼命，不依赖天赋。\n在训练与恢复的平衡中，在日复一日的积累里，持续成为更好的自己。', 'They respect their bodies and believe in long-termism. Neither blindly pushing hard, nor relying solely on talent. In the balance of training and recovery, and over days of accumulation, they continuously become better versions of themselves.')}
          </motion.p>
        </div>

        <motion.div {...scrollReveal()} className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
          {audiences.map((item, index) => {
            const isActive = hovered === null ? index === 0 : hovered === index;
            return (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out flex-shrink-0 md:flex-shrink ${isActive ? 'md:flex-[3] flex-[auto] h-48 md:h-auto' : 'md:flex-[1] flex-none h-20 md:h-auto'} border border-white/5`}
                onMouseEnter={() => setHovered(index)}
                onClick={() => setHovered(index)}
              >
                <img
                  src={item.img}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out mix-blend-luminosity opacity-80"
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                <div className="absolute bottom-6 left-6 text-left z-10 flex flex-col justify-end h-full md:h-auto pointer-events-none">
                  <h4 className="text-white font-bold text-xl md:text-2xl font-display mb-2 drop-shadow-md whitespace-nowrap">
                    {item.title}
                  </h4>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-boom-text-dim md:text-white/80 text-sm drop-shadow-md pr-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
