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

  const handleClickPropagate = (
    e: React.MouseEvent,
    callback: (...args: unknown[]) => void,
    ...args: unknown[]
  ) => {
    e.stopPropagation();
    callback(...args);
  };

  if (mutatingItem?.id === item.id) {
    return (
      <div className="flex gap-2 items-center">
        <Button
          variant="success"
          size="sm"
          onClick={(e) => handleClickPropagate(e, () => onSave?.(item.id))}
          iconStart={<Check size={16} />}
        >
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => handleClickPropagate(e, () => onCancel?.())}
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
        variant="outline"
        size="sm"
        className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={(e) => handleClickPropagate(e, () => onEdit?.(item))}
        iconStart={<Pencil size={16} />}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={(e) => handleClickPropagate(e, () => onDelete?.(item.id))}
        iconStart={<Trash2 size={16} />}
      >
        Delete
      </Button>
    </div>
  );
};

export default ButtonGroupActions;
