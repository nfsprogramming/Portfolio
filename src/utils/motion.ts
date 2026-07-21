import type { Variants } from "framer-motion";

/** Smooth custom easing — used across fades, rises, and reveals. */
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

/** Lines of text rising into place — stagger from below. */
export const lineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const lineChild: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: easeOut },
  },
};

/** Generic vertical fade-up used for headings, paragraphs, cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut,
      delay: (i ?? 0) * 0.08,
    },
  }),
};

/** Stagger container for grids. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/** Viewport config — slightly pre-trigger so reveals feel alive. */
export const inView = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" } as const;
