import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { currentGoals } from "../data/content";
import { inView, staggerContainer, fadeUp } from "../utils/motion";

/**
 * Current Learning — what Nifras is actively working on right now.
 * A compact, generous row of fun pill goals that read like a status report
 * from an AI lab machine.
 */
export default function CurrentGoals() {
  return (
    <section id="learning" className="goals section">
      <div className="container">
        <SectionHeading
          index="(09) — Currently"
          title={["Building", "right now."]}
          description="The questions I'm chasing this season — across LLMs, agentic systems, distributed infra, and open source."
        />

        <motion.ul
          className="goals__list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {currentGoals.map((g, i) => (
            <motion.li
              key={g}
              className="goal"
              variants={fadeUp}
              custom={i}
              data-cursor="hover"
            >
              <span className="goal__marker" aria-hidden="true" />
              <span className="goal__index font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="goal__text font-display">
                <BrainCircuit size={18} aria-hidden /> {g}
              </span>
              <span className="goal__status font-mono">in&nbsp;progress</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
