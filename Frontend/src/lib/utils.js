import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` = clsx + tailwind-merge
// clsx → merges conditional classNames
// twMerge → resolves conflicts in Tailwind (e.g., "p-2 p-4" → "p-4")

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
