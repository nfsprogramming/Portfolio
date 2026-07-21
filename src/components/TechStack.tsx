import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import SectionHeading from "./SectionHeading";
import { techStack } from "../data/content";
import { inView } from "../utils/motion";

/**
 * Tech Stack Showcase — a small galaxy of glass-icon tiles.
 *
 * Each tile:
 *   - drifts with the cursor (parallax) with a per-tile depth factor
 *   - lifts/scales on hover with a colored halo
 * The whole row also rises into view with a stagger.
 */
export default function TechStack() {
  return (
    <section id="stack" className="tech section">
      <div className="container">
        <SectionHeading
          index="(04) — Stack"
          title={["Technologies", "I build with."]}
          description="The tools behind the work — move your cursor across them; they'll drift apart and breathe."
        />

        <TechGrid />
      </div>
    </section>
  );
}

function TechGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  // cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 18 });

  // gentle scroll-driven rotation of the whole grid for life
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);
  const rise = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const onMove = (e: React.PointerEvent) => {
    const r = gridRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx);
    my.set(ny);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={gridRef}
      className="tech__grid"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotate, y: rise }}
    >
      {techStack.map((t, i) => {
        // depth factor: tiles near centre move less, edges move more
        const depth = 1 + 0.45 * Math.sin(i * 1.7);
        const tx = useTransform(smoothX, (v) => v * 60 * depth);
        const ty = useTransform(smoothY, (v) => v * 60 * depth);
        return (
          <motion.div
            key={t.name}
            className="tech__tile"
            initial={{ opacity: 0, scale: 0.85, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={inView}
            transition={{
              duration: 0.7,
              delay: (i % 7) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.08,
              y: -6,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }}
            data-cursor="hover"
            data-cursor-label={t.name}
          >
            <motion.div className="tech__tile-inner" style={{ x: tx, y: ty }}>
              <span className="tech__glyph font-display">{t.glyph}</span>
              <span className="tech__name font-mono">{t.name}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
