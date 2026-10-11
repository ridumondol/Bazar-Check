import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "সাইন আপ — বাজার দর" };

export default async function SignUp() {
  if (await getSession()) redirect("/");
  return <AuthForm mode="signup" callbackURL="/" />;
}
