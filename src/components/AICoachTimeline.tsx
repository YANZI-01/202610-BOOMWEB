import { scrollReveal } from './scrollReveal';
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Bell, Activity, Moon, Coffee, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const AIFace = ({ isOrange }: { isOrange: boolean }) => {
  const color = 'var(--coach-accent)';
  const bgColor = isOrange ? 'bg-[#FFFFFF]' : 'bg-[#FFFFFF]';
  const borderColor = isOrange ? 'border-[#FFFFFF]/30' : 'border-[#FFFFFF]/30';
  const shadowColor = isOrange ? 'rgba(255,255,255, 0.4)' : 'rgba(255,255,255, 0.4)';

  return (
    <motion.div
      className={`coach-face w-7 h-7 rounded-full flex items-center justify-center bg-black/40 border ${borderColor} relative overflow-hidden shrink-0 mt-0.5`}
      animate={{
        boxShadow: [`0 0 0px ${shadowColor}`, `0 0 12px ${shadowColor}`, `0 0 0px ${shadowColor}`],
        borderColor: [isOrange ? 'rgba(255,255,255, 0.2)' : 'rgba(255,255,255, 0.2)', isOrange ? 'rgba(255,255,255, 0.6)' : 'rgba(255,255,255, 0.6)', isOrange ? 'rgba(255,255,255, 0.2)' : 'rgba(255,255,255, 0.2)'],
        x: [0, -1.5, 1.5, -1, 0],
        y: [0, -1.5, 1, -0.5, 0],
        rotate: [0, -8, 8, -4, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className={`absolute inset-0 opacity-20 ${bgColor}`}></div>
      <div className="flex gap-1 relative z-10">
        <motion.div
          className="w-1 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scaleY: [1, 0.1, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.05, 0.1, 1] }}
        />
        <motion.div
          className="w-1 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scaleY: [1, 0.1, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.05, 0.1, 1] }}
        />
      </div>
    </motion.div>
  );
};

const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const characters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          onComplete?.();
        }
      }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.8, // Wait for bubble entrance animation
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const AIChatBubble = ({ text, isOrange, isEven }: { text: string, isOrange: boolean, isEven: boolean }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const orangeStyle = "border border-[#FFFFFF]/60 bg-[#FFFFFF]/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.5),inset_0_0_15px_rgba(255,255,255,0.8),0_10px_30px_rgba(255,255,255,0.2)]";
  const greenStyle = "border border-[#FFFFFF]/60 bg-[#FFFFFF]/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.5),inset_0_0_15px_rgba(255,255,255,0.8),0_10px_30px_rgba(255,255,255,0.2)]";

  return (
    <motion.div
      className={`flex items-end gap-3 w-full max-w-sm ${isEven ? 'md:mr-0 md:ml-auto' : ''}`}
      animate={isTypingComplete ? {
        x: [0, -2, 3, -3, 2, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
      } : {}}
    >
      <div className="flex-shrink-0 z-10 mb-1">
        <AIFace isOrange={isOrange} />
      </div>
      <div className={`p-4 md:p-5 relative text-sm font-medium text-white/95 backdrop-blur-2xl text-left
        coach-chat rounded-[24px] rounded-bl-[4px] overflow-hidden
        ${isOrange ? orangeStyle : greenStyle}`}>
        {/* Glossy overlay effect for that premium UI look */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="leading-relaxed tracking-wide text-[13px] sm:text-sm whitespace-pre-line relative z-10 drop-shadow-md">
          <TypewriterText text={text} onComplete={() => setIsTypingComplete(true)} />
        </div>
      </div>
    </motion.div>
  );
};

export function AICoachTimeline() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a scroll-linked animation for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineData = [
    {
      icon: <Coffee className="w-6 h-6 text-boom-green" />,
      time: t("07:00 AM - 醒来时刻", "07:00 AM - Wake Up Time"),
      title: t("睡眠与恢复综合评估", "Comprehensive Sleep & Recovery Evaluation"),
      desc: t("睡眠不是一天的结束，而是下一次决策的开始。AI Coach 基于睡眠、恢复、负荷与压力状态，持续理解身体变化，并随着身体状态的变化实时更新建议。", "Sleep isn't the end of a day, but the beginning of the next decision. AI Coach continuously understands body changes based on sleep, recovery, load, and stress states, and updates suggestions in real time as your body state changes."),
      highlight: t("今天的恢复节奏很好，不要提前消耗它。耐心一点，把训练留给身体真正准备好的时候。", "Today's recovery rhythm is great, don't consume it early. Be patient and leave the training for when your body is truly ready."),
      img: "/04-1.png"
    },
    {
      icon: <Activity className="w-6 h-6 text-[#FFFFFF]" />,
      time: t("16:00 PM - 训练准备 & 动态调整", "16:00 PM - Training Prep & Dynamic Adjustment"),
      title: t("今天的计划，已经改变", "Today's plan has changed"),
      desc: t("生活负荷与训练负荷始终在动态变化。AI Coach 持续评估身体状态，当工作、压力或突发情况改变身体恢复进程时，会重新计算最佳训练时机，并动态调整当天的训练建议。", "Life load and training load are always changing dynamically. AI Coach continuously evaluates your body state, recalculating the best training time and dynamically adjusting today's suggestions when work, stress, or unexpected situations alter your recovery process."),
      highlight: t("今天的工作消耗，比预期更高。训练时间已重新调整，把高强度训练放到再晚些效果会更好。", "Today's work exertion is higher than expected. Training time has been rescheduled, it's better to postpone high-intensity training to a later time."),
      img: "/04-2.png"
    },
    {
      icon: <Bell className="w-6 h-6 text-boom-green" />,
      time: t("19:00 PM - 进阶训练中", "19:00 PM - Advanced Training"),
      title: t("实时守护，每一次突破", "Real-time Guardian of Every Breakthrough"),
      desc: t("训练开始，并不意味着决策结束。AI Coach 持续监测身体反应、训练负荷与恢复状态，根据身体实时变化动态调整训练建议；当目标刺激已经达到时，及时提醒结束训练，并预测下一次最佳训练时机，让每一次训练都恰到好处。", "Training starting doesn't mean decision-making ends. AI Coach continuously monitors physical reactions, training load, and recovery state, dynamically adjusting training suggestions based on real-time body changes; when the target stimulus is reached, it timely reminds you to end training and predicts the next optimal training time, making every session just right."),
      highlight: t("今天已经练够了。接下来交给恢复，下一次最佳训练时机，我会提前告诉你。", "You've trained enough today. Let's leave the rest to recovery, I will tell you the next best training time in advance."),
      img: "/04-3.png"
    },
    {
      icon: <Moon className="w-6 h-6 text-boom-green" />,
      time: t("21:30 PM - 科学重建", "21:30 PM - Scientific Reconstruction"),
      title: t("追踪身体的适应进程", "Tracking the body's adaptation process"),
      desc: t("恢复不是一个瞬间，而是一个持续发生的过程。AI Coach 持续评估身体对训练刺激的适应情况，追踪恢复进展，并预测下一次高质量训练的最佳时机。", "Recovery is not an instant, but a continuous process. AI Coach continuously evaluates the body's adaptation to training stimuli, tracks recovery progress, and predicts the best timing for the next high-quality training session."),
      highlight: t("今天练得非常好！建议 22:00 前补充一些优质蛋白和适量碳水，放松身体，23:00 前入睡，让恢复真正开始。", "Great training today! It's recommended to supplement some high-quality protein and moderate carbs before 22:00, relax your body, and fall asleep before 23:00 to let true recovery begin."),
      img: "/04－４-1.jpg"
    }
  ];

  return (
    <section id="aicoach" className="py-20 md:py-32 bg-black relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.h3
            {...scrollReveal(0)}
            className="text-boom-green font-display text-lg md:text-xl mb-4 font-medium tracking-wide"
          >
            05 // THE CORE: 24/7 AI COACH
          </motion.h3>
          <motion.h2
             {...scrollReveal(0.1)}
             className="text-3xl sm:text-4xl md:text-6xl font-bold font-display leading-tight"
          >
            {t('像一支顶级教练团队，', 'Like a top-tier coaching team, ')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-boom-green to-white text-glow">{t('全天候为你提供个性化决策与建议', 'providing personalized decisions and guidance 24/7')}</span>
          </motion.h2>
          <motion.p
            {...scrollReveal(0.2)}
            className="text-boom-text-dim text-base md:text-lg max-w-3xl mx-auto mt-4 md:mt-6 whitespace-pre-line"
          >
            {t('把过去只有顶级运动员才能拥有的教练团队，带给每一个追求进步的人。\nBOOM 融合运动科学、人体科学、心理学与 AI，持续理解你的身体状态，并把复杂的人体数据转化为简单、易懂、真正愿意执行的决策与建议。\n因为真正改变身体的，从来不是数据，而是持续行动。', 'Bringing the coaching team previously only available to elite athletes to everyone striving for progress.\nBOOM integrates sports science, human science, psychology, and AI to continuously understand your body state and translate complex human data into simple, understandable, and actionable decisions and suggestions.\nBecause what truly changes the body is never data, but continuous action.')}
          </motion.p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative">
           {/* Center Line Track */}
           <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2"></div>

           {/* Animated fill line */}
           <motion.div
              style={{ height: heightProgress }}
              className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-boom-green transform md:-translate-x-1/2 box-glow shadow-boom-green origin-top"
           ></motion.div>

           <div className="space-y-20 md:space-y-32">
             {timelineData.map((item, index) => {
               const isEven = index % 2 === 0;
               return (
                 <div key={index} data-scene={index} className="coach-stage relative flex flex-col md:flex-row items-center w-full">
                    {/* Node */}
                    <div className="coach-node absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-black border-2 border-white/20 transform md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center z-10 transition-colors duration-500 hover:border-boom-green group">
                       <div className="bg-boom-gray rounded-full p-2 group-hover:bg-boom-green/20 transition-colors">
                          {item.icon}
                       </div>
                    </div>

                    {/* Content Section (Left or Right) */}
                    <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:px-16 ${isEven ? 'md:pr-16 md:pl-0 md:text-right' : 'md:pl-16 md:pr-0 md:ml-auto'}`}>
                      <motion.div
                         {...scrollReveal(0)}
                      >
                         <h5 className={`font-display font-medium tracking-wide mb-2 ${index === 1 ? 'text-[#FFFFFF]' : 'text-boom-green'}`}>{item.time}</h5>
                         <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                         <p className="text-boom-text-dim leading-relaxed mb-6">
                           {item.desc}
                         </p>

                         <AIChatBubble text={item.highlight} isOrange={index === 1} isEven={isEven} />

                         {(index === 0 || index === 1 || index === 2) && (
                            <div className={`coach-window mt-6 max-w-sm relative w-full rounded-[24px] bg-[#111111] py-4 px-6 overflow-hidden shadow-2xl border border-white/5 ${isEven ? 'md:mr-0 md:ml-auto' : ''}`}>
                              {/* The Glowing Bottom Aura */}
                              <div className={`absolute -bottom-[20%] left-[10%] right-[10%] h-1/2 ${index === 1 ? 'bg-[#FFFFFF]/80' : 'bg-boom-green/80'} blur-[50px] z-0 pointer-events-none rounded-full`}></div>

                              {/* Content */}
                              <div className="relative z-10 text-left">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="text-lg md:text-xl font-display font-light text-white tracking-tight">
                                      {index === 1 ? t('今日 19:00-21:00', 'Today 19:00-21:00') : index === 2 ? t('后天 10:00-12:00', 'Day after Tmrw 10:00-12:00') : t('今天 16:00-18:00', 'Today 16:00-18:00')}
                                   </div>
                                   <div className={`w-8 h-8 rounded-full ${index === 1 ? 'bg-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-boom-green shadow-[0_0_15px_rgba(255,255,255,0.5)]'} flex items-center justify-center shrink-0`}>
                                     <RefreshCw className="w-4 h-4 text-black animate-[spin_3s_linear_infinite]" strokeWidth={2.5} />
                                   </div>
                                </div>

                                <div className="text-white/60 text-sm tracking-widest font-light uppercase font-sans">
                                  {t('超量恢复窗口期', 'Supercompensation Window')}
                                </div>
                              </div>
                            </div>
                         )}

                         <div className={`mt-6 w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 aspect-video ${isEven ? 'ml-auto' : ''}`}>
                             <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                         </div>
                      </motion.div>
                    </div>
                 </div>
               )
             })}
           </div>
        </div>
      </div>
    </section>
  );
}
