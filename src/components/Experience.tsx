import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/content";
import { inView } from "../utils/motion";

/**
 * Experience — a vertical milestone timeline. Each row has a year marker,
 * a type tag, a title, and a description. A gradient progress line on the
 * left fills as the user scrolls through the section.
 */
export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section id="experience" className="experience section" ref={lineRef}>
      <div className="container">
        <SectionHeading
          index="(06) — Experience"
          title={["A timeline", "in motion."]}
          description="AI projects, research, hackathons, open source, and internships — the trail of builds that brought me here."
        />

        <div className="experience__wrap">
          <div className="experience__line" aria-hidden="true">
            <motion.span className="experience__line-fill" style={{ scaleY: scale }} />
          </div>

          <ul className="experience__list">
            {experience.map((e, i) => (
              <motion.li
                key={e.title}
                className="exp-row"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05 * i,
                }}
              >
                <span className="exp-row__node" />
                <div className="exp-row__year font-display">{e.year}</div>
                <div className="exp-row__body">
                  <span className="exp-row__tag font-mono">{e.type}</span>
                  <h3 className="exp-row__title font-display">{e.title}</h3>
                  <p className="exp-row__desc">{e.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
