
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useMouseParallax(strength = 24) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return offset;
}

export default function Background() {
  const mouse = useMouseParallax(30);
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 2000], [0, -120]);
  const yFast = useTransform(scrollY, [0, 2000], [0, -260]);

  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: (i * 37.7) % 100,
        top: (i * 53.3) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 12) * 0.7,
        dur: 5 + (i % 7),
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030014]">
      {/* Basis-Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,212,255,0.18),transparent),radial-gradient(ellipse_60%_50%_at_80%_90%,rgba(37,99,235,0.14),transparent),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(14,116,144,0.12),transparent)]" />

      {/* Grid mit Maus-Parallax */}
      <motion.div style={{ y: ySlow, x: mouse.x * 0.4 }} className="grid-bg absolute inset-0 opacity-80" />
      <motion.div style={{ y: yFast }} className="hex-bg absolute inset-0 opacity-70" />

      {/* Neon Orbs */}
      <motion.div
        style={{ x: mouse.x, y: mouse.y }}
        className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[110px]"
      />
      <motion.div
        style={{ x: -mouse.x, y: -mouse.y }}
        className="absolute right-[5%] top-[45%] h-96 w-96 rounded-full bg-blue-700/20 blur-[130px]"
      />
      <motion.div className="absolute bottom-[-10%] left-[35%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Partikel */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Neon-Linie oben */}
      <div className="neon-line absolute left-0 top-0 w-full opacity-60" />
    </div>
  );
}
