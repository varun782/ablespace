"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { LayoutGrid } from "lucide-react";

export default function GuestLogin() {
  const loginAsGuest = useAppStore((s) => s.loginAsGuest);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4">
      {/* ambient background, restrained */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-soft blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-pop)]"
      >
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <LayoutGrid size={20} />
        </div>

        <h1 className="text-lg font-semibold text-text">Let&apos;s get back on track</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Enter your email below to login to your account.
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={loginAsGuest}
          className="mt-6 w-full rounded-lg bg-[#171718] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Continue as Guest
        </motion.button>

        <button
          onClick={loginAsGuest}
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
        >
          <GoogleIcon />
          Login with Google
        </button>

        <p className="mt-5 text-[11px] leading-relaxed text-text-faint">
          By clicking continue, you agree to our{" "}
          <span className="underline underline-offset-2">Terms of Service</span> and{" "}
          <span className="underline underline-offset-2">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.5-4.6 2.5-7.6 2.5-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.5 5.5C41.5 36.1 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
