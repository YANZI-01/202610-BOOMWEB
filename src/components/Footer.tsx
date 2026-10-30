import { useLanguage } from "../context/LanguageContext";
import './footer-glass.css';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="site-footer" data-nav-theme="light" className="site-footer-glass relative z-10 border-t border-white/10 pt-20 pb-10 px-6 md:px-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-start gap-10 md:gap-32 mb-16">
         <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span translate="no" className="font-display font-bold text-lg tracking-widest text-white">BOOM</span>
            </div>
            <p className="text-boom-text-dim text-sm max-w-[330px] mx-auto md:mx-0 whitespace-pre-line">
               {t('向内探索，向外突破。\n为每一位追求卓越的耐力运动者而生。BOOM 将顶级教练团队的思维融入全天候 AI Coach，让科学训练与精准恢复成为持续进步的底层能力。', 'Explore inward, break outward. Built for every endurance athlete striving for excellence. BOOM integrates the mindset of top coaching teams into a 24/7 AI Coach, making scientific training and precise recovery the foundational capability for continuous progress.')}
            </p>
         </div>

         <div>
            <h4 className="text-white font-bold mb-4 font-display">{t('联系我们', 'Contact Us')}</h4>
            <ul className="space-y-2 text-sm text-boom-text-dim">
              <li>{t('官网：boomai.com.cn', 'Website: boomai.com.cn')}</li>
              <li>{t('官方邮箱：hello@boomai.com.cn', 'Official Email: hello@boomai.com.cn')}</li>
              <li>{t('创始人邮箱：founder@boomai.com.cn', 'Founder Email: founder@boomai.com.cn')}</li>
            </ul>
         </div>
      </div>

      <div className="border-t border-white/5 pt-8 text-center text-xs text-boom-text-dim flex flex-col gap-2">
         <p>{t('熵减纪元（重庆）创新科技有限责任公司 是一家致力于人类表现优化的科技公司。', 'Negentropy Era (Chongqing) Innovative Technology Co., Ltd. is a Human Performance Optimization Company.')}</p>
         <p>© 2026 BOOM / {t('熵减纪元（重庆）创新科技有限责任公司', 'Negentropy Era (Chongqing) Innovative Technology Co., Ltd.')}. All rights reserved.</p>
      </div>
    </footer>
  );
}
