'use client'
import { Chart } from '@/types';
import { ChartList } from '../charts/ChartList';
import SectionWrapper from '../layout/SectionWrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);


interface TrendingChartsProps {
    charts: Chart[];
}

export const TrendingCharts = ({ charts }: TrendingChartsProps) => {

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const charts = sectionRef.current.querySelectorAll('.chart-list');

        gsap.fromTo(charts, {
            opacity: 0,
            x: 300,
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
            x: 0,
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
    }, [charts]);

    return (
        <div ref={sectionRef} className="bg-card-foreground text-white md:py-32 py-16">
            <SectionWrapper>
                <h2 className="text-2xl font-semibold mb-6 md:mb-14 text-center">Trending Charts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {charts.map((chart) => (
                        <div className="chart-list chart-list-item" key={chart.id}>
                            <ChartList chart={chart} />
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};
