import { TerminalSquare, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-700">
            <TerminalSquare className="h-4 w-4 text-white" />
          </span>
          <div className="font-mono text-xs text-slate-400">
            <span className="text-cyan-300">adrian@weinheim</span>:~$ ./deploy --prod ✓
            <p className="text-slate-500">© {new Date().getFullYear()} Adrian Neubauer · Weinheim · Mit Linux gebaut</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 font-mono text-xs text-slate-500">
            <a href="#start" className="hover:text-cyan-300">Start</a>
            <a href="#projekte" className="hover:text-cyan-300">Projekte</a>
            <a href="#kontakt" className="hover:text-cyan-300">Kontakt</a>
          </nav>
          <a href="#start" aria-label="Nach oben" className="btn-ghost rounded-xl p-2.5 text-cyan-200">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
