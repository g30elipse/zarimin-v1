// src/hooks/useSmoothScroll.ts
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with valid options only
    lenisRef.current = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      // Add other valid options as needed
    });

    function update(time: number) {
      lenisRef.current?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Sync ScrollTrigger with Lenis
    lenisRef.current.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenisRef.current?.scrollTo(value, { immediate: true });
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => {
      lenisRef.current?.raf(performance.now());
    });
    ScrollTrigger.refresh();

    // Example GSAP animation (customize as needed)
    gsap.fromTo(
      ".fade-in-on-scroll",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".fade-in-on-scroll",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.destroy();
      // No need to call ScrollTrigger.kill(), just remove listeners if needed
    };
  }, []);

  return lenisRef;
}