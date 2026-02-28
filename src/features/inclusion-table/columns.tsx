import Button from "@/components/button/Button";
import type { Inclusion } from "@/types";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export type InclusionTableProps = {
  actions?: ReactNode;
} & Inclusion;

interface CreateInclusionColumnsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const columnHelper = createColumnHelper<InclusionTableProps>();

const createInclusionColumns = ({
  onEdit,
  onDelete,
}: CreateInclusionColumnsProps) => {
  return [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <div className="text-left">ID</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("parent_id", {
      header: () => <div className="text-left">Parent ID</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <div>{info.getValue()}</div>,
      header: () => <div className="text-left">Name</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("radius", {
      header: () => <div className="text-left">Radius</div>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("type", {
      header: () => <div className="text-left">Type</div>,
      footer: (info) => info.column.id,
      cell: (info) => {
        const type = info.getValue();
        return <span className="capitalize">{type}</span>;
      },
    }),
    columnHelper.accessor("actions", {
      header: () => <div className="text-left">Actions</div>,
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => onEdit(info.row.original.id)}
            className="bg-blue-500 text-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(info.row.original.id)}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>
        </div>
      ),
      footer: (info) => info.column.id,
    }),
  ] as ColumnDef<InclusionTableProps, unknown>[];
};

export { createInclusionColumns };
