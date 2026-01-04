"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';

gsap.registerPlugin(ScrollTrigger);
const historyData = [
  {
    era: "The Origin",
    date: "3000 BCE",
    entries: [
      {
        title: "The Himalayan Descent",
        content: "Boro people migrated from the Yellow River valley through Tibet and Bhutan.",
        tag: "MIGRATION"
      },
      {
        title: "The Kirata Period",
        content: "Referred to as Kiratas in the Mahabharata. Kings like Narakasura identified as Boro-Kachari rulers.",
        tag: "MYTHOS"
      },
      {
        title: "Agrarian Pioneers",
        content: "Introduced silkworm rearing and wet rice cultivation to the region.",
        tag: "INNOVATION"
      }
    ]
  },
  {
    era: "Era of Kingdoms",
    date: "12th - 19th C",
    entries: [
      {
        title: "Medieval Dominance",
        content: "Established powerful kingdoms including the Chutiya, Dimasa, and Koch dynasties.",
        tag: "DYNASTY"
      },
      {
        title: "The Fall of Sovereignty",
        content: "1854: The last Kachari kingdom fell under British control after King Govinda Chandra's death.",
        tag: "COLONIAL"
      }
    ]
  }
  // ... continue for other eras
];


gsap.registerPlugin(ScrollTrigger);

export default function DeepHistory() {
  const containerRef = useRef(null);
  const [currentYear, setCurrentYear] = useState("3000 BCE");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Progress Bar Animation
      gsap.to(".progress-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });

      // 2. Stacking Era Sections
      const eras = gsap.utils.toArray(".era-group");
      eras.forEach((era: any, i: number) => {
        const sidebar = era.querySelector(".era-sidebar");
        const cards = era.querySelectorAll(".entry-card");

        // Sticky Sidebar logic
        ScrollTrigger.create({
          trigger: era as HTMLElement,
          start: "top top",
          end: "bottom bottom",
          pin: sidebar,
          pinSpacing: false,
        });

        // Update Global Year based on Era in view
        ScrollTrigger.create({
          trigger: era as HTMLElement,
          start: "top center",
          onEnter: () => setCurrentYear(era.dataset.date),
          onEnterBack: () => setCurrentYear(era.dataset.date),
        });

        // Parallax Entrance for Cards
        cards.forEach((card: any, j: number) => {
          gsap.fromTo(card,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] text-[#d4d4d4] cursor-none">
      <Header />
      {/* 1. DYNAMIC PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-[100]">
        <div className="progress-fill absolute top-0 left-0 h-full w-full bg-orange-500 origin-left scale-x-0" />
        <div className="absolute top-4 left-10 flex items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.5em] text-orange-500 uppercase">Archive Journey</span>
          <span className="h-[1px] w-12 bg-zinc-700" />
          <span className="text-xl font-black italic text-white font-serif">{currentYear}</span>
        </div>
      </div>

      {/* 2. TIMELINE CONTENT */}
      {historyData.map((section, sIdx) => (
        <section
          key={sIdx}
          data-date={section.date}
          className="era-group relative flex flex-col md:flex-row min-h-screen"
        >

          {/* STICKY SIDEBAR (Left) */}
          <div className="era-sidebar w-full md:w-[40%] h-screen flex flex-col justify-center p-10 md:p-24 bg-[#0a0a0a] border-r border-white/5">
            <h2 className="text-7xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference">
              {section.era.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            <div className="mt-8 flex items-center gap-4 overflow-hidden">
              <span className="h-[1px] w-20 bg-orange-500" />
              <p className="text-sm font-mono tracking-widest text-zinc-500">{section.date}</p>
            </div>
          </div>

          {/* SCROLLING ENTRIES (Right) */}
          <div className="w-full md:w-[60%] flex flex-col gap-[30vh] py-[30vh] px-10 md:px-24">
            {section.entries.map((entry, eIdx) => (
              <div key={eIdx} className="entry-card max-w-lg relative group">
                <span className="absolute -left-12 top-0 text-orange-500/20 font-black text-6xl select-none">0{eIdx + 1}</span>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 mb-4">{entry.tag}</p>
                <h3 className="text-5xl font-bold uppercase mb-8 leading-none tracking-tighter text-white transition-all duration-500">
                  {entry.title}
                </h3>
                <p className="text-lg leading-relaxed text-zinc-400 font-light border-l border-white/10 pl-8">
                  {entry.content}
                </p>

                {/* Decorative Element */}
                <div className="mt-10 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-1000" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* FINAL CALL TO ACTION */}
      <section className="h-screen flex flex-col items-center justify-center bg-orange-600 text-white">
        <p className="uppercase tracking-[1em] text-xs mb-8">End of Archive</p>
        <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-none text-center">
          BECOME <br /> THE STORY
        </h2>
      </section>
    </main>
  );
}