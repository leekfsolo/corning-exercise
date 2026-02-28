import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type TableMeta,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "@/utils/classname.util";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData = unknown> {
  columns: ColumnDef<TData>[];
  data: TData[];
  /**
   * @description
   * Container class name.
   */
  className?: string;

  /**
   * @description
   * Enable row selection column.
   */
  enableRowSelection?: boolean;
  /**
   * @description
   * Custom table meta for passing dynamic state to columns.
   */
  meta?: TableMeta<TData>;

  /**
   * @description
   * Table class name.
   */
  tableClassName?: string;
}

function DataTable<TData = unknown>({
  columns,
  data,
  className,
  tableClassName,
  meta,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    meta,
  });

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className={cn("w-full text-sm text-left", tableClassName)}>
          <thead className="bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-4"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            header.column.getCanSort() &&
                              "cursor-pointer select-none hover:text-gray-700",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <span className="shrink-0 text-gray-400">
                              {header.column.getIsSorted() === "asc" ? (
                                <ArrowUp size={14} className="text-blue-500" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ArrowDown
                                  size={14}
                                  className="text-blue-500"
                                />
                              ) : null}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="bg-white hover:bg-gray-50/80 transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-gray-600 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}

export default DataTable;
