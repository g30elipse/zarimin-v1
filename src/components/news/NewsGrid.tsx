'use client'

import { News } from '@/types';
import { NewsCard } from './NewsCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);


interface NewsGridProps {
    news: News[];
}

export const NewsGrid = ({ news }: NewsGridProps) => {

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.news-card');

        gsap.fromTo(cards, {
            opacity: 0,
            y: 70,
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [news]);

    return (
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {news.map((article) => (
                <div className="news-card" key={article.id}>
                    <NewsCard news={article} />
                </div>
            ))}
        </div>
    );
};
