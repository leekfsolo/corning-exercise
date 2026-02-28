import Button from "@/components/button/Button";
import type { Inclusion } from "@/types";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { ReactNode } from "react";

export type InclusionTableProps = {
  actions?: ReactNode;
} & Inclusion;

interface CreateInclusionColumnsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  isMutating: boolean;
}

const columnHelper = createColumnHelper<InclusionTableProps>();

const ButtonGroupActions = ({
  onEdit,
  onDelete,
  isMutating,
  onSave,
  onCancel,
  id,
}: CreateInclusionColumnsProps & { id: string }) => {
  if (isMutating) {
    return (
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => onSave(id)}
          className="bg-green-500 text-white hover:bg-green-600"
          iconStart={<Check size={16} />}
        >
          Save
        </Button>
        <Button
          onClick={() => onCancel()}
          className="border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
          iconStart={<X size={16} />}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => onEdit(id)}
        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        iconStart={<Pencil size={16} />}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete(id)}
        className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        iconStart={<Trash2 size={16} />}
      >
        Delete
      </Button>
    </div>
  );
};

const createInclusionColumns = ({
  onEdit,
  onDelete,
  isMutating,
  onSave,
  onCancel,
}: CreateInclusionColumnsProps) => {
  return [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <div className="text-left">ID</div>,
    }),
    columnHelper.accessor("parent_id", {
      header: () => <div className="text-left">Parent ID</div>,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <div>{info.getValue()}</div>,
      header: () => <div className="text-left">Name</div>,
    }),
    columnHelper.accessor("radius", {
      header: () => <div className="text-left">Radius</div>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("type", {
      header: () => <div className="text-left">Type</div>,
      cell: (info) => {
        const type = info.getValue();
        return <span className="capitalize">{type}</span>;
      },
    }),
    columnHelper.accessor("actions", {
      header: () => <div className="text-left">Actions</div>,
      cell: (info) => (
        <ButtonGroupActions
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
          isMutating={isMutating}
          id={info.row.original.id}
        />
      ),
    }),
  ] as ColumnDef<InclusionTableProps, unknown>[];
};

export { createInclusionColumns };
