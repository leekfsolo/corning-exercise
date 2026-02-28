import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import type { Inclusion, InclusionTableProps } from "@/types";
import {
  createColumnHelper,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

import ButtonGroupActions from "./ButtonGroupActions";
import { INCLUSION_OPTIONS } from "@/constants";
import EditableCell from "./EditableCell";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    mutatingItem?: Partial<Inclusion> | null;
    onEdit?: (item: Inclusion) => void;
    onDelete?: (id: string) => void;
    onSave?: (id: string) => void;
    onCancel?: () => void;
    onInputChange?: (field: keyof Inclusion, value: string | number) => void;
  }
}

const columnHelper = createColumnHelper<InclusionTableProps>();

const createInclusionColumns = () => {
  return [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <div className="text-left">ID</div>,
    }),
    columnHelper.accessor("parent_id", {
      header: () => <div className="text-left">Parent ID</div>,
      cell: (info) => (
        <EditableCell
          id={info.row.original.id}
          meta={info.table.options.meta}
          renderEdit={(mutatingItem: Partial<Inclusion>) => (
            <Input
              type="text"
              value={mutatingItem.parent_id ?? ""}
              onChange={(e) =>
                info.table.options.meta?.onInputChange?.(
                  "parent_id",
                  e.target.value,
                )
              }
            />
          )}
        >
          {info.getValue()}
        </EditableCell>
      ),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: () => <div className="text-left">Name</div>,
      cell: (info) => (
        <EditableCell
          id={info.row.original.id}
          meta={info.table.options.meta}
          renderEdit={(mutatingItem: Partial<Inclusion>) => (
            <Input
              type="text"
              value={mutatingItem.name ?? ""}
              onChange={(e) =>
                info.table.options.meta?.onInputChange?.("name", e.target.value)
              }
            />
          )}
        >
          {info.getValue()}
        </EditableCell>
      ),
    }),
    columnHelper.accessor("radius", {
      header: () => <div className="text-left">Radius</div>,
      cell: (info) => (
        <EditableCell
          id={info.row.original.id}
          meta={info.table.options.meta}
          renderEdit={(mutatingItem: Partial<Inclusion>) => (
            <Input
              type="number"
              step={0.1}
              value={mutatingItem.radius ?? ""}
              onChange={(e) =>
                info.table.options.meta?.onInputChange?.(
                  "radius",
                  parseFloat(e.target.value) || 0,
                )
              }
            />
          )}
        >
          {info.renderValue()}
        </EditableCell>
      ),
    }),
    columnHelper.accessor("type", {
      header: () => <div className="text-left">Type</div>,
      cell: (info) => (
        <EditableCell
          id={info.row.original.id}
          meta={info.table.options.meta}
          renderEdit={(mutatingItem: Partial<Inclusion>) => (
            <Select
              value={mutatingItem.type ?? ""}
              onChange={(e) =>
                info.table.options.meta?.onInputChange?.("type", e.target.value)
              }
              options={INCLUSION_OPTIONS}
            />
          )}
        >
          <span className="capitalize">{info.getValue()}</span>
        </EditableCell>
      ),
    }),
    columnHelper.accessor("actions", {
      header: () => <div className="text-left">Actions</div>,
      enableSorting: false,
      cell: (info) => (
        <ButtonGroupActions
          item={info.row.original}
          meta={info.table.options.meta}
        />
      ),
    }),
  ] as ColumnDef<InclusionTableProps, unknown>[];
};

export { createInclusionColumns };
