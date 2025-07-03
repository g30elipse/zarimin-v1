'use client'
import { Artist } from '@/types';
import { ArtistCard } from './ArtistCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);


interface ArtistGridProps {
    artists: Artist[];
}

export const ArtistGrid = ({ artists }: ArtistGridProps) => {

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.artist-card');

        gsap.fromTo(cards, {
            opacity: 0,
            y: 40,
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                scrub: true,
            },
        });
    }, []);

    return (
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );
};
