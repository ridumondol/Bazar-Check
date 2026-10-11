import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("getSession failed:", error.message);
    return null;
  }
}

// Only allow same-site relative paths as post-login redirects.
export function safePath(p) {
  return typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/";
}
