
import { Button } from "@/components/ui/button";
import { application, contactMailto } from "@/lib/portfolio";
import { motion } from "framer-motion";
import { Mail, MapPin, FolderGit2 } from "lucide-react";
import { useState } from "react";

const EMAIL = application.email;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopyError(true); }
  };

  return (
    <section id="kontakt" className="relative mx-auto max-w-4xl scroll-mt-24 px-5 py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">kontakt</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Lassen Sie uns gerne sprechen
        </h2>
        <p className="mt-4 text-slate-400 md:text-lg">
          Über eine Nachricht von Ihnen würde ich mich freuen.&nbsp;
        </p>
        <div className="neon-line mx-auto mt-6 w-48" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
      >
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-[80px]" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-700/25 blur-[80px]" />

        <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_0_40px_rgba(0,212,255,0.5)]">
          <Mail className="h-7 w-7 text-white" />
        </span>

        <h3 className="relative mt-5 text-xl font-bold md:text-2xl">Adrian Neubauer</h3>
        <p className="relative mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-cyan-300" /> Weinheim, Deutschland</span>
          <a href={application.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-portfolio-link"><FolderGit2 className="h-3.5 w-3.5" /> GitHub-Profil</a>
        </p>

        <div className="relative mx-auto mt-7 flex max-w-md flex-col gap-3">
          <Button asChild variant="portfolio" className="h-auto w-full rounded-2xl px-6 py-3.5 font-semibold"><a href={contactMailto}>
            <Mail className="h-4 w-4" /> E-Mail schreiben
          </a></Button>
          <Button
            variant="portfolioGhost"
            onClick={copy}
            className="h-auto w-full whitespace-normal break-all rounded-2xl px-6 py-3 font-mono text-sm"
            title="Klicken zum Kopieren"
          >
            {EMAIL}
          </Button>
        </div>


        <p className="relative mt-6 text-sm text-portfolio-body"></p>
        <p role="status" aria-live="polite" className="relative mt-2 min-h-5 text-sm text-portfolio-body">{copyError ? "Kopieren war nicht möglich. Du kannst die E-Mail-Adresse auswählen und kopieren." : copied ? "E-Mail-Adresse kopiert." : ""}</p>
      </motion.div>
    </section>
  );
}
