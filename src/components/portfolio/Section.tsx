
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="mt-3 text-3xl font-bold leading-tight md:text-5xl"
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-4 text-slate-400 md:text-lg"
        >
          {desc}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="neon-line mx-auto mt-6 w-48"
      />
    </div>
  );
}

export const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};
