import DataTable from "@/components/table/DataTable";
import { createInclusionColumns } from "./columns";
import type { InclusionTableProps } from "@/types";
import Button from "@/components/button/Button";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { useInclusionTable } from "../../hooks/useInclusionTable";

const InclusionTable = () => {
  const {
    error,
    data,
    mutatingItem,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    handleAdd,
    handleInputChange,
  } = useInclusionTable();

  const columns = useMemo(() => createInclusionColumns(), []);

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inclusion Table</h1>
        <Button
          variant="primary"
          iconStart={<Plus size={20} />}
          onClick={handleAdd}
          disabled={Boolean(mutatingItem)}
        >
          Add Row
        </Button>
      </div>
      <DataTable<InclusionTableProps>
        data={data}
        columns={columns}
        getRowIsError={(row) => row.id === mutatingItem?.id && Boolean(error)}
        meta={{
          error,
          mutatingItem,
          onEdit: handleEdit,
          onDelete: handleDelete,
          onSave: handleSave,
          onCancel: handleCancel,
          onInputChange: handleInputChange,
        }}
      />
    </div>
  );
};

export default InclusionTable;
