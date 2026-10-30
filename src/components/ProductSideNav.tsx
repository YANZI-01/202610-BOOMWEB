import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function ProductSideNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("overview");
  const [darkSurface, setDarkSurface] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "wear", "precision", "boom-app", "recovery", "aicoach"];
      // Use middle of screen to determine the active section for the side nav
      const triggerY = window.innerHeight * 0.5;

      let active = "overview";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            active = id;
          }
        }
      }
      setActiveSection(active);
      setDarkSurface([...document.querySelectorAll('[data-nav-theme="dark"]')].some(el => {
        const rect = el.getBoundingClientRect();
        return rect.top <= triggerY && rect.bottom > triggerY;
      }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "overview", number: '01', label: t('概览', 'Overview') },
    { id: "wear", number: '02', label: t('佩戴体验', 'Experience') },
    { id: "precision", number: '03', label: t('超高精度', 'Precision') },
    { id: "boom-app", number: '04', label: t('应用体验', 'App experience') },
    { id: "recovery", number: '05', label: t('恢复算法', 'Recovery') },
    { id: "aicoach", number: '06', label: t('AI教练', 'AI COACH') }
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div data-surface={darkSurface ? "dark" : "light"} className="product-side-nav fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-6 mix-blend-difference pointer-events-none">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleSectionClick(e, item.id)}
            className="group flex items-center gap-3 py-2 pointer-events-auto cursor-none md:cursor-pointer"
          >
             <span className={`text-[10px] font-mono tracking-widest transition-all duration-700 w-4 text-center ${
                 isActive ? 'text-white' : 'text-white/20 group-hover:text-white/60'
               }`}>
               {item.number}
             </span>

            <div className={`relative transition-all duration-700 ease-in-out ${
               isActive ? 'h-6 w-[2px] bg-white' : 'h-[2px] w-[2px] bg-white/20 group-hover:bg-white/60 group-hover:h-3 rounded-full'
            }`} />

             <span className={`text-xs font-light tracking-[0.25em] transition-all duration-700 whitespace-nowrap uppercase ${
                 isActive ? 'opacity-100 translate-x-0 text-white' : 'opacity-0 -translate-x-2 text-white/40 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:text-white/80'
               }`}>
                 {item.label}
             </span>
          </a>
        );
      })}
    </div>
  );
}
