"use client";
import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ARTISTS from '@/data/artists.json'
import ArtistModal from '@/components/ArtistModal';
import { Artist } from '@/types';
import Masthead from '@/components/Masthead';
import Header from '@/components/Header';

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// const artists = ARTISTS.sort((a, b) => a.name.localeCompare(b.name));

// function ArtistList() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const activeArtistId = searchParams.get('id');

//   const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Only enable on desktop (width > 768px)
//     const isDesktop = window.innerWidth > 768;
//     if (!isDesktop) return;

//     // Floating image follows mouse
//     const moveImage = (e: MouseEvent) => {
//       if (imageRef.current) {
//         gsap.to(imageRef.current, {
//           left: e.clientX + 20,
//           top: e.clientY - 50,
//           duration: 0.8,
//           ease: "power3.out"
//         });
//       }
//     };
//     window.addEventListener("mousemove", moveImage);
//     return () => window.removeEventListener("mousemove", moveImage);
//   }, []);

//   const openArtist = (id: string) => {
//     router.push(`/artists?id=${id}`, { scroll: false });
//   };

//   const activeArtist = activeArtistId ? artists.find(a => a.id === activeArtistId) : undefined;

//   return (

//     <main className="bg-[#ecebe9] min-h-screen pt-20 md:pt-32 px-4 md:px-10">
//       <div className='max-w-7xl mx-auto'>
//         <h1 className="text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none mb-12 md:mb-20">The Artists</h1>

//         {/* Floating Preview Image - Desktop only */}
//         <div
//           ref={imageRef}
//           className={`hidden md:block fixed left-0 top-0 w-64 h-80 pointer-events-none z-50 overflow-hidden transition-opacity duration-300 ${hoveredArtist ? 'opacity-100' : 'opacity-0'}`}
//         >
//           {hoveredArtist && (
//             <img src={hoveredArtist.image} className="w-full h-full object-cover grayscale" />
//           )}
//         </div>

//         <div className="flex flex-col border-t border-black">
//           {artists.map((artist) => (
//             <div
//               key={artist.id}
//               onMouseEnter={() => setHoveredArtist(artist)}
//               onMouseLeave={() => setHoveredArtist(null)}
//               onClick={() => openArtist(artist.id)}
//               className="group flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-10 border-b border-black cursor-pointer hover:pl-4 md:hover:pl-8 transition-all duration-500 gap-2 md:gap-0"
//             >
//               <h2 className="text-3xl md:text-6xl font-serif italic group-hover:text-orange-600 transition-colors">
//                 {artist.name}
//               </h2>
//               <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">{artist.role}</p>
//             </div>
//           ))}
//         </div>

//         {/* Pop-up Modal */}
//         {activeArtist && (
//           <ArtistModal
//             artist={activeArtist}
//             onClose={() => router.push('/artists', { scroll: false })}
//           />
//         )}
//       </div>
//     </main>
//   );
// }

// export default function ArtistsPage() {
//   return (
//     <Suspense fallback={<div>Loading Archive...</div>}>
//       <Header />
//       <Masthead text='Issue No. 003 — Artists' />
//       <ArtistList />
//     </Suspense>
//   );
// }

// Generate artistData from ARTISTS JSON, grouped by first letter
const generateArtistData = () => {
  const grouped: Record<string, Array<{ id: string; name: string; role: string; image?: string }>> = {};

  ARTISTS.forEach((artist) => {
    const firstLetter = artist.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push({
      id: artist.id,
      name: artist.name,
      role: artist.role,
      image: artist.image,
    });
  });

  // Sort artists within each letter group by name
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
};

