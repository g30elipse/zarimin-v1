"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const historyData = [
  {
    era: "The Origin",
    date: "3000 BCE",
    title: "The Himalayan Descent",
    content: "Migration from the Yellow River valley through Tibet and Bhutan, settling in the foothills of the Himalayas. These Tibeto-Burman pioneers introduced sericulture and wet rice cultivation to the region.",
    tag: "MIGRATION // ANCIENT"
  },
  {
    era: "The Kirata Period",
    date: "EPIC ERA",
    title: "Kings of the Mahabharata",
    content: "Identified as the Kiratas in ancient Hindu epics. Monarchs like Narakasura and Bhagadatta ruled the valley as Boro-Kachari sovereigns, fighting on the plains of Kurukshetra.",
    tag: "MYTHOS // SOVEREIGNTY"
  },
  {
    era: "The Era of Kingdoms",
    date: "12th CENT",
    title: "Medieval Dominance",
    content: "The establishment of the Chutiya, Dimasa, and Koch dynasties. At their peak, Boro-Kachari rulers governed almost the entire Brahmaputra Valley before the Ahom-Kachari conflicts began.",
    tag: "DYNASTY // POWER"
  },
  {
    era: "The Re-awakening",
    date: "1919",
    title: "Intellectual Dawn",
    content: "Formation of the Boro Chatra Sanmilani. This era saw the Brahma Movement spearhead social reform, replacing traditional rituals with education and social equality.",
    tag: "REFORM // IDENTITY"
  },
  {
    era: "Modern Identity",
    date: "2004",
    title: "Constitutional Status",
    content: "The inclusion of the Boro language in the 8th Schedule of the Indian Constitution, marking its official recognition as a major Indian language.",
    tag: "POLITICAL // LANGUAGE"
  }
];

export default function HistoryTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".history-item");

      sections.forEach((section: any) => {
        const bigDate = section.querySelector(".big-date");
        const content = section.querySelector(".content-box");

        // Parallax the large year text
        gsap.to(bigDate, {
          y: -150,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Fade in the content
        gsap.from(content, {
          opacity: 0,
          x: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0f0f0f] text-[#d4d4d4] overflow-x-hidden">
      {/* Introduction */}
      <section className="h-screen flex flex-col justify-center px-10 md:px-24">
        <p className="text-orange-500 font-mono tracking-widest mb-4">THE ZARIMIN ARCHIVE</p>
        <h1 className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter italic">
          ROOTS & <br /> RHYTHMS
        </h1>
        <p className="max-w-xl mt-8 text-lg text-zinc-400">
          A visual journey through the Boro-Kachari lineage. From the Kirata Kings to the modern cultural renaissance.
        </p>
      </section>

      {/* Timeline Items */}
      {historyData.map((item, index) => (
        <section
          key={index}
          className="history-item min-h-screen relative flex items-center px-10 md:px-24 border-t border-white/5 py-20"
        >
          {/* Background Year */}
          <div className="big-date absolute left-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 pointer-events-none select-none italic">
            {item.date}
          </div>

          <div className="grid grid-cols-12 w-full z-10">
            <div className="col-span-12 md:col-start-7 md:col-span-6 content-box">
              <span className="text-orange-500 font-mono text-xs mb-2 block">{item.tag}</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase mb-6 tracking-tight">
                {item.title}
              </h2>
              <p className="text-xl leading-relaxed text-zinc-300 font-light border-l border-zinc-700 pl-8 italic">
                {item.content}
              </p>

              {/* "Cultural Pillar" Callout */}
              <div className="mt-12 flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] uppercase tracking-tighter rotate-12">
                  Heritage
                </div>
                <div className="w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center text-[10px] uppercase tracking-tighter -rotate-12 text-orange-500">
                  Focus
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Core Cultural Pillars Grid (Closing) */}
      <section className="py-32 px-10 md:px-24 bg-zinc-900/50">
        <h3 className="text-xs font-mono uppercase tracking-[0.5em] mb-20 text-center text-orange-500">The Soul of Zarimin</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-3xl font-serif italic">Bathouism</h4>
            <p className="text-sm text-zinc-400">The Sijou plant worship. Five elements: Earth, Water, Air, Fire, and Ether.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-3xl font-serif italic">Bagurumba</h4>
            <p className="text-sm text-zinc-400">The iconic "Butterfly Dance." A reflection of nature and the Boro spirit.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-3xl font-serif italic">Dokhona & Aronai</h4>
            <p className="text-sm text-zinc-400">Symbolic textiles representing honor, respect, and identity.</p>
          </div>
        </div>
      </section>
    </main>
  );
}