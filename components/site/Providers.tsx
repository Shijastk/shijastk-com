"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      // next-themes injects an inline no-flash <script>. React 16/19 warns when a
      // component renders a <script> on the client ("never executed"). Mark it
      // executable on the server and inert (text/plain) on the client so it runs
      // once during HTML parsing but doesn't trip the warning on hydration.
      scriptProps={{
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
        suppressHydrationWarning: true,
      }}
    >
      {children}
    </ThemeProvider>
  );
}
