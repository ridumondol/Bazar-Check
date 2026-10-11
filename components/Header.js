import Link from "next/link";
import { getSession } from "@/lib/session";
import { dateBn } from "@/lib/format";
import { getCategories } from "@/lib/api";
import UserMenu from "./UserMenu";
import CategoryNav from "./CategoryNav";

const btn = "inline-flex h-10 items-center justify-center rounded-lg px-[17px] text-sm font-semibold transition";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;
  // The nav is decorative chrome on every page, so an API outage should not take the whole site down.
  const categories = await getCategories().catch((e) => {
    console.error("Header: failed to load categories:", e.message);
    return [];
  });
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-lg text-brand-content">🛒</span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-[1.4]">বাজার দর</span>
            <span className="hidden text-xs leading-4 sm:block">{dateBn()}</span>
          </span>
        </Link>
        {user ? (
          <UserMenu user={{ name: user.name, email: user.email, image: user.image }} />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className={`${btn} hover:bg-canvas`}>সাইন ইন</Link>
            <Link
              href="/signup"
              className={`${btn} border border-brand-dark bg-brand text-brand-content shadow-[0_4px_6px_-1px_rgba(5,137,62,0.2),0_2px_4px_-2px_rgba(5,137,62,0.2)] hover:bg-brand-dark`}
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
      <div className="border-t border-canvas bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <CategoryNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
