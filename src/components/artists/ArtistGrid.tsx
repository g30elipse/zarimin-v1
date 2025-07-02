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
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !containerRef.current) return;

        // Animate cards as they come into view
        if (cardsRef.current.length) {
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 40 },
                {
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
                }
            );
        }

        // GSAP horizontal scroll
        const container = containerRef.current;
        const totalCards = artists.length + 1;
        const cardWidth = container.querySelector('div')?.offsetWidth || 300;
        const gap = 24; // gap-6 = 1.5rem = 24px
        const totalWidth = totalCards * (cardWidth + gap) - gap;
        const viewportWidth = sectionRef.current.offsetWidth;
        const scrollLength = totalWidth - viewportWidth;

        if (scrollLength > 0) {
            gsap.to(container, {
                x: -scrollLength,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${scrollLength}`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [artists]);

    return (
        <section ref={sectionRef} className="w-full sticky top-20 overflow-x-hidden">
            <div
                ref={containerRef}
                className="flex gap-6"
                style={{ willChange: 'transform' }}
            >
                {artists.map((artist, idx) => (
                    <div
                        key={artist.id}
                        ref={el => {
                            cardsRef.current[idx] = el;
                        }}
                        className="flex-shrink-0 min-w-[75vw] sm:min-w-[40vw] md:min-w-[25vw] lg:min-w-[22vw] xl:min-w-[18vw] max-w-[350px] w-full"
                    >
                        <ArtistCard artist={artist} />
                    </div>
                ))}
                <div className="w-10 h-full bg-red-500"></div>
            </div>
        </section>
    );
};
