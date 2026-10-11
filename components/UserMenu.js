"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const signOut = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });

  const item = "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-canvas";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-lg px-[17px] text-sm font-medium hover:bg-canvas"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar user={user} size={36} />
        <span className="hidden sm:inline">{user.name}</span>
        <span className="text-xs">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-1 w-64 rounded-2xl border border-line bg-surface p-[9px] shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)]"
        >
          <div className="border-b border-line px-3 py-2">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-ink/60">{user.email}</p>
          </div>
          <div className="pt-1">
            <Link href="/profile" className={item} onClick={() => setOpen(false)}>
              <span>👤</span> আমার প্রোফাইল
            </Link>
            <Link href="/#সব-পণ্য" className={item} onClick={() => setOpen(false)}>
              <span>⚖️</span> বাজার তুলনা
            </Link>
            <button onClick={signOut} className={`${item} w-full text-up`}>
              <span>↩</span> সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
