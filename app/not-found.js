import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
      <span className="text-6xl">🛒</span>
      <h1 className="text-2xl font-bold">৪০৪ — পেজটি পাওয়া যায়নি</h1>
      <p className="text-sm text-ink/60">আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।</p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded-lg border border-brand-dark bg-brand px-[17px] text-sm font-semibold text-brand-content shadow-[0_4px_6px_-1px_rgba(5,137,62,0.2),0_2px_4px_-2px_rgba(5,137,62,0.2)] hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
