'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const email = emailRef.current;
    const socials = socialsRef.current;

    if (!section || !title || !email || !socials) return;

    gsap.from(title, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 100,
      opacity: 0,
    });

    gsap.from(email, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 80,
      opacity: 0,
    });

    gsap.from(socials, {
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 60,
      opacity: 0,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8 relative"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
        >
          Let&apos;s Create
          <br />
          Something Amazing
        </h2>

        <a
          ref={emailRef}
          href="mailto:hello@example.com"
          className="inline-block text-3xl md:text-5xl lg:text-6xl font-bold mb-16 hover:text-gray-400 transition-colors duration-500 relative group"
        >
          hello@example.com
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700" />
        </a>

        <div
          ref={socialsRef}
          className="flex justify-center gap-12 text-lg text-gray-500"
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
