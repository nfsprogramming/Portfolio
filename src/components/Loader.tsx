import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader overlay — counts to 100, then drapes up to reveal the site.
 * Uses an internal counter rather than real asset progress so it always
 * completes the reveal animation cleanly.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      // ease toward 100, never overshoot
      const step = v < 75 ? 4 : v < 92 ? 2 : 1;
      v = Math.min(100, v + step);
      setCount(v);
      if (v >= 100) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (count < 100) return;
    const t = setTimeout(() => setHidden(true), 380);
    const t2 = setTimeout(onDone, 1400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [count, onDone]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="loader__top"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          >
            <div className="loader__brand">
              <span className="font-display">MOHAMED</span>
              <span className="font-display gradient-text">NIFRAS</span>
            </div>
            <div className="loader__status">
              <span>Initializing AI Lab</span>
            </div>
          </motion.div>

          <div className="loader__bottom">
            <div className="loader__counter font-display">
              <span>{count.toString().padStart(3, "0")}</span>
              <span className="loader__pct">%</span>
            </div>
            <div className="loader__bar">
              <motion.div
                className="loader__bar-fill"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="loader__meta">
              <span>AI Engineer</span>
              <span>·</span>
              <span>Full Stack Developer</span>
              <span>·</span>
              <span>ML Researcher</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
