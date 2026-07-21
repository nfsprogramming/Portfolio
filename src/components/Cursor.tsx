import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMouse } from "../hooks/useMouse";

/**
 * Custom magnetic cursor — a small dot followed by a lagging ring.
 * The ring fontsize-labels on interactive elements via data-cursor-label
 * and visually grows when hovering anything tagged [data-cursor="hover"].
 *
 * Disabled on coarse pointers / reduced motion (handled by useMouse).
 */
export default function Cursor() {
  const { supportsHover } = useMouse();
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(0, { damping: 25, stiffness: 220, mass: 0.5 });
  const ringY = useSpring(0, { damping: 25, stiffness: 220, mass: 0.5 });

  const [variant, setVariant] = useState<"default" | "hover">("default");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (!supportsHover) return;

    const move = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        '[data-cursor="hover"], a, button, [role="button"]'
      ) as HTMLElement | null;
      if (interactive) {
        setVariant("hover");
        setLabel(
          interactive.getAttribute("data-cursor-label") || ""
        );
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [supportsHover, dotX, dotY, ringX, ringY]);

  if (!supportsHover) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <motion.div
        className="cursor__dot"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: variant === "hover" ? 0 : 1 }}
      />
      <motion.div
        className="cursor__ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: variant === "hover" ? 64 : 28,
          height: variant === "hover" ? 64 : 28,
          backgroundColor:
            variant === "hover" ? "rgba(124,92,255,0.08)" : "rgba(0,0,0,0)",
          borderColor:
            variant === "hover"
              ? "rgba(0,229,255,0.9)"
              : "rgba(255,255,255,0.45)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
      >
        {label && (
          <span className="cursor__label font-display">{label}</span>
        )}
      </motion.div>
    </div>
  );
}
