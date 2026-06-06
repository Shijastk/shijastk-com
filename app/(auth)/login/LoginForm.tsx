"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type AuthState } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signIn,
    null
  );
  const error = useSearchParams().get("error");
  const notice =
    error === "forbidden"
      ? "That account isn't an admin."
      : error === "db"
        ? "Database isn't configured yet."
        : undefined;

  return (
    <form action={formAction} className="space-y-4">
      {notice ? (
        <p className="text-sm rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-2">
          {notice}
        </p>
      ) : null}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {state?.error ? (
        <p className="text-sm text-red-500">{state.error}</p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
