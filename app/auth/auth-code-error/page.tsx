import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function AuthCodeError() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="glass max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <AlertCircle size={24} />
        </div>
        <h1 className="text-xl font-bold text-[var(--color-fg)]">
          Authentication Failed
        </h1>
        <p className="mt-2 text-xs text-[var(--color-fg-subtle)] leading-relaxed">
          We couldn&apos;t complete your sign-in verification. Please try signing in again from the guestbook.
        </p>
        <Link
          href="/#guestbook"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={14} />
          <span>Back to Guestbook</span>
        </Link>
      </div>
    </main>
  );
}

