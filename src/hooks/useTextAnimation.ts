import { useEffect, useRef, useState } from "react";

/**
 * Typing effect — cycles through `phrases`, typing each and deleting it
 * before moving to the next. Honors prefers-reduced-motion (shows the first
 * phrase statically with no animation).
 */
export function useTypewriter(
  phrases: string[],
  opts: { typeSpeed?: number; deleteSpeed?: number; pause?: number } = {}
) {
  const { typeSpeed = 70, deleteSpeed = 35, pause = 1400 } = opts;
  const [display, setDisplay] = useState("");
  const idx = useRef(0);
  const char = useRef(0);
  const deleting = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reduced.current = true;
      setDisplay(phrases[0]);
      return;
    }

    let timeout: number;

    const tick = () => {
      const phrase = phrases[idx.current];
      if (!deleting.current) {
        char.current += 1;
        setDisplay(phrase.slice(0, char.current));
        if (char.current === phrase.length) {
          deleting.current = true;
          timeout = window.setTimeout(tick, pause);
          return;
        }
        timeout = window.setTimeout(tick, typeSpeed);
      } else {
        char.current -= 1;
        setDisplay(phrase.slice(0, char.current));
        if (char.current === 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % phrases.length;
          timeout = window.setTimeout(tick, 220);
          return;
        }
        timeout = window.setTimeout(tick, deleteSpeed);
      }
    };

    timeout = window.setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [phrases, typeSpeed, deleteSpeed, pause]);

  return display;
}

/**
 * Count-up animation — animates an integer from 0 → value when `active`
 * becomes true. Honors prefers-reduced-motion (snaps straight to value).
 */
export function useCountUp(target: number, active: boolean, dur = 1600) {
  const [value, setValue] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reduced.current = true;
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    if (reduced.current) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);

  return value;
}
