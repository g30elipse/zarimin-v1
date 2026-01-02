"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return; // Don't run cursor logic on touch screens
    }

    const cursor = cursorRef.current;

    // QuickTo is more performant than regular to() for mouse movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => {
      if (!cursor) return;
      gsap.to(cursor, { scale: 4, duration: 0.3 });
      cursor.classList.add('mix-blend-difference');
      cursor.innerHTML = '<span class="text-[2px] uppercase font-bold tracking-tighter text-white">View</span>';
    };

    const handleMouseLeave = () => {
      if (!cursor) return;
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      cursor.classList.remove('mix-blend-difference');
      cursor.innerHTML = '';
    };

    window.addEventListener("mousemove", moveCursor);

    // Target all gallery items for the hover effect
    const items = document.querySelectorAll(".gallery-item");
    items.forEach(item => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      items.forEach(item => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white border border-black rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    />
  );
}