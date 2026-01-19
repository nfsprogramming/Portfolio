'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.5,
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[10000] pointer-events-none"
      style={{ transformOrigin: 'top' }}
    />
  );
}
