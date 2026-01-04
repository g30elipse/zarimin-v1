"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Masthead from '@/components/Masthead';

gsap.registerPlugin(ScrollTrigger);
const historyData = [
  {
    era: "Ritual and Folk Theatre",
    date: "Pre-1900s",
    entries: [
      {
        title: "The Kherai Origins",
        content: "Historically, the 'entertainment' of the Boro people was inseparable from their religion (Bathouism). The Kherai Puja is the ultimate performance landmark, featuring the Doudini (shamaness) who performs up to 18 different types of dances to the beat of the Kham (drum) and the melody of the Siphung (flute).",
        tag: "RITUAL"
      },
      {
        title: "Early Folk Genres",
        content: "Before modern stages, there were folk forms like Thakhrifalla (a storytelling form where the narrator moves like a spinning wheel), Phuthula Gaan (traditional puppet theatre used for moral education), and Jatra Gaan (the earliest form of Boro drama, heavily influenced by the wandering opera styles of Bengal and Assam).",
        tag: "FOLK"
      }
    ]
  },
  {
    era: "The Rise of Modern Drama",
    date: "1919–1960",
    entries: [
      {
        title: "1919: The First Play",
        content: "Satish Chandra Basumatary wrote Nalabuha, considered the first unpublished Boro play. It was a milestone because it moved the community's stories from oral tradition to a written, scripted format.",
        tag: "MILESTONE"
      },
      {
        title: "1925: First Published Play",
        content: "The first published Boro play, 'Hamphe' by Maniram Islary, was released, marking the beginning of Boro literature in print.",
        tag: "PUBLICATION"
      },
      {
        title: "1950s: The Reformist Era",
        content: "This was the 'Budding Age' (Bithorai Yug). Playwrights like Kamal Kumar Brahma used drama as a weapon for social reform, tackling issues like illiteracy and alcohol addiction. His play Gwdan Faichali (1959) is considered the first truly modern Boro play.",
        tag: "REFORM"
      }
    ]
  },
  {
    era: "The Cinematic Revolution",
    date: "1986–Present",
    entries: [
      {
        title: "1986: Birth of Boro Cinema",
        content: "The first Boro language film, 'Alayaron', was released. Directed by Jwngdao Bodosa, it won a National Film Award, proving that Boro stories had a place on the national stage.",
        tag: "CINEMA"
      },
      {
        title: "1990s – Early 2000s: The VCD Era",
        content: "The rise of the Boro music video industry. These VCDs (Video Compact Discs) became the most popular form of home entertainment, often featuring high-energy Bagurumba folk-fusion beats.",
        tag: "MUSIC"
      },
      {
        title: "2009: The 'Haina Muli' Phenomenon",
        content: "The release of the comedy film series Haina Muli marked a shift toward contemporary pop culture. It used humor and satire to discuss the political and social struggles of the Bodoland region.",
        tag: "POP CULTURE"
      }
    ]
  },
  {
    era: "Boro Mobile Theatre",
    date: "2000s–Present",
    entries: [
      {
        title: "Scale and Production",
        content: "In the last 20 years, the Boro community has adopted the famous Assamese Mobile Theatre (Bhramyaman) model and made it their own. Groups like Bodoland Theatre and Hengul Theatre travel with massive stages, professional lighting, and sound systems, often performing to crowds of 5,000+ people in remote villages.",
        tag: "THEATRE"
      },
      {
        title: "Cultural Impact",
        content: "These groups are the largest employers of local artists, musicians, and technicians, making the entertainment sector a vital part of the Boro economy.",
        tag: "ECONOMY"
      }
    ]
  }
];


gsap.registerPlugin(ScrollTrigger);

export default function DeepHistory() {
  const containerRef = useRef(null);
  const [currentYear, setCurrentYear] = useState("Pre-1900s");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only enable pinning on desktop (width >= 768px)
      const isDesktop = window.innerWidth >= 768;

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

        // Sticky Sidebar logic - only on desktop
        if (isDesktop && sidebar) {
          ScrollTrigger.create({
            trigger: era as HTMLElement,
            start: "top top",
            end: "bottom bottom",
            pin: sidebar,
            pinSpacing: false,
          });
        }

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
      <Masthead text='Issue No. 002 — History Archive' />
      {/* 1. DYNAMIC PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-[100]">
        <div className="progress-fill absolute top-0 left-0 h-full w-full bg-orange-500 origin-left scale-x-0" />
        <div className="absolute top-3 md:top-4 left-4 md:left-10 flex items-center gap-2 md:gap-4">
          <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] md:tracking-[0.5em] text-orange-500 uppercase">Archive Journey</span>
          <span className="hidden md:block h-[1px] w-12 bg-zinc-700" />
          <span className="text-sm md:text-xl font-black italic text-white font-serif">{currentYear}</span>
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
          <div className="era-sidebar w-full md:w-[40%] min-h-[50vh] md:h-screen flex flex-col justify-center p-6 md:p-24 bg-[#0a0a0a] border-b md:border-r border-white/5">
            <h2 className="text-4xl md:text-[5vw] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference">
              {section.era.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 overflow-hidden">
              <span className="h-[1px] w-12 md:w-20 bg-orange-500" />
              <p className="text-xs md:text-sm font-mono tracking-widest text-zinc-500">{section.date}</p>
            </div>
          </div>

          {/* SCROLLING ENTRIES (Right) */}
          <div className="w-full md:w-[60%] flex flex-col gap-16 md:gap-[30vh] py-16 md:py-[30vh] px-4 md:px-24">
            {section.entries.map((entry, eIdx) => (
              <div key={eIdx} className="entry-card max-w-lg relative group">
                <span className="absolute -left-8 md:-left-12 top-0 text-orange-500/20 font-black text-4xl md:text-6xl select-none">0{eIdx + 1}</span>
                <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-orange-500 mb-3 md:mb-4">{entry.tag}</p>
                <h3 className="text-3xl md:text-5xl font-bold uppercase mb-6 md:mb-8 leading-none tracking-tighter text-white transition-all duration-500">
                  {entry.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-zinc-400 font-light border-l border-white/10 pl-4 md:pl-8">
                  {entry.content}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 md:mt-10 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-1000" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* FINAL CALL TO ACTION */}
      <section className="h-screen flex flex-col items-center justify-center bg-orange-600 text-white px-4">
        <p className="uppercase tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-xs mb-6 md:mb-8">End of Archive</p>
        <h2 className="text-[14vw] md:text-[12vw] font-black tracking-tighter uppercase leading-none text-center">
          BECOME <br /> THE STORY
        </h2>
      </section>
    </main>
  );
}