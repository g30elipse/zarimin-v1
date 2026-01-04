"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Timeline from '@/components/Timeline';
import HighlightedWorks from '@/components/HighlightedWorks';
import Header from '@/components/Header';
import Masthead from '@/components/Masthead';

gsap.registerPlugin(ScrollTrigger);

export default function ZariminMagazine() {
    const containerRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".hero-img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: { trigger: ".hero-section", scrub: true }
            });

            // Gallery Reveal
            gsap.utils.toArray('.gallery-item').forEach((item: any) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 100,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }, containerRef);

        return () => { lenis.destroy(); ctx.revert(); };
    }, []);

    return (
        <main ref={containerRef} className="bg-[#ecebe9] text-[#1a1a1a]">
            <span className='absolute p-10 left-0 uppercase text-[11px] tracking-widest font-bold'>Est. 2024</span>
            {/* Sidebar Masthead - Magazine Style */}
            <Masthead text='Issue No. 001 — Production House' />

            {/* Hero Section */}
            <section className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-24">

                <Header />

                <div className="z-10 text-center">
                    <h1 className="text-[18vw] font-black leading-[0.75] tracking-tighter uppercase mb-6">
                        ZARIMIN
                    </h1>
                    <div className="flex justify-between items-start w-full uppercase text-[10px] font-medium tracking-widest border-t border-black pt-4">
                        <span>Bodo Music Global</span>
                        <span className="max-w-[200px] text-right">Documenting, Preserving, Promoting Culture</span>
                    </div>
                </div>

                <div className="hero-img absolute inset-0 -z-10 opacity-30">
                    <div className="w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1514525253361-bee8a4874a73?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
                </div>
            </section>

            {/* Editorial Content Section */}
            <section className="py-32 px-6 md:ml-16 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 gallery-item">
                    <p className="text-sm border-b border-black pb-2 mb-6 font-bold uppercase tracking-tighter">The Vision</p>
                    <p className="text-2xl leading-tight font-serif italic">
                        "We strive to create a space where the vibrant Bodo music culture can thrive while embracing global diversity."
                    </p>
                </div>

                <div className="md:col-span-7 md:col-start-6 gallery-item">
                    <div className="aspect-[3/4] bg-neutral-300 overflow-hidden mb-8">
                        <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" alt="Cultural performance" />
                    </div>
                    <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
                        Through our platform, we aim to document the unique sounds and stories of Bodo artists. Connecting them with music lovers worldwide is not just a goal; it's a movement to preserve the rhythm of the soil.
                    </p>
                </div>
            </section>

            {/* The Gallery - Magazine Layout */}
            <HighlightedWorks />

            <Timeline />
        </main>
    );
}