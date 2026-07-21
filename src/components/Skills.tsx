import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { inView, fadeUp } from "../utils/motion";
import { skillCategories } from "../data/content";

/**
 * Skills — chips grouped into AI / Full Stack / Cloud / Languages.
 * Cards are glass panels; chips brighten + nudge on hover.
 */
export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionHeading
          index="(03) — Skills"
          title={["Toolbox", "across", "the stack."]}
          description="The tools I actually reach for — grouped by area. Hover any chip to highlight the practice it belongs to."
        />

        <motion.div
          className="skills__grid"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {skillCategories.map((c) => (
            <motion.div
              key={c.name}
              className="skill-cat"
              variants={fadeUp}
              style={{ ["--cat-accent" as string]: c.accent }}
            >
              <div className="skill-cat__head">
                <span className="skill-cat__dot" />
                <h3 className="skill-cat__name font-display">{c.name}</h3>
                <span className="skill-cat__count font-mono">
                  {c.skills.length}
                </span>
              </div>
              <ul className="skill-cat__chips">
                {c.skills.map((s) => (
                  <li key={s} className="skill-chip">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
