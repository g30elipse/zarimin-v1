"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Artist } from '@/types';

interface ArtistModalProps {
  artist: Artist;
  onClose: () => void;
}

export default function ArtistModal({ artist, onClose }: ArtistModalProps) {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(modalRef.current, { x: '100%' }, { x: '0%', duration: 0.8, ease: 'power4.out' });
  }, [artist]);

  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <div onClick={onClose} className="absolute inset-0" />

      <div ref={modalRef} className="relative w-full md:max-w-2xl bg-white h-full p-6 md:p-12 shadow-2xl flex flex-col overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 md:top-10 right-4 md:right-10 text-xs font-bold uppercase tracking-widest border-b border-black">Close [X]</button>

        <div className="mt-12 md:mt-20">
          <p className="text-orange-600 font-mono text-[10px] md:text-xs mb-2 uppercase">Artist Profile__{artist.id}</p>
          <h3 className="text-4xl md:text-7xl font-black uppercase leading-none mb-6 md:mb-8">{artist.name}</h3>

          <div className="w-full aspect-square bg-zinc-200 mb-6 md:mb-8 overflow-hidden">
            <img src={artist.image} className="w-full h-full object-cover" alt={artist.name} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-black pt-6 md:pt-8">
            <div>
              <p className="text-[9px] md:text-[10px] uppercase font-bold text-zinc-400 mb-2">Background</p>
              <p className="text-sm leading-relaxed">{artist.bio}</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] uppercase font-bold text-zinc-400 mb-2">Contribution</p>
              <p className="text-sm leading-relaxed italic">Preserving the {artist.role} traditions for future generations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}