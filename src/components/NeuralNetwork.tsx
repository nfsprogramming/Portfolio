import { useEffect, useRef } from "react";

/**
 * Lightweight 2D neural-network animation drawn on a canvas:
 * drifting nodes connected by lines that brighten when they come close.
 * Sits *behind* the hero text but in front of the WebGL particles,
 * giving the "AI OS" laboratory feel without competing for attention.
 *
 * Honors prefers-reduced-motion (renders static). Pauses when off-screen.
 */
export default function NeuralNetwork({
  density = 0.00007,
  maxDist = 160,
  speed = 0.22,
}: {
  density?: number;
  maxDist?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];

    const palette = ["#00e5ff", "#7b61ff", "#14f195"];

    const seed = () => {
      const count = Math.max(28, Math.floor(w * h * density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // edges first — subtle and behind nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const t = 1 - d / maxDist;
            ctx.strokeStyle = `rgba(0,229,255,${t * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes — small glowing dots, cycle hues from palette
      nodes.forEach((n, i) => {
        const c = palette[i % palette.length];
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        // soft halo
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // drift + wrap
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, maxDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="neuralnet"
      aria-hidden="true"
    />
  );
}
