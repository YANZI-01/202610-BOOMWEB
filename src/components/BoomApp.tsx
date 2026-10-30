import { scrollReveal } from './scrollReveal';
import { motion, useReducedMotion, type MotionProps } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import './boom-app.css';

export function BoomApp() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const journalReveal = (delay = 0): MotionProps => ({
    initial: reduceMotion ? false : { opacity: 0, y: 64 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15, margin: '0px 0px -64px 0px' },
    transition: { duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="boom-app" className="boom-app" data-nav-theme="light" aria-label={t('BOOM APP 应用体验', 'BOOM app experience')}>
      <div className="boom-app-chapters">
        <motion.div className="boom-app-scene boom-app-home-scene" {...scrollReveal()}>
          <header className="boom-app-header">
            <h2>{t('身体的变化，', 'Your body changes.')}<br />{t('变成每天的行动。', 'Make your next move.')}</h2>
            <p className="boom-app-intro">{t('从连续感知，到看懂自己。让每一份身体数据，连接更适合你的训练与生活。', 'From continuous sensing to understanding yourself. Connect your body data with training and daily choices that fit you.')}</p>
          </header>
          <figure className="boom-app-phones boom-app-single">
            <img src="/boom-app-home-updated.png" width={2776} height={6592} alt={t('BOOM APP 首页：状态、睡眠、负荷与下一次训练时机建议', 'BOOM app home with condition, sleep, load and training timing guidance')} loading="lazy" decoding="async" />
          </figure>
        </motion.div>
        <div className="boom-app-scene boom-app-journal-scene">
          <motion.header className="boom-app-journal-copy boom-app-journal-reveal" {...journalReveal()}>
            <h2>{t('看见习惯，也看见改变', 'See habits. See change.')}</h2>
            <p>{t('自动整理日常行为，用清晰的数据洞察呈现身体变化', 'Automatically organize your daily activities and reveal changes in your body through clear data insights.')}</p>
          </motion.header>
          <div className="boom-app-editorial">
            <div className="boom-app-journal-column">
              <motion.div className="boom-app-journal-reveal" {...journalReveal()}>
                <img src="/boom-app-journal-screen.png?v=design-9" width={1959} height={4175} alt={t('日志界面：运动、睡眠与日常行为时间线', 'Journal: a timeline of movement, sleep and daily activities')} loading="lazy" decoding="async" />
              </motion.div>
            </div>
            <motion.figure className="boom-app-analysis-column boom-app-journal-reveal" {...journalReveal(0.12)}>
              <img src="/boom-app-analysis-screen.png?v=design-9" width={1960} height={5212} alt={t('运动分析界面：训练负荷、运动趋势与更多数值', 'Activity analysis: training load, trends and metrics')} loading="lazy" decoding="async" />
            </motion.figure>
          </div>
        </div>
        <div id="boom-app-coach" className="boom-app-scene boom-app-coach-scene" aria-labelledby="boom-app-coach-title">
          <motion.header className="boom-app-journal-copy boom-app-journal-reveal" {...journalReveal()}>
            <h2 id="boom-app-coach-title">{t('懂你状态的 AI 教练', 'An AI coach that understands your condition')}</h2>
            <p>{t('读懂身体变化，获得更贴合个人状态的训练与恢复指导', 'Understand changes in your body and get training and recovery guidance tailored to your condition.')}</p>
          </motion.header>
          <div className="boom-app-editorial">
            <div className="boom-app-journal-column">
              <motion.div className="boom-app-journal-reveal" {...journalReveal()}>
                <img src="/boom-app-coach-home.png?v=dark-frame" width={1959} height={4175} alt={t('BOOM COACH 首页：向 AI 教练询问饮食、身体变化与训练安排', 'BOOM COACH home: questions about nutrition, body changes and training')} loading="lazy" decoding="async" />
              </motion.div>
            </div>
            <motion.figure className="boom-app-coach-dialogue-column boom-app-journal-reveal" {...journalReveal(0.12)}>
              <img src="/boom-app-coach-dialogue.png?v=dark-frame" width={1959} height={4175} alt={t('AI 教练对话示例：结合饮食记录和训练负荷提供训练前加餐与恢复建议', 'AI coach conversation example with nutrition and recovery guidance based on food records and training load')} loading="lazy" decoding="async" />
            </motion.figure>
          </div>
        </div>
        <div id="boom-app-team" className="boom-app-scene boom-app-team-scene" aria-labelledby="boom-app-team-title">
          <motion.header className="boom-app-journal-copy boom-app-journal-reveal" {...journalReveal()}>
            <h2 id="boom-app-team-title">{t('团队与你同行', 'Your team, by your side')}</h2>
            <p>{t('掌握成员状态与活动安排，共同走好每一步。', 'Stay in tune with member readiness and activity plans. Take every step together.')}</p>
          </motion.header>
          <div className="boom-app-editorial">
            <motion.figure className="m-0 boom-app-journal-reveal" {...journalReveal()}>
              <img src="/boom-app-team-member.png" width={1959} height={5329} alt={t('团队成员界面：组员状态、小组训练计划与活动加入', 'Team member view: member readiness, group training plans and joining activities')} loading="lazy" decoding="async" />
            </motion.figure>
            <motion.figure className="boom-app-team-leader-column boom-app-journal-reveal" {...journalReveal(0.12)}>
              <img src="/boom-app-team-leader.png" width={1959} height={5798} alt={t('团队与组长界面：各小组状态、训练安排与调整建议', 'Team leader view: group readiness, training schedules and adjustment suggestions')} loading="lazy" decoding="async" />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
