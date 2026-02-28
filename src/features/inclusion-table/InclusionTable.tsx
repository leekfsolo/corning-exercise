import DataTable from "@/components/table/DataTable";
import { MOCK_DATA } from "@/constants";
import { createInclusionColumns } from "./columns";
import {
  InclusionType,
  type Inclusion,
  type InclusionTableProps,
} from "@/types";
import Button from "@/components/button/Button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { uuidv7 } from "uuidv7";

const InclusionTable = () => {
  const [data, setData] = useState<InclusionTableProps[]>(MOCK_DATA);
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<Partial<Inclusion> | null>(null);
  const [addingItem, setAddingItem] = useState<Partial<Inclusion> | null>(null);

  const handleReset = () => {
    setCurrentSelectedItem(null);
    setAddingItem(null);
  };

  const handleDelete = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (item: Inclusion) => {
    setCurrentSelectedItem(item);
  };

  const handleSave = (id: string) => {
    const currentData = [...data];

    if (addingItem) {
      currentData.push(addingItem as Inclusion);
      handleReset();
      setData(currentData);
      return;
    }

    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, ...currentSelectedItem };
      }
      return item;
    });
    setData(updatedData);
    handleReset();
  };

  const handleCancel = () => {
    handleReset();
  };

  const handleAdd = () => {
    const id = uuidv7();
    setAddingItem({ id, type: InclusionType.BUBBLE });
  };

  const mutatingItem = useMemo(() => {
    return currentSelectedItem || addingItem;
  }, [currentSelectedItem, addingItem]);

  const handleInputChange = (
    field: keyof Inclusion,
    value: string | number,
  ) => {
    if (addingItem) {
      setAddingItem({ ...addingItem, [field]: value });
      return;
    }

    if (currentSelectedItem) {
      const originalItem = data.find(
        (item) => item.id === currentSelectedItem.id,
      );
      setCurrentSelectedItem({
        ...originalItem,
        ...currentSelectedItem,
        [field]: value,
      });
    }
  };

  const columns = useMemo(() => createInclusionColumns(), []);

  const currentDisplayItems = useMemo(() => {
    if (addingItem) {
      return [...data, addingItem] as InclusionTableProps[];
    }
    return data;
  }, [data, addingItem]);

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inclusion Table</h1>
        <Button
          iconStart={<Plus size={20} />}
          className="bg-blue-500 text-white"
          onClick={handleAdd}
          disabled={Boolean(mutatingItem)}
        >
          Add Row
        </Button>
      </div>
      <DataTable<InclusionTableProps>
        data={currentDisplayItems}
        columns={columns}
        meta={{
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
