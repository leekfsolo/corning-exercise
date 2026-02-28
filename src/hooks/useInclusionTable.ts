import { useEffect, useMemo, useState } from "react";
import { uuidv7 } from "uuidv7";
import {
  InclusionType,
  type Inclusion,
  type InclusionTableProps,
} from "@/types";
import { loadInclusions, saveInclusions } from "@/utils/storage";
import { validateInclusion, hasErrors } from "@/utils/validation";

type InclusionError = Partial<Record<keyof Inclusion, string>>;

export const useInclusionTable = () => {
  const [error, setError] = useState<InclusionError | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [data, setData] = useState<InclusionTableProps[]>(loadInclusions);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<Partial<Inclusion> | null>(null);
  const [addingItem, setAddingItem] = useState<Partial<Inclusion> | null>(null);

  const handleValidate = (overrides?: Partial<Inclusion>) => {
    const baseItem = currentSelectedItem || addingItem;
    const itemToValidate = overrides || baseItem;

    if (!itemToValidate) return false;

    const currentError = validateInclusion({
      name: itemToValidate.name || "",
      radius: itemToValidate.radius ?? "",
      type: itemToValidate.type || "",
    });

    if (hasErrors(currentError)) {
      setError(currentError);
      return false;
    }

    setError(null);
    return true;
  };

  const handleReset = () => {
    setCurrentSelectedItem(null);
    setAddingItem(null);
    setError(null);
    setIsSaved(false);
  };

  const handleDelete = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (item: Inclusion) => {
    setCurrentSelectedItem(item);
    setAddingItem(null);
    setError(null);
    setIsSaved(false);
  };

  const handleSave = (id: string) => {
    setIsSaved(true);
    const isValid = handleValidate();
    if (!isValid) return;

    const currentData = [...data];

    if (addingItem) {
      currentData.push(addingItem as Inclusion);
      setData(currentData);
      handleReset();
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
    value: string | number
  ) => {
    let nextItem: Partial<Inclusion> | null = null;

    if (addingItem) {
      nextItem = { ...addingItem, [field]: value };
      setAddingItem(nextItem);
    } else if (currentSelectedItem) {
      const originalItem = data.find(
        (item) => item.id === currentSelectedItem.id
      );
      nextItem = {
        ...originalItem,
        ...currentSelectedItem,
        [field]: value,
      };
      setCurrentSelectedItem(nextItem);
    }

    if (nextItem && isSaved) {
      handleValidate(nextItem);
    }
  };

  const currentDisplayItems = useMemo(() => {
    if (addingItem) {
      return [...data, addingItem] as InclusionTableProps[];
    }
    return data;
  }, [data, addingItem]);

  const handleRowSelect = (id: string) => {
    setSelectedRowId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    saveInclusions(data);
  }, [data]);

  return {
    data: currentDisplayItems,
    mutatingItem,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    handleAdd,
    handleInputChange,
    handleRowSelect,
    selectedRowId,
    error,
  };
};
