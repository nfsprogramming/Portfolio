'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const projectsData: Record<string, {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
}> = {
  '1': {
    title: 'Immersive Experience',
    category: 'WebGL / Three.js',
    description: 'A fully interactive 3D web experience that pushes the boundaries of web technology.',
    problem: 'Traditional websites lack engagement and fail to create memorable experiences.',
    solution: 'Developed a fully immersive WebGL experience with interactive 3D elements and smooth animations.',
    result: 'Increased user engagement by 300% and won multiple design awards.',
    tools: ['Three.js', 'GSAP', 'React', 'WebGL', 'Blender'],
  },
  '2': {
    title: 'Brand Identity',
    category: 'Design / Development',
    description: 'Complete brand redesign with modern aesthetics and seamless user experience.',
    problem: 'Outdated brand identity that didn\'t resonate with modern audiences.',
    solution: 'Created a comprehensive design system and rebuilt the entire digital presence.',
    result: 'Brand recognition increased by 250% within 6 months.',
    tools: ['Figma', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  '3': {
    title: 'Digital Product',
    category: 'UI/UX / Frontend',
    description: 'Innovative product design and development focused on user experience.',
    problem: 'Complex product with poor usability and high bounce rates.',
    solution: 'Redesigned the entire user flow and implemented intuitive interactions.',
    result: 'Reduced bounce rate by 60% and increased conversions by 180%.',
    tools: ['React', 'TypeScript', 'GSAP', 'Node.js'],
  },
  '4': {
    title: 'Interactive Installation',
    category: 'Creative Tech',
    description: 'Multi-screen interactive installation for a major art exhibition.',
    problem: 'Creating an engaging physical-digital experience for large audiences.',
    solution: 'Built a synchronized multi-screen experience with real-time interactions.',
    result: 'Featured in multiple exhibitions and press coverage.',
    tools: ['Three.js', 'WebSockets', 'TouchDesigner', 'Node.js'],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsData[projectId] || projectsData['1'];

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(heroRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
    }).from(
      contentRef.current?.children || [],
      {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      },
      '-=0.8'
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 text-sm hover:text-gray-400 transition-colors duration-300"
      >
        ← Back
      </Link>

      <div
        ref={heroRef}
        className="h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl">
          <p className="text-gray-500 mb-4">{project.category}</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            {project.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div
          className="w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 mb-20"
        />

        <div ref={contentRef} className="space-y-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Problem</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Solution</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div
            className="w-full aspect-video bg-gradient-to-tr from-gray-900 to-gray-800"
          />

          <div>
            <h2 className="text-3xl font-bold mb-6">Result</h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {project.result}
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Tools & Technologies</h2>
            <div className="flex flex-wrap gap-4">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="border border-gray-800 px-6 py-3 text-lg hover:border-white transition-colors duration-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <Link
            href="/"
            className="inline-block border border-white px-8 py-4 text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            View More Projects
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
