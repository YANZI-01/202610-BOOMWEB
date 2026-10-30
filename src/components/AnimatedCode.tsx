import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const AnimatedCode = () => {
  const { t } = useLanguage();

  const snippets = React.useMemo(() => [
    [
      { content: <> <span className="text-[#ff7b72]">import</span> {`{ Biomarkers, TrainingLoad, StressLevel }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@/types'</span>;</> },
      { content: <></> },
      { content: <> <span className="text-[#ff7b72]">export class</span> <span className="text-[#d2a8ff]">FreeEnergyEngine</span> {`{`}</> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('动态计算身体当前可以直接调用的有效能量', 'Dynamically calculate currently available effective energy')} */</span></> },
      { content: <> {'  '} <span className="text-[#d2a8ff]">calculateAvailableEnergy</span>(state: <span className="text-[#79c0ff]">BodyState</span>): <span className="text-[#79c0ff]">number</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> {`{ load, hrv, sleep, stress } = state;`}</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#8b949e] italic">// {t('计算消耗与恢复的动态平衡', 'Calculate dynamic balance of drain and recovery')}</span></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> intake = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">assessRecovery</span>(sleep, hrv);</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> output = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">calculateDrain</span>(load, stress);</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#8b949e] italic">// {t('取决于剩余能量，而非单一消耗', 'Depends on remaining energy, not just consumption')}</span></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">max</span>(<span className="text-[#79c0ff]">0</span>, <span className="text-[#a3e635]">BASE_CAPACITY</span> + intake - output);</> },
      { content: <> {'  '} {`}`}</> },
      { content: <></> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('判断下一次最佳训练时机', 'Judge the next optimal training timing')} */</span></> },
      { content: <> {'  '} <span className="text-[#d2a8ff]">isOptimalTiming</span>(freeEnergy: <span className="text-[#79c0ff]">number</span>): <span className="text-[#79c0ff]">boolean</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> freeEnergy {'>='} <span className="text-[#a3e635]">SUPERCOMPENSATION_THRESHOLD</span>;</> },
      { content: <> {'  '} {`}`}</> },
      { content: <></> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('神经中枢疲劳度计算', 'Calculate neural fatigue')} */</span></> },
      { content: <> {'  '} <span className="text-[#ff7b72]">private</span> <span className="text-[#d2a8ff]">assessNeuralTax</span>(stress: <span className="text-[#79c0ff]">number</span>): <span className="text-[#79c0ff]">number</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">pow</span>(stress, <span className="text-[#79c0ff]">1.2</span>) * <span className="text-[#a3e635]">NEURAL_FATIGUE_FACTOR</span>;</> },
      { content: <> {'  '} {`}`}</> },
      { content: <>{`}`}</> }
    ],
    [
      { content: <> <span className="text-[#ff7b72]">import</span> {`{ SessionData, NeuralState }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@/types'</span>;</> },
      { content: <></> },
      { content: <> <span className="text-[#8b949e] italic">/** {t('超量恢复轨迹预测模型', 'Supercompensation Trajectory Prediction Model')} */</span></> },
      { content: <> <span className="text-[#ff7b72]">export class</span> <span className="text-[#d2a8ff]">SupercompensationModel</span> {`{`}</> },
      { content: <> {'  '} <span className="text-[#ff7b72]">private</span> baseHorizon = <span className="text-[#79c0ff]">48</span>; <span className="text-[#8b949e] italic">// hours</span></> },
      { content: <></> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('推演未来的恢复峰值', 'Deduce future recovery peaks')} */</span></> },
      { content: <> {'  '} <span className="text-[#d2a8ff]">predictPeakTiming</span>(session: <span className="text-[#79c0ff]">SessionData</span>): <span className="text-[#79c0ff]">Date</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> impact = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">calculateImpact</span>(session);</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> window_offset = impact * <span className="text-[#79c0ff]">this</span>.baseHorizon;</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#8b949e] italic">// {t('结合心率变异性自适应调整时间窗口', 'Adaptively adjust time window by HRV')}</span></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> adaptiveOffset = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">applyHRVModulation</span>(window_offset);</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> peakTime = <span className="text-[#ff7b72]">new</span> <span className="text-[#79c0ff]">Date</span>(<span className="text-[#79c0ff]">Date</span>.<span className="text-[#d2a8ff]">now</span>() + adaptiveOffset * <span className="text-[#79c0ff]">3600000</span>);</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> peakTime;</> },
      { content: <> {'  '} {`}`}</> },
      { content: <></> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('评估训练负荷带来的生理冲击', 'Evaluate physiological impact from training load')} */</span></> },
      { content: <> {'  '} <span className="text-[#ff7b72]">private</span> <span className="text-[#d2a8ff]">calculateImpact</span>(session: <span className="text-[#79c0ff]">SessionData</span>): <span className="text-[#79c0ff]">number</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> intensity = session.avgHeartRate / session.maxHeartRate;</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">exp</span>(intensity * <span className="text-[#79c0ff]">2</span>) / <span className="text-[#79c0ff]">10</span>;</> },
      { content: <> {'  '} {`}`}</> },
      { content: <>{`}`}</> }
    ],
    [
      { content: <> <span className="text-[#ff7b72]">import</span> {`{ WearableData, ReadinessScore }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@/types'</span>;</> },
      { content: <></> },
      { content: <> <span className="text-[#8b949e] italic">/** {t('综合状态准备度追踪引擎', 'Comprehensive Readiness Tracking Engine')} */</span></> },
      { content: <> <span className="text-[#ff7b72]">export class</span> <span className="text-[#d2a8ff]">ReadinessTracker</span> {`{`}</> },
      { content: <> {'  '} <span className="text-[#ff7b72]">private</span> <span className="text-[#ff7b72]">readonly</span> weighting = {`{ sync: 0.4, sleep: 0.35, load: 0.25 };`}</> },
      { content: <></> },
      { content: <> {'  '} <span className="text-[#8b949e] italic">/** {t('生成每日状态快照与评分', 'Generate daily state snapshot and score')} */</span></> },
      { content: <> {'  '} <span className="text-[#d2a8ff]">evaluateDailyReadiness</span>(data: <span className="text-[#79c0ff]">WearableData</span>): <span className="text-[#79c0ff]">ReadinessScore</span> {`{`}</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> sleepScore = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">parseSleepCycles</span>(data.sleepPath);</> },
      { content: <> {'     '} <span className="text-[#ff7b72]">const</span> overload = <span className="text-[#79c0ff]">this</span>.<span className="text-[#d2a8ff]">getAcuteChronicRatio</span>(data.activity);</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">let</span> readiness = (<span className="text-[#79c0ff]">100</span> - overload) * <span className="text-[#79c0ff]">this</span>.weighting.load;</> },
      { content: <> {'     '} readiness += sleepScore * <span className="text-[#79c0ff]">this</span>.weighting.sleep;</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#8b949e] italic">// {t('动态惩罚高压状态', 'Dynamic penalty for high stress states')}</span></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">if</span> (data.stressIndex {'>'} <span className="text-[#79c0ff]">80</span>) {`{`}</> },
      { content: <> {'       '} readiness -= <span className="text-[#79c0ff]">15</span>;</> },
      { content: <> {'     '} {`}`}</> },
      { content: <></> },
      { content: <> {'     '} <span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">round</span>(<span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">min</span>(<span className="text-[#79c0ff]">Math</span>.<span className="text-[#d2a8ff]">max</span>(readiness, <span className="text-[#79c0ff]">0</span>), <span className="text-[#79c0ff]">100</span>));</> },
      { content: <> {'  '} {`}`}</> },
      { content: <>{`}`}</> }
    ]
  ], [t]);

  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const currentLines = snippets[snippetIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isInView) {
      setVisibleLines(0);
      setIsResetting(false);
      return;
    }

    if (isResetting) {
       timeout = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % snippets.length);
          setVisibleLines(0);
          setIsResetting(false);
       }, 200); // Short delay before starting next cycle
       return () => clearTimeout(timeout);
    }

    if (visibleLines < currentLines.length) {
      let baseSpeed = 250;
      if (currentLines[visibleLines].content.props?.children === "<></>") {
        baseSpeed = 130; // fast for empty lines
      } else {
        baseSpeed = Math.random() * 80 + 200;
      }

      timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          if (containerRef.current) {
            const element = containerRef.current;
            setTimeout(() => {
               if (element) {
                 element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
               }
            }, 50);
          }
          return prev + 1;
        });
      }, baseSpeed);
    } else {
      timeout = setTimeout(() => {
        setIsResetting(true);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [isInView, visibleLines, currentLines.length, isResetting, snippetIndex]);

  return (
    <div
      className="p-6 md:p-8 font-mono text-[10px] md:text-[12px] leading-[1.6] text-white/60 overflow-y-auto overscroll-y-contain overflow-x-hidden relative z-10 flex flex-col flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      ref={containerRef}
    >
      <motion.div
        className="flex flex-col w-full"
        animate={{ opacity: isResetting ? 0 : 1, y: isResetting ? -10 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${snippetIndex}-line-${i}`}
            className="flex w-full overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="w-8 shrink-0 text-white/20 select-none text-right pr-4 border-r border-white/10 pb-1 mt-1">
              {i + 1}
            </div>
            <div className="pl-4 md:pl-6 whitespace-pre-wrap break-words flex-1 pb-1 mt-1 relative flex">
               <motion.div
                 initial={{ opacity: 0, x: -5, filter: "blur(4px)" }}
                 animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                 className="inline-block"
               >
                 {line.content}
               </motion.div>
            </div>
          </motion.div>
        ))}

        {!isResetting && (
          <motion.div
             key={`${snippetIndex}-cursor`}
             className="flex w-full overflow-hidden"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
          >
           <div className="w-8 shrink-0 text-white/20 select-none text-right pr-4 border-r border-white/10 pb-1 mt-1">
             {visibleLines < currentLines.length ? visibleLines + 1 : currentLines.length + 1}
           </div>
           <div className="pl-4 md:pl-6 whitespace-pre-wrap break-words flex-1 pb-1 mt-1 flex items-center">
             <motion.span
               animate={{ opacity: [1, 0] }}
               transition={{ repeat: Infinity, duration: 0.4 }}
               className="inline-block w-[5px] bg-white h-3.5 md:h-4 ml-1 align-middle opacity-80 shrink-0"
             />
           </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
