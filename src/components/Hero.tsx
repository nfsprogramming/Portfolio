import { forwardRef, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Scene from "../three/Scene";
import NeuralNetwork from "./NeuralNetwork";
import { scrollToSection } from "../hooks/useLenis";
import { useTypewriter, useCountUp } from "../hooks/useTextAnimation";
import { lineChild, lineContainer, fadeUp } from "../utils/motion";
import { profile } from "../data/profile";
import { stats } from "../data/content";
import { Github, Linkedin, FileText, ArrowDown } from "lucide-react";

/**
 * Hero — full-screen "AI OS boot" screen.
 *
 * Layers (back → front):
 *   - WebGL Scene (iridescent core + particles + bloom)
 *   - CSS aurora gradient tint + animated radial blooms
 *   - 2D NeuralNetwork canvas (nodes + edges)
 *   - DOM overlay: oversized name, typing subtitle, CTAs, stats row
 *
 * Shares a scrollRef (0..1 of the hero viewport) with the Scene so the
 * 3D core descends/squashes as the user scrolls into the About section.
 */
function HeroInner() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const ctasY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollYProgress]);

  // Split name into two display lines: "MOHAMED" / "NIFRAS S S"
  const nameLines = useMemo(() => ["MOHAMED", "NIFRAS S S"], []);
  const typed = useTypewriter(profile.titles, {
    typeSpeed: 75,
    deleteSpeed: 32,
    pause: 1500,
  });

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <Scene scrollRef={scrollRef} />
      <div className="aurora" aria-hidden="true" />
      <div className="aurora__grid" aria-hidden="true" />
      <NeuralNetwork />

      <motion.div className="hero__overlay" style={{ opacity: overlayOpacity }}>
        <motion.div className="hero__eyebrow" style={{ y: eyebrowY }}>
          <span className="dot" />
          <span className="font-mono">
            <span className="prompt">{'>'}</span> ai_os.boot()
          </span>
        </motion.div>

        <motion.h1
          className="hero__title huge"
          style={{ y: titleY }}
          variants={lineContainer}
          initial="hidden"
          animate="show"
        >
          {nameLines.map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span variants={lineChild} className="line-inner">
                {i === 1 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero__sub"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <span className="hero__sub-pipe" aria-hidden="true" />
          <span className="hero__sub-text font-mono">{typed}</span>
        </motion.div>

        <motion.p
          className="hero__desc"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
        >
          {profile.shortBio}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          style={{ y: ctasY }}
        >
          <button
            className="btn btn--solid"
            onClick={() => scrollToSection("projects")}
            data-cursor="hover"
            data-cursor-label="Explore"
          >
            Explore Projects <ArrowDown size={16} aria-hidden />
          </button>
          <a
            className="btn"
            href={profile.contact.resume}
            data-cursor="hover"
            data-cursor-label="PDF"
          >
            <FileText size={16} aria-hidden /> Resume
          </a>
          <a
            className="btn"
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            data-cursor-label="GitHub"
          >
            <Github size={16} aria-hidden /> GitHub
          </a>
          <a
            className="btn"
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            data-cursor-label="LinkedIn"
          >
            <Linkedin size={16} aria-hidden /> LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <HeroStats scrollRef={sectionRef} />

      <motion.div
        className="hero__cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: overlayOpacity }}
      >
        <span className="font-mono">scroll to explore</span>
        <motion.span
          className="hero__cue-line"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <HeroCorners />
    </section>
  );
}

function HeroStats({ scrollRef }: { scrollRef: React.RefObject<HTMLElement> }) {
  const inView = useInView(scrollRef, { amount: 0.3 });
  return (
    <motion.div
      className="hero__stats"
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {stats.map((s) => (
        <StatTile key={s.label} {...s} active={inView} />
      ))}
    </motion.div>
  );
}

function StatTile({
  value,
  suffix,
  label,
  color,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  active: boolean;
}) {
  const count = useCountUp(value, active, 1400);
  return (
    <motion.div
      className="stat-tile"
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      style={{ ["--stat-color" as string]: color }}
    >
      <span className="stat-tile__num font-display">
        {count}
        <span className="stat-tile__suffix">{suffix}</span>
      </span>
      <span className="stat-tile__label">{label}</span>
    </motion.div>
  );
}

function HeroCorners() {
  return (
    <>
      <div className="hero__corner hero__corner--tl font-mono">
        <span>SYSTEM&nbsp;ONLINE</span>
        <span className="grad">v2026.1</span>
      </div>
      <div className="hero__corner hero__corner--tr font-mono">
        <span>{profile.location}</span>
        <span className="grad">{profile.status}</span>
      </div>
      <div className="hero__corner hero__corner--bl font-mono">
        <span>(01)</span>
        <span>INDEX</span>
      </div>
    </>
  );
}

const Hero = forwardRef<HTMLElement>(function Hero(_props, _ref) {
  return <HeroInner />;
});

export default Hero;
