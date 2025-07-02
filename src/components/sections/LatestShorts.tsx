'use client'

import { Short } from '../../types/shorts';
import { ShortCard } from '../shorts/ShortCard';
import SectionWrapper from '../layout/SectionWrapper';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

interface LatestShortsProps {
    shorts: Short[];
}

gsap.registerPlugin(ScrollTrigger);

export function LatestShorts({ shorts }: LatestShortsProps) {

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.short-card');

        console.log(cards);

        gsap.fromTo(cards, {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                scrub: true,
            },
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


        // Optional: Clean up
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [shorts]);

    return (
        <SectionWrapper >
            <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 md:px-24">
                {shorts.slice(0, 1).map((short) => {
                    return <ShortCard className="short-card col-span-1" key={short.id} content={short} />;
                })}
                <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-cols-2 md:grid-cols-2 gap-6">
                    {shorts.slice(1, 5).map((short) => {
                        return <ShortCard className="short-card" variant="compact" key={short.id} content={short} />;
                    })}
                </div>
            </div>

            <div className="flex justify-center">
                <Link
                    href="/shorts"
                    className="text-sm px-4 py-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                    Check Out More
                </Link>
            </div>
        </SectionWrapper>
    );
}
