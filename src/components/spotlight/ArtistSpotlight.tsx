'use client'
import { Spotlight } from '@/types';
import { FC, useEffect } from 'react';
import SpotlightCard from './SpotlightCard';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export interface ArtistSpotlightProps {
    spotlights: Spotlight[];
}

const ArtistSpotlight: FC<ArtistSpotlightProps> = (props) => {
    const { spotlights } = props;

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.spotlight-card');

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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 md:px-24">
            {spotlights.map((spotlight) => (
                <SpotlightCard key={spotlight.id} spotlight={spotlight} />
            ))}
        </div>
    );
};

export default ArtistSpotlight;
