
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronDown, FolderGit2, Mail } from "lucide-react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 45, damping: 16 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 16, suffix: "", label: "Jahre alt", sub: "Schüler aus Weinheim" },
  { value: 10, suffix: "", label: "Klasse", sub: "Realschulabschluss angestrebt" },
  { value: null, suffix: "", label: "Eigene Projekte", sub: "Linux • Go • Lua • Rust" },
  { value: 2027, suffix: "", label: "Ausbildungsbeginn gesucht", sub: "Sommer / Herbst 2027" },
];

export default function Stats() {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass card-hover rounded-2xl p-5 text-center"
        >
          <div className="neon-text font-mono text-3xl font-bold md:text-4xl">
            {s.value === null ? <FolderGit2 className="mx-auto h-9 w-9 text-portfolio-link" /> : <Counter to={s.value} suffix={s.suffix} />}
          </div>
          <p className="mt-2 break-words text-sm font-medium text-slate-200">{s.label}</p>
          <p className="mt-1 font-mono text-[11px] text-slate-500">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-3"
    >
      <span className="glass flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs text-slate-300">
        <MapPin className="h-3.5 w-3.5 text-cyan-300" /> Weinheim, Deutschland
      </span>
      <span className="glass flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs text-slate-300">
        <Calendar className="h-3.5 w-3.5 text-cyan-300" /> 16 Jahre · 10. Klasse
      </span>
      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 font-mono text-xs text-emerald-300">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        IT-Ausbildung ab Sommer 2027
      </span>
    </motion.div>
  );
}

export function ScrollHint() {
  return (
    <motion.a
      href="#ueber-mich"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2 }}
      className="mx-auto mt-14 flex w-fit flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-cyan-300"
    >
      scroll
      <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <ChevronDown className="h-4 w-4 text-cyan-300" />
      </motion.span>
    </motion.a>
  );
}

export function HeroCTAs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.9, duration: 0.6 }}
      className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
    >
      <Button asChild variant="portfolio" className="h-auto rounded-2xl px-7 py-3.5 font-semibold"><a href="#projekte"><FolderGit2 /> Projekte ansehen</a></Button>
      <Button asChild variant="portfolioGhost" className="h-auto rounded-2xl px-7 py-3.5 font-semibold"><a href="#kontakt"><Mail /> Kontakt</a></Button>
      <Button asChild variant="portfolioGhost" className="h-auto rounded-2xl px-7 py-3.5 font-semibold"><a href="https://github.com/Cgtlpa" target="_blank" rel="noopener noreferrer"><FolderGit2 /> GitHub-Profil</a></Button>
    </motion.div>
  );
}
