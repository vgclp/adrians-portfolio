import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ESCAPE_LIMIT = 5;
const FLEE_RADIUS = 80;
const SURRENDER_MESSAGE = "Okay, jeder fängt mal irgendwo an. 😏";

export default function EasterEgg() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const linuxRef = useRef<HTMLButtonElement>(null);
  const winRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [escapes, setEscapes] = useState(0);
  const [surrendered, setSurrendered] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [linuxGlow, setLinuxGlow] = useState(false);

  const escapesRef = useRef(0);
  const surrenderedRef = useRef(false);
  const focusedRef = useRef(false);
  const lastFleeRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Windows startet rechts in der Arena
  useEffect(() => {
    const arena = arenaRef.current;
    const btn = winRef.current;
    if (!arena || !btn) return;
    setPos({
      x: Math.max(0, arena.offsetWidth - btn.offsetWidth - 8),
      y: Math.max(0, (arena.offsetHeight - btn.offsetHeight) / 2),
    });
  }, []);

  const hop = useCallback(() => {
    const arena = arenaRef.current;
    const btn = winRef.current;
    const linux = linuxRef.current;
    if (!arena || !btn || !linux) return;
    const ab = arena.getBoundingClientRect();
    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;
    const lb = linux.getBoundingClientRect();
    const cur = { x: ab.left + pos.x + bw / 2, y: ab.top + pos.y + bh / 2 };

    const candidates: { x: number; y: number; d: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * Math.max(0, ab.width - bw);
      const y = Math.random() * Math.max(0, ab.height - bh);
      const cx = ab.left + x + bw / 2;
      const cy = ab.top + y + bh / 2;
      // Linux-Button (mit Puffer) nicht überdecken
      if (cx > lb.left - 14 && cx < lb.right + 14 && cy > lb.top - 14 && cy < lb.bottom + 14) continue;
      const d = Math.hypot(cx - cur.x, cy - cur.y);
      if (d >= 90) candidates.push({ x, y, d });
    }
    const fallback = {
      x: Math.random() * Math.max(0, ab.width - bw),
      y: Math.random() * Math.max(0, ab.height - bh),
    };
    const pick = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] ?? fallback : fallback;
    setPos({ x: pick.x, y: pick.y });
    setTilt(Math.random() * 24 - 12);
  }, [pos]);

  const flee = useCallback(() => {
    if (surrenderedRef.current || focusedRef.current) return;
    if (reducedRef.current) {
      surrenderedRef.current = true;
      setSurrendered(true);
      setMessage(SURRENDER_MESSAGE);
      return;
    }
    const now = Date.now();
    if (now - lastFleeRef.current < 260) return;
    lastFleeRef.current = now;

    escapesRef.current += 1;
    setEscapes(escapesRef.current);
    if (escapesRef.current >= ESCAPE_LIMIT) {
      surrenderedRef.current = true;
      setSurrendered(true);
      setMessage(SURRENDER_MESSAGE);
      return;
    }
    hop();
  }, [hop]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (surrenderedRef.current || reducedRef.current || focusedRef.current) return;
    const btn = winRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
    if (d < FLEE_RADIUS) flee();
  };

  const handleWinClick = () => {
    if (surrendered) {
      setMessage(SURRENDER_MESSAGE);
      return;
    }
    if (reducedRef.current) {
      surrenderedRef.current = true;
      setSurrendered(true);
      setMessage(SURRENDER_MESSAGE);
      return;
    }
    flee();
  };

  const handleLinuxClick = () => {
    setMessage("Gute Wahl! 🐧");
    setLinuxGlow(true);
    window.setTimeout(() => setLinuxGlow(false), 1600);
  };

  return (
    <div className="mt-8 rounded-2xl border border-cyan-400/25 bg-cyan-400/5 p-5 md:p-6">
      <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">easter egg</p>
      <h4 className="mt-2 text-center text-xl font-bold">
        Linux oder <span className="neon-text">Windows?</span>
      </h4>
      <p className="mt-1 text-center text-sm text-slate-400">Probiere es aus …</p>

      {/* Arena: nur die zwei Buttons, damit Windows nichts überdecken kann */}
      <div
        ref={arenaRef}
        onMouseMove={handleMouseMove}
        className="relative mt-4 flex h-40 items-center justify-center"
      >
        <button
          ref={linuxRef}
          type="button"
          onClick={handleLinuxClick}
          className={`h-11 w-32 rounded-xl border border-cyan-400/40 bg-cyan-400/10 font-semibold text-cyan-100 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
            linuxGlow ? "shadow-[0_0_30px_rgba(16,185,129,0.55)]" : "shadow-[0_0_18px_rgba(0,212,255,0.25)]"
          }`}
        >
          🐧 Linux
        </button>

        <motion.button
          ref={winRef}
          type="button"
          onClick={handleWinClick}
          onFocus={() => (focusedRef.current = true)}
          onBlur={() => (focusedRef.current = false)}
          animate={{ x: pos.x, y: pos.y, rotate: tilt }}
          transition={
            reducedRef.current ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
          }
          className="absolute left-0 top-0 h-11 w-32 rounded-xl border border-white/15 bg-white/5 font-semibold text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          🪟 Windows
        </motion.button>
      </div>

      <div className="flex h-6 items-center justify-center">
        <AnimatePresence>
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedRef.current ? 0 : 0.35 }}
              className={
                message === "Gute Wahl! 🐧"
                  ? "font-mono text-sm text-emerald-300 [text-shadow:0_0_12px_rgba(16,185,129,0.6)]"
                  : "font-mono text-sm text-slate-300"
              }
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {escapes > 0 && !surrendered && (
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-slate-500">
          Fluchtversuche: {escapes}/5
        </p>
      )}
    </div>
  );
}
