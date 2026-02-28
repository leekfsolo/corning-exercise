import { describe, it, expect } from "vitest";
import {
  validateName,
  validateRadius,
  validateType,
  validateInclusion,
  hasErrors,
} from "./validation";

describe("validateName", () => {
  it("returns error for empty string", () => {
    expect(validateName("")).toBe("Name is required");
  });

  it("returns error for whitespace-only string", () => {
    expect(validateName("   ")).toBe("Name is required");
  });

  it("returns null for valid name", () => {
    expect(validateName("Inclusion A")).toBeNull();
  });

  it("returns null for single character name", () => {
    expect(validateName("X")).toBeNull();
  });
});

describe("validateRadius", () => {
  it("returns error for 0", () => {
    expect(validateRadius(0)).toBe("Radius must be greater than 0");
  });

  it("returns error for negative number", () => {
    expect(validateRadius(-1.5)).toBe("Radius must be greater than 0");
  });

  it("returns error for NaN string", () => {
    expect(validateRadius("abc")).toBe("Radius must be a valid number");
  });

  it("returns error for empty string", () => {
    expect(validateRadius("")).toBe("Radius must be a valid number");
  });

  it("returns null for valid positive number", () => {
    expect(validateRadius(2.5)).toBeNull();
  });

  it("returns null for valid positive string", () => {
    expect(validateRadius("1.2")).toBeNull();
  });

  it("returns null for very small positive number", () => {
    expect(validateRadius(0.001)).toBeNull();
  });
});

describe("validateType", () => {
  it("returns null for 'bubble'", () => {
    expect(validateType("bubble")).toBeNull();
  });

  it("returns null for 'crack'", () => {
    expect(validateType("crack")).toBeNull();
  });

  it("returns null for 'scratch'", () => {
    expect(validateType("scratch")).toBeNull();
  });

  it("returns error for unknown type", () => {
    const result = validateType("unknown");
    expect(result).toContain("Type must be one of");
  });

  it("returns error for empty string", () => {
    const result = validateType("");
    expect(result).toContain("Type must be one of");
  });

  it("returns error for uppercase variant", () => {
    const result = validateType("BUBBLE");
    expect(result).toContain("Type must be one of");
  });
});

describe("validateInclusion", () => {
  it("returns empty object for valid data", () => {
    const errors = validateInclusion({
      name: "Test",
      radius: 1.5,
      type: "bubble",
    });
    expect(errors).toEqual({});
  });

  it("returns all errors for completely invalid data", () => {
    const errors = validateInclusion({
      name: "",
      radius: -1,
      type: "invalid",
    });
    expect(errors.name).toBeDefined();
    expect(errors.radius).toBeDefined();
    expect(errors.type).toBeDefined();
  });

  it("returns only the fields that fail", () => {
    const errors = validateInclusion({
      name: "Valid",
      radius: 0,
      type: "crack",
    });
    expect(errors.name).toBeUndefined();
    expect(errors.radius).toBeDefined();
    expect(errors.type).toBeUndefined();
  });
});

describe("hasErrors", () => {
  it("returns false for empty object", () => {
    expect(hasErrors({})).toBe(false);
  });

  it("returns true when errors exist", () => {
    expect(hasErrors({ name: "Error" })).toBe(true);
  });
});
