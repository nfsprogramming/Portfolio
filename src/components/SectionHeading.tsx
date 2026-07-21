import { motion } from "framer-motion";
import { lineContainer, lineChild, inView } from "../utils/motion";

/**
 * Reusable section heading with an index number, an oversized title
 * (split into lines that rise into place), and an optional description.
 */
export default function SectionHeading({
  index,
  title,
  description,
  align = "left",
}: {
  index: string;
  title: string[];
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.header
      className={`section-head ${
        align === "center" ? "section-head--center" : ""
      }`}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      <motion.span className="section-head__index">{index}</motion.span>

      <motion.h2 className="section-head__title">
        <span className="line-stack">
          {title.map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span
                className="line-inner"
                variants={lineContainer}
                initial="hidden"
                whileInView="show"
                viewport={inView}
              >
                <span className="line-row" style={{ display: "block" }}>
                  <motion.span variants={lineChild} style={{ display: "block" }}>
                    {line}
                  </motion.span>
                </span>
              </motion.span>
            </span>
          ))}
        </span>
      </motion.h2>

      {description && (
        <motion.p
          className="section-head__desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
