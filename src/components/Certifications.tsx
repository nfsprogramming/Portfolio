import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/content";
import { inView, staggerContainer, fadeUp } from "../utils/motion";

/**
 * Certifications — a row of glass certificate tiles, each with an
 * issuer, year, and brand-coloured halo.
 */
export default function Certifications() {
  return (
    <section id="certifications" className="certs section">
      <div className="container">
        <SectionHeading
          index="(07) — Certifications"
          title={["Certified", "in the craft."]}
          description="Continuous learning, formally recognized. Replace the placeholder list with your real credentials."
        />

        <motion.div
          className="certs__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {certifications.map((c) => (
            <motion.article
              key={c.title}
              className="cert-tile"
              variants={fadeUp}
              style={{ ["--cert-accent" as string]: c.accent }}
              data-cursor="hover"
            >
              <div className="cert-tile__halo" />
              <div className="cert-tile__head">
                <span className="cert-tile__icon font-mono">{">"}</span>
                <span className="cert-tile__year font-mono">{c.year}</span>
              </div>
              <h3 className="cert-tile__title font-display">{c.title}</h3>
              <p className="cert-tile__issuer">{c.issuer}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
