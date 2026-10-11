"use client";

export default function Error({ reset }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
      <span className="text-6xl">⚠️</span>
      <h1 className="text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="text-sm text-ink/60">বাজারের দাম আনতে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
      <button
        onClick={() => reset()}
        className="inline-flex h-10 items-center rounded-lg border border-brand-dark bg-brand px-[17px] text-sm font-semibold text-brand-content hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
