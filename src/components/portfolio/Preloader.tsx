
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 130);
    const fallback = setTimeout(() => setLoading(false), 2800);
    return () => {
      clearInterval(t);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute h-[420px] w-[420px] rounded-full border border-cyan-500/10"
          />
          <div className="glass flex items-center gap-3 rounded-2xl px-6 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(0,212,255,0.5)]">
              <Terminal className="h-5 w-5 text-white" />
            </span>
            <div className="font-mono text-sm">
              <span className="text-cyan-300">adrian@weinh​eim</span>
              <span className="text-slate-500">:~$ </span>
              <span className="text-slate-200">./portfolio --laden</span>
            </div>
          </div>
          <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_16px_rgba(0,212,255,0.8)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-cyan-300/70">
            {Math.min(Math.floor(progress), 100)}% — initialisiere System…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
