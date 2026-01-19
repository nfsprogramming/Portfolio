'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'Creative Development',
  'UI / UX Design',
  'WebGL & Animations',
  'Frontend Engineering',
  '3D Graphics',
  'Interactive Experiences',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !title || !description || !skillsContainer) return;

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

    gsap.from(description, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 80,
      opacity: 0,
    });

    const skillCards = skillsContainer.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        delay: index * 0.1,
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl w-full">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-12 text-center"
        >
          About
        </h2>

        <p
          ref={descriptionRef}
          className="text-lg md:text-2xl text-gray-400 text-center mb-20 max-w-3xl mx-auto leading-relaxed"
        >
          I create immersive digital experiences that blend creativity with technology.
          Specializing in cutting-edge web development, interactive design, and visual
          storytelling.
        </p>

        <div
          ref={skillsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card border border-gray-800 p-8 hover:border-white transition-colors duration-500 group"
            >
              <div className="overflow-hidden">
                <h3 className="text-xl md:text-2xl font-semibold group-hover:translate-x-2 transition-transform duration-500">
                  {skill}
                </h3>
              </div>
              <div className="w-0 h-[1px] bg-white mt-4 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
