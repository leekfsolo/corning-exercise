import type { Inclusion, InclusionTableProps } from "@/types";
import type { TableMeta } from "@tanstack/react-table";
import type { ReactNode } from "react";

interface EditableCellProps {
  id: string;
  meta?: TableMeta<InclusionTableProps>;
  children: ReactNode;
  renderEdit: (mutatingItem: Partial<Inclusion>) => ReactNode;
}

const EditableCell = ({
  id,
  meta,
  children,
  renderEdit,
}: EditableCellProps) => {
  const mutatingItem = meta?.mutatingItem;
  if (mutatingItem?.id === id) {
    return renderEdit(mutatingItem);
  }
  return children;
};

export default EditableCell;
