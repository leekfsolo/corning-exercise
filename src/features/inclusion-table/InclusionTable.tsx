import DataTable from "@/components/table/DataTable";
import { MOCK_DATA } from "@/constants";
import { createInclusionColumns, type InclusionTableProps } from "./columns";
import Button from "@/components/button/Button";
import { Plus } from "lucide-react";

const InclusionTable = () => {
  const columns = createInclusionColumns({
    onEdit: (id) => {
      console.log("Edit", id);
    },
    onDelete: (id) => {
      console.log("Delete", id);
    },
  });

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inclusion Table</h1>
        <Button
          iconStart={<Plus size={20} />}
          className="bg-blue-500 text-white"
        >
          Add Inclusion
        </Button>
      </div>
      <DataTable<InclusionTableProps> data={MOCK_DATA} columns={columns} />
    </div>
  );
};

export default InclusionTable;
