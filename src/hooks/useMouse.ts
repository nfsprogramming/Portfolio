import { useEffect, useRef, useState } from "react";

/**
 * Tracks normalized pointer position in [-1, 1] on both axes.
 * Used by the 3D scene to rotate the floating object toward the cursor,
 * and by 2D elements for parallax. Writes to a ref (no re-render per frame).
 */
export function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    // Skip on coarse pointers (touch) — keeps mobile battery happy.
    if (window.matchMedia("(pointer: coarse)").matches) {
      setSupportsHover(false);
      return;
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
        raf = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { mouse, supportsHover };
}
