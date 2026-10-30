import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !deviceRef.current || !textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: isMobile ? "top 60%" : "top top",
            end: isMobile ? undefined : "+=200%",
            scrub: isMobile ? false : 1,
            pin: isMobile ? false : true,
            toggleActions: isMobile ? "play none none reverse" : undefined,
          },
        });

        // Initially device is tilted away
        gsap.set(deviceRef.current, {
          rotationX: 60,
          rotationZ: -45,
          scale: 0.8,
          y: isMobile ? 50 : 100,
        });

        // Animate device to front view
        tl.to(
          deviceRef.current,
          {
            rotationX: 0,
            rotationZ: 0,
            scale: isMobile ? 1.05 : 1.2,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        );

        // Lines of text stagger fade and translate upward
        const lines = textRef.current?.querySelectorAll(".stagger-line") || [];
        if (lines.length > 0) {
          gsap.set(lines, { opacity: 0, y: isMobile ? 30 : 50 });
          tl.to(
            lines,
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
            },
            0.2,
          );
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="relative mb-[40px]">
      <section
        ref={containerRef}
        className="product-showcase relative w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]"
      >
        {/* The 3D Mockup */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none">
          <div ref={deviceRef} className="relative transform-style-3d group">
            <div className="showcase-product-image w-48 h-72 md:w-64 md:h-96 relative">
              <img
                src="/boom-one-silver.png"
                alt={t("BOOM ONE 白银色产品", "BOOM ONE in silver")}
                className="w-full h-full object-contain scale-[1.5]"
              />
            </div>

            {/* Floor Shadow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-boom-green/20 blur-2xl rounded-full mix-blend-screen opacity-50 z-[-1]"></div>

            {/* Text curving around the contour */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[336px] md:w-[320px] md:h-[448px] pointer-events-none z-30 overflow-visible"
              viewBox="0 0 320 448"
              fill="none"
            >
              <path
                id="device-contour"
                d="M 0 100 L 0 316 A 132 132 0 0 0 132 448 L 188 448 A 132 132 0 0 0 320 316 L 320 100"
              />
              <text
                fill="currentColor"
                className="text-boom-text-dim text-[14px] md:text-[18px] font-medium tracking-[0.2em] font-sans"
              >
                <textPath
                  href="#device-contour"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {t(
                    "顶级AI教练，看得见你的进步时机",
                    "Top AI Coach, sees the timing of your progress.",
                  )}
                </textPath>
              </text>
              <text
                fill="currentColor"
                className="text-boom-green text-[12px] md:text-[14px] font-bold tracking-[0.2em] font-sans filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                dy="28"
              >
                <textPath
                  href="#device-contour"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {t("7x24h全天候跟踪", "24/7 Tracking")}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Floating Text below device */}
          <div
            ref={textRef}
            className="showcase-copy absolute inset-0 flex flex-col md:block items-center justify-center pointer-events-none z-20 translate-y-[10px] md:translate-y-0"
          >
            <div className="showcase-copy-left md:absolute md:right-[calc(50%+30px)] md:top-1/2 md:-translate-y-1/2 mb-4 md:mb-0 text-center md:text-right">
              <div className="stagger-line text-3xl sm:text-4xl md:text-6xl leading-[1.1] font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl md:whitespace-nowrap">
                {t("不止于记录", "More than tracking")}
              </div>
            </div>

            <div className="showcase-copy-right md:absolute md:left-[calc(50%+30px)] md:top-1/2 md:translate-y-[-50%] mb-8 md:mb-0 text-center md:text-left translate-y-[10px]">
              <div className="stagger-line text-3xl sm:text-4xl md:text-6xl leading-[1.1] font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl md:whitespace-nowrap">
                {t("更在于决策", "It's about decision.")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
