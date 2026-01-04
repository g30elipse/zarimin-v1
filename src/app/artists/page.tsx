"use client";
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import ArtistModal from '@/components/ArtistModal';
import { Artist } from '@/types';
import ARTISTS from '@/data/artists.json'
import Header from '@/components/Header';
import Masthead from '@/components/Masthead';

const artists = ARTISTS.sort((a, b) => a.name.localeCompare(b.name));

function ArtistList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeArtistId = searchParams.get('id');

  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop (width > 768px)
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    // Floating image follows mouse
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

  const activeArtist = activeArtistId ? artists.find(a => a.id === activeArtistId) : undefined;

  return (

    <main className="bg-[#ecebe9] min-h-screen pt-32 px-10">
      <div className='max-w-7xl mx-auto'>
        <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none mb-20">The Artists</h1>

        {/* Floating Preview Image - Desktop only */}
        <div
          ref={imageRef}
          className={`hidden md:block fixed left-0 top-0 w-64 h-80 pointer-events-none z-50 overflow-hidden transition-opacity duration-300 ${hoveredArtist ? 'opacity-100' : 'opacity-0'}`}
        >
          {hoveredArtist && (
            <img src={hoveredArtist.image} className="w-full h-full object-cover grayscale" />
          )}
        </div>

        <div className="flex flex-col border-t border-black">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onMouseEnter={() => setHoveredArtist(artist)}
              onMouseLeave={() => setHoveredArtist(null)}
              onClick={() => openArtist(artist.id)}
              className="group flex justify-between items-center py-10 border-b border-black cursor-pointer hover:pl-8 transition-all duration-500"
            >
              <h2 className="text-6xl font-serif italic group-hover:text-orange-600 transition-colors">
                {artist.name}
              </h2>
              <p className="text-sm uppercase tracking-[0.3em] font-bold">{artist.role}</p>
            </div>
          ))}
        </div>

        {/* Pop-up Modal */}
        {activeArtist && (
          <ArtistModal
            artist={activeArtist}
            onClose={() => router.push('/artists', { scroll: false })}
          />
        )}
      </div>
    </main>
  );
}

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div>Loading Archive...</div>}>
      <Header />
      <Masthead text='Issue No. 003 — Artists' />
      <ArtistList />
    </Suspense>
  );
}