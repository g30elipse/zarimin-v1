"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "1951",
    title: "THE FIRST ECHO",
    sub: "Nileswar Brahma & HMV",
    desc: "A monumental shift from oral tradition to the gramophone. The first Bodo melodies were etched into history.",
    img: "https://images.unsplash.com/photo-1535992165812-68d1861aa71e?q=80&w=2000"
  },
  {
    year: "1980s",
    title: "CELLULOID DREAMS",
    sub: "The Rise of Bodo Cinema",
    desc: "Music evolved into a narrative force. The heartbeat of our stories moved from the village square to the silver screen.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000"
  },
  {
    year: "2023",
    title: "ZARIMIN BORN",
    sub: "The Digital Bridge",
    desc: "Zarimin was established to ensure that the ancient rhythms of the Sifung are never silenced by the noise of the modern world.",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".timeline-section");

      sections.forEach((section, i) => {
        const title = section.querySelector(".title");
        const image = section.querySelector(".img-wrap");
        const content = section.querySelector(".content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
          }
        });

        tl.from(image, { clipPath: "inset(0% 100% 0% 0%)", ease: "none" })
          .from(title, { y: 100, opacity: 0, duration: 0.5 }, "-=0.5")
          .from(content, { x: 50, opacity: 0, duration: 0.5 }, "-=0.3");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#1a1a1a] text-[#ecebe9]">
      {milestones.map((item, index) => (
        <div key={index} className="timeline-section h-screen w-full flex items-center justify-center relative overflow-hidden border-b border-white/5">

          {/* Background Year - Large Stylized Watermark */}
          <span className="absolute left-10 bottom-10 text-[25vw] font-black leading-none opacity-5 select-none pointer-events-none tracking-tighter italic">
            {item.year}
          </span>

          <div className="container mx-auto px-10 grid grid-cols-12 items-center gap-12 z-10">
            {/* Image Layer */}
            <div className="col-span-12 md:col-span-7 overflow-hidden">
              <div className="img-wrap aspect-video relative group">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Text Layer */}
            <div className="col-span-12 md:col-span-5 space-y-6">
              <p className="text-orange-500 font-mono tracking-[0.3em] text-sm uppercase">Archive_Ref: {item.year}</p>
              <h2 className="title text-6xl font-black uppercase tracking-tighter leading-none">
                {item.title}
              </h2>
              <div className="content">
                <p className="text-xl font-serif italic text-white/80 mb-4">{item.sub}</p>
                <p className="text-sm leading-relaxed text-zinc-400 max-w-sm border-l border-orange-500 pl-6">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}