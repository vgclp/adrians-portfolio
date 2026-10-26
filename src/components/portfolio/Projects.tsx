
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, AppWindow, TerminalSquare, Package, ChevronDown, FolderGit2, Star, Hammer, Layers } from "lucide-react";

const projects = [
  {
    id: "silen", icon: Rocket, tag: "Eigene Linux-Distribution", title: "Silen Linux",
    desc: "Ich arbeite an meiner eigenen Linux-Distribution Silen Linux. Dazu gehören ein ISO-Build-System, ein Installer und der Paketmanager spk, den ich in Rust entwickle. Dabei lerne ich, wie die Komponenten eines Betriebssystems zusammenarbeiten.",
    points: ["ISO-Build-System und modularer Installer in Bash", "Systemgrundlage auf Basis von Gentoo Stage3", "OpenRC für die Verwaltung von Diensten", "Eigener Paketmanager spk in Rust"],
    tech: ["Linux", "Gentoo", "Bash", "Rust", "OpenRC"],
    gradient: "from-cyan-400 via-sky-500 to-blue-700", status: "In Entwicklung",
    url: "https://github.com/Cgtlpa/Lunara-Linux",
  },
  {
    id: "gotui", icon: AppWindow, tag: "Go · Terminal-Oberflächen", title: "gotui",
    desc: "Mit gotui entwickle ich ein Framework für Terminal-Oberflächen in Go. Damit lassen sich interaktive Programme für die Kommandozeile erstellen. Ich beschäftige mich dabei mit der Strukturierung größerer Programme und wiederverwendbaren Komponenten.",
    points: ["Eingabefelder, Auswahl und Mehrfachauswahl", "Passworteingabe, Bestätigungen und Formulare", "Themes und Spinner", "Beispielprogramme und Tests im Repository"],
    tech: ["Go", "TUI", "Go-Standardbibliothek", "Git"],
    gradient: "from-violet-500 via-fuchsia-500 to-cyan-400", status: "In Entwicklung",
    url: "https://github.com/Cgtlpa/gotui",
  },
  {
    id: "scripts", icon: TerminalSquare, tag: "System und Automatisierung", title: "Skripte und Terminal-Tools",
    desc: "Ich schreibe kleinere Helfer in Bash und Lua für den Alltag am Terminal. Öffentlich einsehbare Bash-Skripte für den ISO-Bau und die Installation sind Teil meines Silen-Linux-Projekts.",
    points: ["Bash-Skripte für ISO-Bau und Installation", "Modularer Aufbau der Installationsschritte", "Weitere Lua- und Terminal-Tools aus meinen eigenen Übungen"],
    tech: ["Bash", "Lua", "Git", "Linux"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600", status: "Wird erweitert",
    url: "https://github.com/Cgtlpa/Lunara-Linux/tree/main/scripts",
  },
];

export default function Projects() {
  const [open, setOpen] = useState<string | null>("silen");

  return (
    <section id="projekte" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">projekte</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Meine <span className="neon-text">Projekte</span>
        </h2>
        <div className="neon-line mx-auto mt-6 w-48" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((p, i) => {
          const isOpen = open === p.id;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`glass card-hover relative flex flex-col overflow-hidden rounded-3xl ${isOpen ? "!border-cyan-400/40 shadow-[0_20px_60px_-12px_rgba(0,212,255,0.35)]" : ""}`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} shadow-[0_0_24px_rgba(0,212,255,0.4)]`}>
                    <p.icon className="h-6 w-6 text-white" />
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-200">
                    <Star className="h-3 w-3" /> {p.status}
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">{p.tag}</p>
                <h3 className="mt-1.5 text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.desc}</p>

                <Button
                  variant="ghost"
                  aria-expanded={isOpen}
                  aria-controls={`project-${p.id}`}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  className="mt-4 h-auto justify-start self-start px-0 font-mono text-xs text-portfolio-link"
                >
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                  {isOpen ? "Details einklappen" : "Details ansehen"}
                </Button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`project-${p.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-2 border-t border-white/10 pt-4">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,212,255,0.9)]" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 ring-1 ring-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <Button asChild variant="portfolio" className="mt-5 h-auto rounded-xl px-4 py-3"><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} auf GitHub ansehen`}><FolderGit2 /> Auf GitHub ansehen</a></Button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 text-center md:flex-row md:text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
            <Hammer className="h-5 w-5" />
          </span>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">spk</span> — mein Paketmanager in Rust für Silen Linux, aktuell in Entwicklung.
          </p>
        </div>
        <span className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <Layers className="h-4 w-4 text-cyan-400" /> <Package className="h-4 w-4 text-cyan-400" /> build • pack • install
        </span>
      </motion.div>
    </section>
  );
}
