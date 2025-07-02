'use client'

import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface HeroProps {

}


gsap.registerPlugin(ScrollTrigger);

const Hero: FC<HeroProps> = (props) => {

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {


    // GSAP: Animate text on scroll (opacity/y)
    if (heroRef.current && textRef.current) {


      // GSAP: Expand text horizontally on scroll
      gsap.fromTo(
        textRef.current,
        { scaleX: 1 },
        {
          scaleX: 2.0,
          // y: 400,
          transformOrigin: "center",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    return () => {
      gsap.killTweensOf(textRef.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div ref={heroRef} className="relative" style={{
      backgroundImage: 'url(/hero.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      height: '80vh',
      width: '100%',
    }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 px-8 flex items-center justify-center">
        <h1 ref={textRef} className="lg:text-8xl text-5xl font-dancing tracking-wide text-white text-center">
          Preserving <span className="text-orange-400">Culture</span>
        </h1>
      </div>
    </div>
  )
}


export default Hero;