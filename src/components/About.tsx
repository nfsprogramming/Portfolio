import { motion } from "framer-motion";
import { MapPin, GraduationCap, Sparkles, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { fadeUp, inView } from "../utils/motion";
import { profile } from "../data/profile";

/**
 * About — split layout: photo / quick facts / vision / mission.
 * Photo is a placeholder monogram (no real headshot on file);
 * drop a real photo into public/ and point <img src> at it.
 */
export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading
          index="(02) — About"
          title={["About", "me."]}
          description="An AI & Data Science student building practical, production-grade intelligent systems."
        />

        <div className="about__grid">
          {/* Photo / monogram */}
          <motion.div
            className="about__photo"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about__photo-frame">
              {/* Replace with a real headshot:
                  <img src="/avatar.jpg" alt={profile.name} />
                  Until then, an animated monogram tile */}
              <div className="about__monogram font-display">
                {profile.initials}
              </div>
              <div className="about__photo-glow" />
              <div className="about__photo-grid" />
            </div>
            <ul className="about__facts">
              <li>
                <MapPin size={14} aria-hidden />
                <span>{profile.location}</span>
              </li>
              <li>
                <GraduationCap size={14} aria-hidden />
                <span>
                  {profile.education.degree}
                  <br />
                  <em>{profile.education.school}</em>
                </span>
              </li>
              <li>
                <Sparkles size={14} aria-hidden />
                <span>{profile.status}</span>
              </li>
            </ul>
          </motion.div>

          {/* Bio + vision/mission */}
          <motion.div
            className="about__text"
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <motion.p variants={fadeUp} className="about__intro">
              {profile.about}
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="about__intro">
              {profile.about2}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="about__vm"
            >
              <div className="about__vm-card">
                <span className="eyebrow about__vm-label">
                  <Target size={12} aria-hidden /> Mission
                </span>
                <p className="about__vm-text font-display">
                  {profile.mission}
                </p>
              </div>
              <div className="about__vm-card">
                <span className="eyebrow about__vm-label">
                  <Sparkles size={12} aria-hidden /> Vision
                </span>
                <p className="about__vm-text font-display">
                  {profile.vision}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
