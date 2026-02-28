import { InclusionType } from "@/types";

const VALID_TYPES = Object.values(InclusionType) as string[];

export function validateName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  return null;
}

export function validateRadius(radius: number | string): string | null {
  const num = typeof radius === "string" ? parseFloat(radius) : radius;
  if (isNaN(num)) {
    return "Radius must be a valid number";
  }
  if (num <= 0) {
    return "Radius must be greater than 0";
  }
  return null;
}

export function validateType(type: string): string | null {
  if (!VALID_TYPES.includes(type)) {
    return `Type must be one of: ${VALID_TYPES.join(", ")}`;
  }
  return null;
}

export type ValidationErrors = Partial<
  Record<"name" | "radius" | "type", string>
>;

export function validateInclusion(data: {
  name: string;
  radius: number | string;
  type: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const radiusError = validateRadius(data.radius);
  if (radiusError) errors.radius = radiusError;

  const typeError = validateType(data.type);
  if (typeError) errors.type = typeError;

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
