// Pure Bengali formatting helpers. Safe to import from both server and client components.
const DIGITS = "০১২৩৪৫৬৭৮৯";

export const bn = (v) => String(v).replace(/\d/g, (d) => DIGITS[d]);

export const taka = (n) =>
  `${bn(
    Number.isInteger(n)
      ? n.toLocaleString("en-US")
      : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  )} টাকা`;

export const num = (n) => bn(Number(n).toLocaleString("en-US"));

export const priceNum = (n) =>
  bn(
    Number.isInteger(n)
      ? n.toLocaleString("en-US")
      : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );

export const pct = (n) => `${bn(Math.abs(n).toFixed(1))}%`;

export const dateBn = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
