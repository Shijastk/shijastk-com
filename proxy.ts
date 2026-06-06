import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next.js 16 "proxy" (formerly middleware). Coarse edge gate for /admin:
 * refreshes the Supabase session and redirects unauthenticated users to /login.
 * Fine-grained admin-role checks happen in the admin layout (requireAdmin).
 */
export async function proxy(request: NextRequest) {
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const ANON =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Supabase not configured → don't expose an unsecured dashboard.
  if (!URL || !ANON) {
    if (isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(URL, ANON, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
