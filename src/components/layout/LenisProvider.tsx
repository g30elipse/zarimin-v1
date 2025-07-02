'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis';
import gsap from 'gsap'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return <ReactLenis root>{children}</ReactLenis>
}