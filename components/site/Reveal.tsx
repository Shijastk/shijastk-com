"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useMemo, useRef, type RefObject, type ElementType } from "react";
import { EASE_OUT_EXPO, DUR, STAGGER } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Reveal — a single fade/rise element with a few tunable knobs.       */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  /** Vertical travel in px. */
  y?: number;
  delay?: number;
  /** Start animation slightly before fully in view. */
  once?: boolean;
}

export function Reveal({
  children,
  className,
  as,
  y = 24,
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    once,
    margin: "0px 0px -10% 0px",
  });
  const reduce = useReducedMotion();
  const Tag = useMemo(() => motion.create(as ?? "div"), [as]);

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR, ease: EASE_OUT_EXPO, delay },
        },
      };

  return (
    <Tag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* StaggerGroup / StaggerItem — orchestrated reveals for lists/grids.  */
/* ------------------------------------------------------------------ */

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  /** Gap between children (seconds). */
  stagger?: number;
  /** Delay before the first child (seconds). */
  delayChildren?: number;
}

export function StaggerGroup({
  children,
  className,
  as,
  stagger = STAGGER,
  delayChildren = 0,
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const Tag = useMemo(() => motion.create(as ?? "div"), [as]);

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  return (
    <Tag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
}

/** A child of StaggerGroup. Inherits the parent's hidden/show orchestration. */
export function StaggerItem({ children, className, as, y = 20 }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const Tag = useMemo(() => motion.create(as ?? "div"), [as]);

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR, ease: EASE_OUT_EXPO },
        },
      };

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
