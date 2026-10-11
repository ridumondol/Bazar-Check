import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function Profile() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackURL=/profile");
  const { user } = session;
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-ink/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-[25px]">
        <Avatar user={user} size={70} className="rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl">{user.name}</p>
          <p className="truncate text-base text-ink/60">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-[21px]">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <UpdateProfileForm user={{ name: user.name }} />
      </div>
    </div>
  );
}
