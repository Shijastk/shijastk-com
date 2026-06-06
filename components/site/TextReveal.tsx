"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Fragment, useMemo, useRef, type RefObject, type ElementType } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface TextRevealProps {
  /** The string to reveal. Split into words, each rising from behind a mask. */
  text: string;
  className?: string;
  /** Heading/paragraph tag to render. Defaults to a div. */
  as?: ElementType;
  /** Delay before the first word (seconds). */
  delay?: number;
  /** Gap between words (seconds). */
  stagger?: number;
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

/**
 * Masked, per-word text reveal — words slide up from behind a clipped mask
 * with a gentle stagger. Used for hero / page-heading titles. Under reduced
 * motion it renders plain, fully-visible text.
 */
export default function TextReveal({
  text,
  className,
  as,
  delay = 0,
  stagger = 0.06,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as RefObject<Element>, { once: true });
  const reduce = useReducedMotion();
  const Tag = useMemo(() => motion.create(as ?? "div"), [as]);

  if (reduce) {
    const Plain = (as ?? "div") as ElementType;
    return <Plain className={className}>{text}</Plain>;
  }

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-flex overflow-hidden align-bottom" aria-hidden="true">
            <motion.span
              variants={wordVariants}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
