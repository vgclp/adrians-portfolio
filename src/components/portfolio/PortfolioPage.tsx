
import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  User, BookOpen, Target, ChevronRight, ShieldCheck, Zap, HeartHandshake,
} from "lucide-react";

import Preloader from "@/components/portfolio/Preloader";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorGlow from "@/components/portfolio/CursorGlow";
import Background from "@/components/portfolio/Background";
import Navbar from "@/components/portfolio/Navbar";
import TypingEffect from "@/components/portfolio/TypingEffect";
import Stats, { HeroBadges, HeroCTAs, ScrollHint } from "@/components/portfolio/HeroBits";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Ausbildung from "@/components/portfolio/Ausbildung";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Page() {
  // Taste "C" öffnet Kontakt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || (document.activeElement instanceof HTMLElement && document.activeElement.isContentEditable) || e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key.toLowerCase() === "c") {
        document.getElementById("kontakt")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Background />
      <Navbar />

      <main>
        {/* ============ HERO ============ */}
        <section id="start" className="relative mx-auto flex min-h-[min(900px,100svh)] max-w-6xl scroll-mt-24 flex-col justify-center px-5 pb-10 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6, ease }}
            className="glass mx-auto mb-7 flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full px-4 py-2 text-center"
          >
            <span className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
              AB SOMMER 2027
            </span>
            <span className="font-mono text-xs text-slate-300">
              IT-Ausbildungsplatz gesucht
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="text-center font-mono text-sm text-cyan-300/90"
          >
            whoami
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.8, ease }}
            className="mt-3 text-center text-5xl font-bold leading-[1.05] tracking-normal md:text-7xl lg:text-8xl"
          >
            Adrian
            <br />
            <span className="neon-text text-glow">Neubauer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.7 }}
            className="mx-auto mt-6 flex min-h-16 max-w-full items-center justify-center text-center sm:min-h-8 font-mono text-base text-slate-300 md:text-xl"
          >
            <span className="mr-2 text-cyan-400">&gt;_</span>
            <TypingEffect
              phrases={[
                "IT-Ausbildung ab Sommer 2027 gesucht",
                "Linux • Server • Netzwerke",
                "Lua • Go • Rust • TUI-Tools",
                "Eigene Projekte und selbstständiges Lernen",
              ]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            className="mx-auto mt-5 max-w-2xl text-center text-slate-400 md:text-lg"
          >
            Ich interessiere mich für{" "}
            <span className="text-cyan-200">Linux, Netzwerke, Server</span> und moderne{" "}
            <span className="text-cyan-200">Softwareentwicklung</span>.
          </motion.p>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-portfolio-body">
            Schüler der 10. Klasse · Realschulabschluss voraussichtlich Sommer 2027 · 
IT-Ausbildung ab 2027 gesucht
          </p>

          <div className="mt-7">
            <HeroBadges />
          </div>
          <HeroCTAs />
          <Stats />
          <ScrollHint />
        </section>

        <div className="neon-line mx-auto w-2/3 max-w-3xl opacity-50" />

        {/* ============ ÜBER MICH ============ */}
        <section id="ueber-mich" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">über-mich</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Über <span className="neon-text">mich</span>
            </h2>
            <div className="neon-line mx-auto mt-6 w-48" />
          </div>

          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="glass-strong relative overflow-hidden rounded-3xl p-7 md:p-9"
            >
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-500/20 blur-[70px]" />
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_0_22px_rgba(0,212,255,0.4)]">
                  <User className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Mein Name ist Adrian, ich bin 16 Jahre alt und Schüler aus Weinheim.</h3>
                  <p className="font-mono text-[11px] text-slate-500">Schüler · Linux-Enthusiast · Lua- und Go-Entwickler</p>
                </div>
              </div>
              <div className="space-y-4 leading-relaxed text-slate-300">
                <p>
                  Ich bin 16 Jahre alt, gehe in die 10. Klasse und möchte nach meinem voraussichtlichen Realschulabschluss im Sommer 2027 eine Ausbildung im IT-Bereich beginnen.
                </p>
                <p className="text-slate-400">
                  In meiner Freizeit beschäftige ich mich viel mit Linux, installiere und teste verschiedene Betriebssysteme und programmiere eigene Tools und Skripte. Besonders interessant finde ich es, herauszufinden, wie Systeme funktionieren und wie man Probleme selbst lösen kann.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: BookOpen, t: "Autodidakt", d: "Lernen durch Bauen" },
                  { icon: ShieldCheck, t: "Systemdenken", d: "Boot → Service" },
                  { icon: Zap, t: "Hands-on", d: "Terminal-first" },
                ].map((c, i) => (
                  <motion.div
                    key={c.t}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-colors hover:border-cyan-400/30"
                  >
                    <c.icon className="mx-auto h-5 w-5 text-cyan-300" />
                    <p className="mt-2 text-sm font-semibold">{c.t}</p>
                    <p className="font-mono text-[11px] text-slate-500">{c.d}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        <div className="neon-line mx-auto w-2/3 max-w-3xl opacity-50" />

        <Skills />
        <div className="neon-line mx-auto w-2/3 max-w-3xl opacity-50" />
        <Projects />
        <div className="neon-line mx-auto w-2/3 max-w-3xl opacity-50" />
        <Ausbildung />
        <div className="neon-line mx-auto w-2/3 max-w-3xl opacity-50" />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
