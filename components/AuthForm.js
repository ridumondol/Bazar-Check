"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81Z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z" />
    <path fill="#FBBC05" d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l4-3.1Z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42A11.94 11.94 0 0 0 12 0 12 12 0 0 0 1.28 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

export const inputCls =
  "h-10 w-full rounded-lg border border-line bg-surface px-[13px] text-sm placeholder:text-ink/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
export const primaryBtn =
  "inline-flex h-10 w-full items-center justify-center rounded-lg border border-brand-dark bg-brand px-[17px] text-sm font-semibold text-brand-content shadow-[0_4px_6px_-1px_rgba(5,137,62,0.2),0_2px_4px_-2px_rgba(5,137,62,0.2)] transition hover:bg-brand-dark disabled:opacity-60";

function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input className={inputCls} {...props} />
    </label>
  );
}

export default function AuthForm({ mode, callbackURL = "/" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const email = f.get("email");
    const password = f.get("password");
    if (signup && password !== f.get("confirm")) return setError("পাসওয়ার্ড দুটি মেলেনি।");
    setBusy(true);
    try {
      const result = signup
        ? await authClient.signUp.email({ name: String(f.get("name") || "").trim(), email, password, callbackURL })
        : await authClient.signIn.email({ email, password, callbackURL });
      if (result.error) {
        setError(result.error.message || "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।");
        return;
      }
      router.push(callbackURL);
      router.refresh();
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি। সার্ভার চালু আছে কি না দেখুন।");
    } finally {
      setBusy(false);
    }
  }

  const social = (provider) => async () => {
    setError("");
    try {
      const { error: err } = await authClient.signIn.social({ provider, callbackURL });
      if (err) setError(err.message || "এই প্রোভাইডার চালু নেই।");
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি অথবা এই social login সেটআপ করা নেই।");
    }
  };

  const socialBtn =
    "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-4 text-sm font-semibold transition hover:bg-canvas";

  return (
    <div className="mx-auto flex w-full max-w-[448px] flex-col gap-6 px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
        <p className="text-sm text-ink/60">
          {signup
            ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
            : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {signup && <Field label="নাম" name="name" placeholder="যেমন: রহিম উদ্দিন" required />}
          <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" required />
          <Field label="পাসওয়ার্ড" name="password" type="password" minLength={8} placeholder="কমপক্ষে ৮ অক্ষর" required />
          {signup && <Field label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" minLength={8} placeholder="আবার লিখুন" required />}
          {error && <p className="text-sm text-up" role="alert">{error}</p>}
          <button className={primaryBtn} disabled={busy}>
            {busy ? "অপেক্ষা করুন…" : signup ? "সাইন আপ" : "সাইন ইন"}
          </button>

          <div className="flex items-center gap-4 text-xs">
            <span className="h-px flex-1 bg-ink/10" />
            অথবা
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={social("google")} className={socialBtn}>
              <GoogleIcon /> Google দিয়ে চালিয়ে যান
            </button>
            <button type="button" onClick={social("github")} className={socialBtn}>
              <GithubIcon /> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-sm">
            {signup ? (
              <>অ্যাকাউন্ট আছে? <Link className="text-brand hover:underline" href="/signin">সাইন ইন করুন</Link></>
            ) : (
              <>অ্যাকাউন্ট নেই? <Link className="text-brand hover:underline" href="/signup">সাইন আপ করুন</Link></>
            )}
          </p>
        </form>
      </div>

      <Link href="/" className="text-center text-sm hover:underline">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}
