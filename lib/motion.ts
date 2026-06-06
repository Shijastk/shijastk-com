import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language for the site — a refined, "editorial" feel:
 * an easeOutExpo curve, ~0.7s travel, gentle staggers. Keeping these in one
 * place means every reveal, stagger and text mask stays consistent.
 */

/** easeOutExpo — fast out of the gate, long settle. The signature jaseemv feel. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Default reveal duration (seconds). */
export const DUR = 0.7;

/** Delay between staggered children (seconds). */
export const STAGGER = 0.08;

/** Vertical travel for fade-up reveals (px). */
export const RISE = 24;

export const baseTransition: Transition = {
  duration: DUR,
  ease: EASE_OUT_EXPO,
};

/** Fade + rise. The workhorse used by Slide / Reveal / StaggerItem. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Parent that orchestrates a staggered reveal of its children. */
export const staggerContainer = (stagger = STAGGER, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** A single line/word rising from behind an `overflow-hidden` mask. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

/** Variants used when the user prefers reduced motion: instant, no transform. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0 } },
};
