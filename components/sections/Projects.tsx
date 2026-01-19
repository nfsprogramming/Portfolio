'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Immersive Experience',
    category: 'WebGL / Three.js',
    description: 'A fully interactive 3D web experience',
    image: '/projects/project-1.jpg',
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Design / Development',
    description: 'Complete brand redesign with modern aesthetics',
    image: '/projects/project-2.jpg',
  },
  {
    id: 3,
    title: 'Digital Product',
    category: 'UI/UX / Frontend',
    description: 'Innovative product design and development',
    image: '/projects/project-3.jpg',
  },
  {
    id: 4,
    title: 'Interactive Installation',
    category: 'Creative Tech',
    description: 'Multi-screen interactive installation',
    image: '/projects/project-4.jpg',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const projectsContainer = projectsRef.current;

    if (!section || !title || !projectsContainer) return;

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

    const projectCards = projectsContainer.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
        y: 150,
        opacity: 0,
      });

      const img = card.querySelector('.project-image');
      const overlay = card.querySelector('.project-overlay');

      card.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.1,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-20 text-center"
        >
          Selected Work
        </h2>

        <div ref={projectsRef} className="space-y-32">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="project-card block group"
            >
              <div className="relative overflow-hidden aspect-[16/9] bg-gray-900">
                <div
                  className="project-image w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #1a1a1a ${index * 20}%, #2a2a2a ${100 - index * 20}%)`,
                  }}
                />
                <div className="project-overlay absolute inset-0 bg-black/50 opacity-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">View Project</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:translate-x-4 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-500">{project.category}</p>
                </div>
                <p className="text-gray-400 max-w-md">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
