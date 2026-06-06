"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type RefObject } from "react";
import { EASE_OUT_EXPO, DUR, RISE } from "@/lib/motion";

interface SlideProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Scroll-into-view fade/rise reveal — the site's core motion primitive.
 * Public API unchanged (children, delay, className) so every existing call
 * site keeps working; internals upgraded to the editorial easeOutExpo curve.
 * Honours `prefers-reduced-motion` (instant fade, no transform).
 */
export const Slide = ({ children, className, delay = 0 }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: RISE },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR, ease: EASE_OUT_EXPO, delay },
        },
      };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
