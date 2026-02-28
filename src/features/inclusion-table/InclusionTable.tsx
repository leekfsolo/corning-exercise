import DataTable from "@/components/table/DataTable";
import { MOCK_DATA } from "@/constants";
import { createInclusionColumns, type InclusionTableProps } from "./columns";
import Button from "@/components/button/Button";
import { Plus } from "lucide-react";
import { useState } from "react";

const InclusionTable = () => {
  const [data, setData] = useState<InclusionTableProps[]>(MOCK_DATA);
  const [isMutating, setIsMutating] = useState(false);

  const handleDelete = (id: string) => {
    setIsMutating(true);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setIsMutating(false);
  };

  const handleEdit = (id: string) => {
    setIsMutating(true);
    console.log("Edit", id);
  };

  const handleSave = (id: string) => {
    setIsMutating(true);
    console.log("Save", id);
  };

  const handleCancel = () => {
    setIsMutating(false);
  };

  const columns = createInclusionColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: handleCancel,
    onSave: handleSave,
    isMutating,
  });

  const handleAddRow = () => {
    setIsMutating(true);
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inclusion Table</h1>
        <Button
          iconStart={<Plus size={20} />}
          className="bg-blue-500 text-white"
          onClick={handleAddRow}
          disabled={isMutating}
        >
          Add Row
        </Button>
      </div>
      <DataTable<InclusionTableProps> data={data} columns={columns} />
    </div>
  );
};

export default InclusionTable;
