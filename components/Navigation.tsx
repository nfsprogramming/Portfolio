'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300"
        >
          Portfolio
        </Link>

        <div className="flex items-center gap-8">
          <a
            href="#about"
            className="text-sm hover:text-gray-400 transition-colors duration-300 hidden md:block"
          >
            About
          </a>
          <a
            href="#work"
            className="text-sm hover:text-gray-400 transition-colors duration-300 hidden md:block"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-sm hover:text-gray-400 transition-colors duration-300 hidden md:block"
          >
            Contact
          </a>
          <a
            href="mailto:hello@example.com"
            className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
