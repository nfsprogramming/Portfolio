import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, X, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { inView, staggerContainer, fadeUp } from "../utils/motion";
import { projects, type Project } from "../data/content";

/**
 * Featured Projects — a 3D tilt-on-hover grid of the 7 real projects.
 * Clicking a card opens a modal with the full case study (features + stack).
 */
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionHeading
          index="(05) — Projects"
          title={["Featured", "projects."]}
          description="From an AI legal assistant for the Indian legal system to a 4-zone RGB controller for Predator laptops — seven builds, all shipped or in active development."
        />

        <motion.div
          className="projects__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 18,
  });
  const imgX = useTransform(mx, [-0.5, 0.5], ["-3.5%", "3.5%"]);
  const imgY = useTransform(my, [-0.5, 0.5], ["-3.5%", "3.5%"]);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className="project-card"
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        ["--accent" as string]: project.accent,
      }}
      variants={fadeUp}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onOpen}
      data-cursor="hover"
      data-cursor-label="Open"
    >
      <div className="project-card__media">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ x: imgX, y: imgY }}
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={inView}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="project-card__overlay" />
        <span className="project-card__status font-mono">
          <span className="project-card__status-dot" />
          {project.status}
        </span>
        <span className="project-card__index font-mono">
          {project.index}
        </span>
        <span className="project-card__cat font-mono">
          {project.category}
        </span>
        <span
          className="project-card__open"
          aria-hidden="true"
          style={{ transform: "translateZ(50px)" }}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="project-card__body" style={{ transform: "translateZ(40px)" }}>
        <div className="project-card__top">
          <h3 className="project-card__title font-display">
            {project.title}
          </h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>
        <p className="project-card__brief">{project.description}</p>

        <ul className="project-card__stack">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="tag">{s}</li>
          ))}
          {project.stack.length > 4 && (
            <li className="tag">+{project.stack.length - 4}</li>
          )}
        </ul>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="modal"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="modal__panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ ["--accent" as string]: project.accent }}
        data-lenis-prevent
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
          data-cursor="hover"
          data-cursor-label="Close"
        >
          <X size={18} />
        </button>

        <div className="modal__media">
          <img src={project.image} alt={project.title} />
          <div className="modal__media-overlay" />
          <span className="modal__cat font-mono">{project.category}</span>
        </div>

        <div className="modal__content">
          <span className="modal__index font-mono">{project.index} · {project.status}</span>
          <h3 className="modal__title font-display">{project.title}</h3>
          <p className="modal__tagline">{project.tagline}</p>
          <p className="modal__desc">{project.description}</p>

          <div className="modal__section">
            <span className="eyebrow">Features</span>
            <ul className="modal__features">
              {project.features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={14} aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal__section">
            <span className="eyebrow">Stack</span>
            <ul className="modal__stack">
              {project.stack.map((s) => (
                <li key={s} className="tag">{s}</li>
              ))}
            </ul>
          </div>

          <div className="modal__footer">
            <a
              className="btn btn--solid"
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              data-cursor-label="Code"
            >
              <ArrowUpRight size={16} aria-hidden /> View on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
