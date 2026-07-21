import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import { lineContainer, lineChild, inView, fadeUp } from "../utils/motion";
import { profile } from "../data/profile";

/**
 * Contact — oversized CTA + quick social/CTA buttons + footer.
 * Uses real details from the central profile; replace values in
 * src/data/profile.ts to rebrand.
 */
export default function Contact() {
  const ctaLines = ["Let's build", "intelligent", "things."];

  const socials = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${profile.contact.email}`,
      value: profile.contact.email,
    },
    {
      icon: Github,
      label: "GitHub",
      href: profile.contact.github,
      value: `@${profile.name.split(" ")[0].toLowerCase()}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile.contact.linkedin,
      value: `in/${profile.name.split(" ")[0].toLowerCase()}`,
    },
    {
      icon: FileText,
      label: "Resume",
      href: profile.contact.resume,
      value: "Download PDF",
    },
  ];

  return (
    <footer id="contact" className="contact section">
      <div className="container">
        <motion.span
          className="eyebrow contact__eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
        >
          (10) — Contact
        </motion.span>

        <motion.a
          href={`mailto:${profile.contact.email}`}
          className="contact__cta"
          data-cursor="hover"
          data-cursor-label="Email"
          variants={lineContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {ctaLines.map((line, i) => (
            <span key={i} className="line-mask contact__line">
              <motion.span variants={lineChild} className="line-inner">
                {i === 1 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.a>

        <motion.div
          className="contact__row"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.label !== "Email" && s.label !== "Resume" ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="contact__social"
              data-cursor="hover"
              data-cursor-label={s.label}
              variants={fadeUp}
            >
              <span className="contact__social-icon">
                <s.icon size={16} aria-hidden />
              </span>
              <span className="contact__social-text">
                <span className="contact__social-label">{s.label}</span>
                <span className="contact__social-value font-mono">{s.value}</span>
              </span>
              <span className="contact__social-arrow" aria-hidden="true">
                <ArrowUpRight size={14} />
              </span>
            </motion.a>
          ))}
        </motion.div>

        <div className="contact__footer">
          <div className="contact__footer-col">
            <span className="eyebrow">Motto</span>
            <p className="contact__motto font-display">
              "{profile.tagline}"
            </p>
          </div>

          <div className="contact__footer-col">
            <span className="eyebrow">Built with</span>
            <p>
              React, React Three Fiber, Framer Motion, GSAP, Lenis, and an
              armlong of caffeine. Designed as an AI lab — not a résumé.
            </p>
          </div>

          <div className="contact__footer-col">
            <span className="eyebrow">© 2026</span>
            <p>
              {profile.name}
              <br />
              {profile.location}
              <br />
              <span className="contact__avail">
                <span className="contact__avail-dot" />
                {profile.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
