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
    // Corrupted data — fall back to mock
  }
  return structuredClone(MOCK_DATA);
}

export function saveInclusions(data: Inclusion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently fail
  }
}
