import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="block text-center font-incognito font-bold text-2xl mb-2"
        >
          Shijas T K
        </Link>
        <p className="text-center text-sm text-zinc-500 mb-8">
          Sign in to manage your portfolio
        </p>
        <Card>
          <CardBody>
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </CardBody>
        </Card>
        <Link
          href="/"
          className="block text-center text-sm text-zinc-500 hover:text-primary-color mt-6"
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
