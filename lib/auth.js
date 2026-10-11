import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongodb";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret === "replace-with-a-random-secret" || secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET is missing, is still the example value, or is shorter than 32 characters. Generate a secret and add it to .env.local.");
}

const social = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  social.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  social.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret,
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: social,
  plugins: [nextCookies()],
});
