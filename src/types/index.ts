import type { ReactNode } from "react";

enum InclusionType {
  BUBBLE = "bubble",
  CRACK = "crack",
  SCRATCH = "scratch",
}

type Inclusion = {
  id: string;
  parent_id: string;
  name: string;
  radius: number;
  type: InclusionType;
};

type InclusionTableProps = {
  actions?: ReactNode;
} & Inclusion;

export type { Inclusion, InclusionTableProps };
export { InclusionType };