const artistData = generateArtistData();

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function ArtistIndexContent() {
  const [activeLetter, setActiveLetter] = useState("A");
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeArtistId = searchParams.get('id');

  // Find active artist from URL params
  const activeArtist = activeArtistId ? ARTISTS.find(a => a.id === activeArtistId) : undefined;

  // Pause/resume Lenis when modal opens/closes
  useEffect(() => {
    if (activeArtist && lenisRef.current) {
      lenisRef.current.stop();
    } else if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, [activeArtist]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5 });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Observer to update active letter on scroll
    const sections = document.querySelectorAll(".letter-section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => setActiveLetter(section.id),
        onEnterBack: () => setActiveLetter(section.id),
      });
    });

    return () => lenis.destroy();
  }, []);

  // Floating image follows mouse - Desktop only
  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    const moveImage = (e: MouseEvent) => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          left: e.clientX + 20,
          top: e.clientY - 50,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    };
    window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, []);

  const openArtist = (id: string) => {
    router.push(`/artists?id=${id}`, { scroll: false });
  };

  const scrollToLetter = (letter: string) => {
    const target = document.getElementById(letter);
    if (target) {
      lenisRef.current?.scrollTo(target, { offset: -100 });
    }
  };

  return (
    <main className=" min-h-screen text-black px-6 md:px-20 pt-32 relative md:ml-16">
      <Header />
      <Masthead text='Issue No. 003 — Artists' />
      {/* Floating Preview Image - Desktop only */}
      <div
        ref={imageRef}
        className={`hidden md:block fixed left-16 top-0 w-64 h-80 pointer-events-none z-50 overflow-hidden transition-opacity duration-300 ${hoveredArtist ? 'opacity-100' : 'opacity-0'}`}
      >
        {hoveredArtist && (
          <img src={hoveredArtist.image} className="w-full h-full object-cover grayscale" alt={hoveredArtist.name} />
        )}
      </div>


      {/* 1. A-Z SCRUBBER SIDEBAR */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col z-header h-[70vh] justify-center">
        <div className="flex flex-col gap-0">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => scrollToLetter(char)}
              className={`text-[10px] font-bold py-1 transition-all duration-300 ${activeLetter === char ? "text-orange-600 scale-150" : "text-black/30 hover:text-black"
                } ${!artistData[char as keyof typeof artistData] && "pointer-events-none opacity-10"}`}
            >
              {char}
            </button>
          ))}
        </div>
      </nav>

      <header className="mb-20">
        <p className="text-xs font-mono tracking-[0.5em] text-orange-600 mb-4 uppercase">Archive Directory</p>
        <h1 className="text-[10vw] font-black uppercase leading-none tracking-tighter">Artists</h1>
      </header>

      {/* 2. ARTIST LIST BY LETTER */}
      <div className="flex flex-col pb-64">
        {alphabet.map((char) => {
          if (!artistData[char as keyof typeof artistData]) return null;
          return (
            <section key={char} id={char} className="letter-section py-20 border-t border-black/10 relative">
              {/* Background Letter Watermark */}
              <span className="absolute -left-10 top-0 text-[15vw] font-black text-black/[0.03] select-none">
                {char}
              </span>

              <div className="grid grid-cols-12 gap-8 items-start relative z-10">
                <div className="col-span-12 md:col-span-2">
                  <span className="text-4xl font-serif italic text-orange-600">{char}</span>
                </div>

                <div className="col-span-12 md:col-span-10 divide-y divide-black/5">
                  {artistData[char as keyof typeof artistData].map((artist) => {
                    // Find full artist data from ARTISTS array
                    const fullArtist = ARTISTS.find(a => a.id === artist.id);
                    if (!fullArtist) return null;

                    return (
                      <div
                        key={artist.id}
                        onMouseEnter={() => setHoveredArtist(fullArtist)}
                        onMouseLeave={() => setHoveredArtist(null)}
                        onClick={() => openArtist(artist.id)}
                        className="group py-8 flex justify-between items-center cursor-pointer hover:px-4 transition-all duration-500"
                      >
                        <div>
                          <h3 className="text-5xl font-bold uppercase tracking-tight group-hover:italic transition-all group-hover:text-orange-600">
                            {artist.name}
                          </h3>
                          <p className="text-xs font-mono text-zinc-500 mt-2 tracking-widest uppercase">
                            {artist.role}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest">View Profile</span>
                          <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">→</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Artist Modal */}
      {activeArtist && (
        <ArtistModal
          artist={activeArtist}
          onClose={() => router.push('/artists', { scroll: false })}
        />
      )}
    </main>
  );
}

export default function ArtistIndex() {
  return (
    <Suspense fallback={<div>Loading Archive...</div>}>
      <ArtistIndexContent />
    </Suspense>
  );
}