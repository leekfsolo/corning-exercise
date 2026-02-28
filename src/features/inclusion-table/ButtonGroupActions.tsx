import Button from "@/components/button/Button";
import type { Inclusion, InclusionTableProps } from "@/types";
import type { TableMeta } from "@tanstack/react-table";
import { Check, Pencil, Trash2, X } from "lucide-react";

const ButtonGroupActions = ({
  item,
  meta,
}: {
  item: Inclusion;
  meta?: TableMeta<InclusionTableProps>;
}) => {
  const onEdit = meta?.onEdit;
  const onDelete = meta?.onDelete;
  const onSave = meta?.onSave;
  const onCancel = meta?.onCancel;
  const mutatingItem = meta?.mutatingItem;

  if (mutatingItem?.id === item.id) {
    return (
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => onSave?.(item.id)}
          className="bg-green-500 text-white hover:bg-green-600"
          iconStart={<Check size={16} />}
        >
          Save
        </Button>
        <Button
          onClick={() => onCancel?.()}
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
        onClick={() => onEdit?.(item)}
        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        iconStart={<Pencil size={16} />}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete?.(item.id)}
        className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        iconStart={<Trash2 size={16} />}
      >
        Delete
      </Button>
    </div>
  );
};

export default ButtonGroupActions;
