import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession, safePath } from "@/lib/session";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignIn({ searchParams }) {
  const sp = await searchParams;
  const callbackURL = safePath(sp?.callbackURL);
  if (await getSession()) redirect(callbackURL);
  return <AuthForm mode="signin" callbackURL={callbackURL} />;
}
