"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import Theme from "./Theme";
import MobileMenu from "./MobileMenu";
import Magnetic from "./Magnetic";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10"
      initial={reduce ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Magnetic strength={0.4}>
          <Logo />
        </Magnetic>

        <nav className="md:block hidden">
          <ul className="flex items-center gap-x-8">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                >
                  {link.title}
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary-color transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-x-4">
          <Theme />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
