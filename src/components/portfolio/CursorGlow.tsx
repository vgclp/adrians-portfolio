
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [ring, setRing] = useState({ x: -400, y: -400 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf);
      const animate = () => {
        setRing((prev) => ({
          x: prev.x + (target.x - prev.x) * 0.16,
          y: prev.y + (target.y - prev.y) * 0.16,
        }));
        if (Math.abs(target.x - prevRef.x) > 0.5) raf = requestAnimationFrame(animate);
      };
      const prevRef = { x: ring.x, y: ring.y };
      void prevRef;
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[5] hidden md:block" aria-hidden>
      <div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          left: pos.x,
          top: pos.y,
          background: "radial-gradient(circle, rgba(0,212,255,0.55) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 shadow-[0_0_18px_rgba(0,212,255,0.5)]"
        style={{ left: ring.x, top: ring.y }}
      />
    </div>
  );
}
