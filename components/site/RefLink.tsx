import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

/** External-friendly link wrapper. */
export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  return (
    <Link href={href} rel="noopener noreferrer" target={target} className={className}>
      {children}
    </Link>
  );
}
