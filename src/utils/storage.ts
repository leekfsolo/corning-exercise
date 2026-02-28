import type { Inclusion } from "@/types";
import { MOCK_DATA } from "@/constants";

const STORAGE_KEY = "corning-inclusions";

export function loadInclusions(): Inclusion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    console.error("Failed to load inclusions from storage");
  }
  return structuredClone(MOCK_DATA);
}

export function saveInclusions(data: Inclusion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error("Failed to save inclusions to storage");
  }
}
