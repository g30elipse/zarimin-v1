"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { title: "Kham: The Heartbeat", category: "Documentary", src: "/work1.jpg" },
  { title: "Sifung Melodies", category: "Music Video", src: "/work2.jpg" },
  { title: "Bodo Folk Archive", category: "Preservation", src: "/work3.jpg" },
  { title: "Modern Echoes", category: "Studio Sessions", src: "/work4.jpg" },
];

export default function HighlightedWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.offsetWidth;
      const windowWidth = window.innerWidth;

      gsap.fromTo(scrollRef.current!,
        { x: 0 },
        {
          x: -(scrollWidth - windowWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current!,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            onUpdate: (self) => {
              // Add a skew effect based on scroll velocity
              const velocity = self.getVelocity() / 500;
              gsap.to(".work-card", { skewX: velocity, duration: 0.5, ease: "power3.out" });
            }
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-[#ecebe9]">
      <div className="h-screen flex items-center">
        {/* Section Header */}
        <div className="absolute top-10 md:top-20 left-4 md:left-20 z-10">
          <h2 className="text-[12vw] md:text-[10vw] font-black leading-none uppercase tracking-tighter opacity-10">
            Portfolio
          </h2>
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mt-[-1.5rem] md:mt-[-2rem] ml-1 md:ml-2">
            Selected Works — 01/04
          </p>
        </div>

        {/* Horizontal Container */}
        <div ref={scrollRef} className="flex gap-8 md:gap-20 px-4 md:px-[20vw] items-center">
          {works.map((work, i) => (
            <div key={i} className="work-card w-[280px] sm:w-[350px] md:w-[600px] flex-shrink-0 group cursor-none">
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">
                <img
                  src={work.src}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out grayscale hover:grayscale-0"
                />
                <div className="absolute top-2 md:top-4 right-2 md:right-4 text-[8px] md:text-[10px] font-mono bg-black text-white px-1.5 md:px-2 py-0.5 md:py-1">
                  CASE_{i + 1}
                </div>
              </div>
              <div className="mt-4 md:mt-6 flex justify-between items-end border-b border-black pb-3 md:pb-4">
                <div>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{work.category}</p>
                  <h3 className="text-xl md:text-3xl font-serif italic">{work.title}</h3>
                </div>
                <span className="text-xl md:text-2xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}