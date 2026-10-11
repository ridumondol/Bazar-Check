"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-up px-[17px] text-sm font-semibold text-up transition hover:bg-up/5"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              router.refresh();
            },
          },
        })
      }
    >
      <span>↩</span> সাইন আউট
    </button>
  );
}
