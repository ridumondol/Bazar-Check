"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { inputCls, primaryBtn } from "./AuthForm";

export default function UpdateProfileForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setBusy(false);
    if (error) return setMsg({ ok: false, text: error.message || "আপডেট করা যায়নি।" });
    setMsg({ ok: true, text: "প্রোফাইল আপডেট হয়েছে।" });
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">নাম</span>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      {msg && <p className={`text-sm ${msg.ok ? "text-down" : "text-up"}`}>{msg.text}</p>}
      <button className={primaryBtn} disabled={busy}>
        {busy ? "সংরক্ষণ হচ্ছে…" : "আপডেট"}
      </button>
    </form>
  );
}
