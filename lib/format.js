const DIGITS = "\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF";

export const bn = (value) =>
  String(value).replace(/[0-9]/g, (digit) => DIGITS[Number(digit)]);

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    useGrouping: true,
    maximumFractionDigits: 2,
  }).format(Number(value));

export const taka = (value) => `${bn(formatNumber(value))} \u099F\u09BE\u0995\u09BE`;

export const num = (value) => bn(formatNumber(value));

export const priceNum = (value) => bn(formatNumber(value));

export const pct = (value) => `${bn(Math.abs(Number(value)).toFixed(1))}%`;

const WEEKDAYS_BN = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

const MONTHS_BN = {
  January: "জানুয়ারি",
  February: "ফেব্রুয়ারি",
  March: "মার্চ",
  April: "এপ্রিল",
  May: "মে",
  June: "জুন",
  July: "জুলাই",
  August: "আগস্ট",
  September: "সেপ্টেম্বর",
  October: "অক্টোবর",
  November: "নভেম্বর",
  December: "ডিসেম্বর",
};

// Today's date in Dhaka time, written with Bengali names and digits.
// Parts come from Intl in English, so the output does not depend on the browser's bn-BD support.
export const dateBn = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";

  return `${WEEKDAYS_BN[get("weekday")]}, ${bn(get("day"))} ${MONTHS_BN[get("month")]}, ${bn(get("year"))}`;
};