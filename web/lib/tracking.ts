export const GA_MEASUREMENT_IDS = Array.from(
  new Set(
    [process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim(), "G-MWB9XB0TWX", "G-TW5DCPSRT1"].filter(
      (id): id is string => Boolean(id),
    ),
  ),
);

export const HOTJAR_ID = 2990325;
export const HOTJAR_SV = 5;

export const TVSQUARED_SITE_ID = "TV-7290907254-1";
export const TVSQUARED_COLLECTOR = "https://collector-20024.tvsquared.com/";

export const GOOGLE_SITE_VERIFICATIONS = [
  "VZre_By347CSbpGB5Icvkpmm8LKe0SO1HlWuID5PYS0",
  "_hip5Q3eT9zMz5Qt-7WTQaTZSznRLOjz2QLZdRfQd-Q",
] as const;
