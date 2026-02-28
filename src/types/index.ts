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

export type { Inclusion };
export { InclusionType };
