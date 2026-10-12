"use client";

import { useEffect, useRef } from "react";

/**
 * A classic motorcycle drawn as a halftone of dots on canvas. The wheels spin, speed streaks
 * drift past, and dots shy away from the pointer. Static (fully drawn, no motion) when the
 * visitor prefers reduced motion.
 */

const W = 640;
const H = 360;
const GAP = 7; // grid spacing in design units
const REAR = { x: 150, y: 262, r: 78 };
const FRONT = { x: 492, y: 262, r: 78 };

type Dot = { x: number; y: number; hot: boolean };

/** Body silhouette, sampled once into a dot grid. */
function drawBody(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const line = (w: number, ...pts: number[]) => {
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
    ctx.stroke();
  };
  // Seat
  ctx.beginPath();
  ctx.moveTo(150, 152);
  ctx.quadraticCurveTo(162, 126, 210, 128);
  ctx.lineTo(312, 132);
  ctx.quadraticCurveTo(324, 142, 312, 156);
  ctx.closePath();
  ctx.fill();
  // Tank
  ctx.beginPath();
  ctx.moveTo(300, 150);
  ctx.quadraticCurveTo(330, 92, 402, 98);
  ctx.quadraticCurveTo(432, 104, 428, 136);
  ctx.closePath();
  ctx.fill();
  // Engine with fins
  ctx.beginPath();
  ctx.roundRect(262, 168, 112, 72, 14);
  ctx.fill();
  // Frame, swingarm, downtube
  line(12, REAR.x, REAR.y, 262, 172);
  line(12, REAR.x, REAR.y, 290, 238);
  line(12, 410, 132, 372, 236);
  line(9, 312, 150, 262, 172);
  // Fork and headstock
  line(12, 430, 104, FRONT.x, FRONT.y);
  // Handlebar
  line(8, 414, 92, 452, 66);
  line(8, 452, 66, 470, 70);
  // Headlight
  ctx.beginPath();
  ctx.arc(462, 124, 20, 0, Math.PI * 2);
  ctx.fill();
  // Exhaust
  line(13, 330, 246, 92, 226);
  line(18, 120, 228, 72, 222);
  // Fenders
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(REAR.x, REAR.y, REAR.r + 16, Math.PI * 1.08, Math.PI * 1.62);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(FRONT.x, FRONT.y, FRONT.r + 14, Math.PI * 1.3, Math.PI * 1.85);
  ctx.stroke();
}

function sampleBody(): Dot[] {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return [];
  drawBody(ctx);
  const data = ctx.getImageData(0, 0, W, H).data;
  const dots: Dot[] = [];
  for (let y = GAP / 2; y < H; y += GAP) {
    // Offset alternate rows for a halftone look.
    const off = Math.round(y / GAP) % 2 ? GAP / 2 : 0;
    for (let x = GAP / 2 + off; x < W; x += GAP) {
      if (data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 100) {
        const hot = Math.hypot(x - 462, y - 124) < 21; // headlight glows in the accent colour
        dots.push({ x, y, hot });
      }
    }
  }
  return dots;
}

/** Wheel dots in wheel-local polar coordinates; spokes rotate each frame. */
function wheelDots(r: number): { a: number; d: number; spoke: boolean }[] {
  const out: { a: number; d: number; spoke: boolean }[] = [];
  for (const d of [r - 10, r - 3, r + 4]) {
    const n = Math.round((2 * Math.PI * d) / GAP);
    for (let i = 0; i < n; i++) out.push({ a: (i / n) * Math.PI * 2, d, spoke: false });
  }
  for (let s = 0; s < 8; s++) {
    for (let d = 10; d < r - 14; d += GAP) out.push({ a: (s / 8) * Math.PI * 2, d, spoke: true });
  }
  for (let d = 0; d < 10; d += GAP / 1.5) {
    const n = Math.max(1, Math.round((2 * Math.PI * d) / GAP));
    for (let i = 0; i < n; i++) out.push({ a: (i / n) * Math.PI * 2, d, spoke: false });
  }
  return out;
}

export function DotBike({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const body = sampleBody();
    const rear = wheelDots(REAR.r);
    const front = wheelDots(FRONT.r);
    const streaks = Array.from({ length: 14 }, (_, i) => ({
      y: 70 + i * 19 + (i % 3) * 5,
      x: Math.random() * W,
      len: 3 + Math.floor(Math.random() * 6),
      speed: 1.6 + Math.random() * 2.4,
    }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -999, y: -999 };
    let ink = "#16241f";
    let accent = "#b4532a";
    let scale = 1;
    let angle = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = cs.getPropertyValue("--ink").trim() || ink;
      accent = cs.getPropertyValue("--accent").trim() || accent;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      scale = Math.min(canvas.width / W, canvas.height / H);
    };

    const dot = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const ox = (canvas.width - W * scale) / 2;
      const oy = (canvas.height - H * scale) / 2;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(scale, 0, 0, scale, ox, oy);
      const still = reduce.matches;
      // Dots gather into the bike over the first 1.2 s.
      const gather = still ? 1 : Math.min(1, t / 1.2);
      const ease = 1 - Math.pow(1 - gather, 3);
      // Gentle idle bob, like a running engine.
      const bob = still ? 0 : Math.sin(t * 22) * 0.6;
      const px = (pointer.x - ox) / scale;
      const py = (pointer.y - oy) / scale;

      ctx.fillStyle = ink;
      if (!still) {
        ctx.globalAlpha = 0.35;
        for (const s of streaks) {
          s.x -= s.speed;
          if (s.x < -s.len * GAP) s.x = W + Math.random() * 80;
          for (let i = 0; i < s.len; i++) dot(s.x + i * GAP, s.y, 1.4);
        }
      }

      ctx.globalAlpha = 1;
      for (const d of body) {
        let x = d.x;
        let y = d.y + bob;
        const dx = x - px;
        const dy = y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < 60 && !still) {
          const push = (60 - dist) / 60;
          x += (dx / (dist || 1)) * push * 14;
          y += (dy / (dist || 1)) * push * 14;
        }
        if (ease < 1) {
          // Start scattered along a deterministic spiral so the gather looks intentional.
          const seed = d.x * 12.9898 + d.y * 78.233;
          const sx = W / 2 + Math.cos(seed) * 420;
          const sy = H / 2 + Math.sin(seed) * 260;
          x = sx + (x - sx) * ease;
          y = sy + (y - sy) * ease;
        }
        ctx.fillStyle = d.hot ? accent : ink;
        dot(x, y, d.hot ? 2.6 : 2.1);
      }

      ctx.fillStyle = ink;
      for (const [w, dots] of [
        [REAR, rear],
        [FRONT, front],
      ] as const) {
        for (const d of dots) {
          const a = d.a + (d.spoke ? angle : 0);
          const x = w.x + Math.cos(a) * d.d;
          const y = w.y + Math.sin(a) * d.d;
          dot(w.x + (x - w.x) * ease, w.y + (y - w.y) * ease, d.spoke ? 1.6 : 2.1);
        }
      }

      if (!still) angle += 0.06;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    readColors();
    resize();
    restart();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      pointer.x = (e.clientX - rect.left) * dpr;
      pointer.y = (e.clientY - rect.top) * dpr;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -999;
    };
    const ro = new ResizeObserver(() => {
      resize();
      restart();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    io.observe(canvas);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      restart();
    };
    scheme.addEventListener("change", onScheme);
    reduce.addEventListener("change", restart);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scheme.removeEventListener("change", onScheme);
      reduce.removeEventListener("change", restart);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
