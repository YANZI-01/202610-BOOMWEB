import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import React, { useEffect, useRef, useState } from "react";
import { X, Copy, Check, Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef<HTMLElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    let lastY = Math.max(0, window.scrollY);
    let travel = 0;
    let direction = 0;
    setIsHidden(false);
    const update = () => {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - innerHeight));
      const delta = y - lastY;
      const nextDirection = Math.sign(delta);
      if (nextDirection && nextDirection !== direction) travel = 0;
      if (nextDirection) direction = nextDirection;
      travel += delta;
      if (y < 64) setIsHidden(false);
      else if (Math.abs(travel) >= 12) {
        setIsHidden(travel > 0);
        travel = 0;
      }
      lastY = y;
      // Sample the section behind the bar, including while the bar is off-screen.
      const probe = (navRef.current?.offsetHeight || 64) / 2;
      const themed = [...document.querySelectorAll<HTMLElement>('[data-nav-theme]')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      const sampledTheme = themed.find(el => el.dataset.navTheme === 'dark')?.dataset.navTheme
        ?? themed.at(-1)?.dataset.navTheme;
      setTheme(sampledTheme === 'dark' || (!sampledTheme && currentPath !== '/') ? 'dark' : 'light');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [currentPath]);
  const navHidden = isHidden && !isMobileMenuOpen && !isModalOpen;


  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        data-theme={theme}
        data-hidden={navHidden}
        aria-label={t("主导航", "Main navigation")}
        onFocusCapture={() => setIsHidden(false)}
        initial={false}
        animate={{ y: navHidden ? '-110%' : '0%' }}
        transition={{ duration: reduceMotion ? 0 : .28, ease: [.22, 1, .36, 1] }}
        className="site-nav fixed w-full z-50 top-0 left-0 flex items-center px-7 py-3 backdrop-blur-md bg-black/50 border-b border-white/5"
      >
        <div className="flex items-center gap-3 flex-1 flex-basis-0">
          <Link
            to="/"
            className="font-display font-bold text-[18px] tracking-widest text-white"
            translate="no"
            aria-label="BOOM AI"
          >
            <svg className="brand-logo" viewBox="98 101 942 134" width="56" height="8" aria-hidden="true">
              <image href="/boomai-logo.png" width="1138" height="336" />
            </svg>
          </Link>
        </div>
        <div className="site-nav-links hidden md:flex items-center justify-center gap-7 text-[13px] flex-1 flex-basis-0">
          <Link
            to="/"
            className={`transition-all duration-300 relative py-1.5 tracking-wider ${
              currentPath === "/"
                ? "text-boom-green font-medium text-glow"
                : "text-white/70 font-light hover:text-white"
            }`}
          >
            {t("产品概览", "Product Overview")}
            {currentPath === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-boom-green shadow-[0_0_8px_#a3e635]" />
            )}
          </Link>
          <Link
            to="/without-boom"
            className={`transition-all duration-300 relative py-1.5 tracking-wider ${
              currentPath === "/without-boom"
                ? "text-boom-green font-medium text-glow"
                : "text-white/70 font-light hover:text-white"
            }`}
          >
            {t("Why BOOM", "Why BOOM")}
            {currentPath === "/without-boom" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-boom-green shadow-[0_0_8px_#a3e635]" />
            )}
          </Link>
          <Link
            to="/brand"
            className={`transition-all duration-300 relative py-1.5 tracking-wider ${
              currentPath === "/brand"
                ? "text-boom-green font-medium text-glow"
                : "text-white/70 font-light hover:text-white"
            }`}
          >
            {t("关于我们", "About Us")}
            {currentPath === "/brand" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-boom-green shadow-[0_0_8px_#a3e635]" />
            )}
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <button
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            translate="no"
            className="text-[11px] font-bold border border-white/20 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="nav-explore-cta bg-[#0057FF] text-white px-4 py-1.5 rounded-full font-bold text-[13px] tracking-wide shadow-[0_8px_26px_rgba(0,87,255,.38)] hover:bg-[#1672ff] hover:scale-105 transition-all hidden sm:block"
          >
            {t("立即探索", "Explore Now")}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t("关闭菜单", "Close menu") : t("打开菜单", "Open menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-[22px] h-[22px]" />
            ) : (
              <Menu className="w-[22px] h-[22px]" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-navigation"
            data-theme={theme}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="site-mobile-menu fixed top-[64px] left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 z-40 py-5 px-7 flex flex-col gap-5 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg transition-colors tracking-wider ${
                currentPath === "/"
                  ? "text-boom-green font-medium"
                  : "text-white/70 font-light"
              }`}
            >
              {t("产品概览", "Product Overview")}
            </Link>
            <Link
              to="/without-boom"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg transition-colors tracking-wider ${
                currentPath === "/without-boom"
                  ? "text-boom-green font-medium"
                  : "text-white/70 font-light"
              }`}
            >
              {t("Why BOOM", "Why BOOM")}
            </Link>
            <Link
              to="/brand"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg transition-colors tracking-wider ${
                currentPath === "/brand"
                  ? "text-boom-green font-medium"
                  : "text-white/70 font-light"
              }`}
            >
              {t("关于我们", "About Us")}
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="nav-explore-cta bg-[#0057FF] text-white px-5 py-3 rounded-full font-bold tracking-wide shadow-[0_10px_28px_rgba(0,87,255,.38)] mt-4 w-full sm:hidden"
            >
              {t("立即探索", "Explore Now")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div
            key="modal-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#111113] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl z-10 overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("立即探索", "Explore Now")}
                </h3>
              </div>

              <div className="space-y-4">
                {/* user registration */}
                <div className="bg-black/50 border border-white/5 rounded-2xl p-5 flex flex-col items-start gap-4">
                  <p className="text-boom-text-dim text-sm leading-relaxed text-left">
                    {t(
                      "立即体验产品，可联系我们：",
                      "To explore the product, please contact us:",
                    )}
                  </p>
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-white font-mono text-base font-medium tracking-wide">
                      hello@boomai.com.cn
                    </span>
                    <button
                      onClick={() => handleCopy("hello@boomai.com.cn")}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      {copiedText === "hello@boomai.com.cn" ? (
                        <Check className="w-3.5 h-3.5 text-boom-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedText === "hello@boomai.com.cn"
                        ? t("已复制", "Copied")
                        : t("复制", "Copy")}
                    </button>
                  </div>
                </div>

                {/* investors */}
                <div className="bg-black/50 border border-white/5 rounded-2xl p-5 flex flex-col items-start gap-4">
                  <p className="text-boom-text-dim text-sm leading-relaxed text-left">
                    {t(
                      "寻找商业合作，直联创始人：",
                      "For business cooperation, contact the founder directly:",
                    )}
                  </p>
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-white font-mono text-base font-medium tracking-wide">
                      founder@boomai.com.cn
                    </span>
                    <button
                      onClick={() => handleCopy("founder@boomai.com.cn")}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      {copiedText === "founder@boomai.com.cn" ? (
                        <Check className="w-3.5 h-3.5 text-boom-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedText === "founder@boomai.com.cn"
                        ? t("已复制", "Copied")
                        : t("复制", "Copy")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
