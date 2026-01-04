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

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Disable body scroll
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup: restore original styles when modal closes
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [artist]);

  if (!artist) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent wheel events from propagating to parent
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-modal-backdrop flex justify-end bg-black/40 backdrop-blur-sm"
      onWheel={handleWheel}
    >
      <div onClick={handleBackdropClick} className="absolute inset-0" />

      <div ref={modalRef} className="relative w-full md:max-w-2xl bg-white h-full max-h-screen px-6 md:px-12 shadow-2xl flex flex-col overflow-hidden" data-lenis-prevent>
        <button onClick={onClose} className="absolute top-4 md:top-10 right-4 md:right-10 text-xs font-bold uppercase tracking-widest border-b border-black z-10">Close [X]</button>

        <div className="py-6 md:py-12 mt-12 md:mt-20 overflow-y-auto flex-1 -mr-6 md:-mr-12 pr-6 md:pr-12" data-lenis-prevent>
          <p className="text-orange-600 font-mono text-[10px] md:text-xs mb-2 uppercase">Artist Profile__{artist.id}</p>
          <h3 className="text-4xl md:text-7xl font-black uppercase leading-none mb-6 md:mb-8">{artist.name}</h3>

          <div className="w-full aspect-square bg-zinc-200 mb-6 md:mb-8 overflow-hidden">
            <img src={artist.image} className="w-full h-full object-cover" alt={artist.name} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-black pt-6 md:pt-8">
            <div>
              <p className="text-[9px] md:text-[14px] uppercase font-bold text-zinc-400 mb-2">Background</p>
              <p className="text-md leading-relaxed">{artist.bio}</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[14px] uppercase font-bold text-zinc-400 mb-2">Contribution</p>
              <p className="text-md leading-relaxed italic">Preserving the {artist.role} traditions for future generations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}