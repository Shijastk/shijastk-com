"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Per-route enter transition. `template.tsx` remounts on every navigation
 * within the (site) group, so this plays a curtain wipe on each page change:
 * a full-screen panel that starts covering the viewport and sweeps upward to
 * reveal the page, while the content fades/rises in just behind it.
 *
 * This is an enter-only transition (the reliable App Router pattern) — a true
 * exit→enter would need the brittle "frozen segment" workaround, which isn't
 * worth it for this editorial tone. Under reduced motion the children render
 * immediately with no curtain.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] origin-top dark:bg-zinc-900 bg-white"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
