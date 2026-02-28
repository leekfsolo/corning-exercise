import { useMemo, useState } from "react";
import { uuidv7 } from "uuidv7";
import {
  InclusionType,
  type Inclusion,
  type InclusionTableProps,
} from "@/types";
import { MOCK_DATA } from "@/constants";

type InclusionError = Partial<Record<keyof Inclusion, string>>;

export const useInclusionTable = () => {
  const [error, setError] = useState<InclusionError | null>(null);
  const [data, setData] = useState<InclusionTableProps[]>(MOCK_DATA);
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<Partial<Inclusion> | null>(null);
  const [addingItem, setAddingItem] = useState<Partial<Inclusion> | null>(null);

  const handleValidate = (overrides?: Partial<Inclusion>) => {
    const currentError: InclusionError = {};
    const baseItem = currentSelectedItem || addingItem;
    const itemToValidate = overrides || baseItem;

    if (!itemToValidate) return false;

    if (!itemToValidate.name) {
      currentError.name = "Name is required";
    }

    if (!itemToValidate.radius) {
      currentError.radius = "Radius is required";
    } else {
      const radius = Number(itemToValidate.radius);
      if (radius <= 0 || isNaN(radius)) {
        currentError.radius = "Radius must be greater than 0";
      }
    }

    if (Object.keys(currentError).length > 0) {
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
  };

  const handleDelete = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (item: Inclusion) => {
    setCurrentSelectedItem(item);
    setAddingItem(null);
    setError(null);
  };

  const handleSave = (id: string) => {
    const isValid = handleValidate();
    if (!isValid) return;

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
    let nextItem: Partial<Inclusion> | null = null;

    if (addingItem) {
      nextItem = { ...addingItem, [field]: value };
      setAddingItem(nextItem);
    } else if (currentSelectedItem) {
      const originalItem = data.find(
        (item) => item.id === currentSelectedItem.id,
      );
      nextItem = {
        ...originalItem,
        ...currentSelectedItem,
        [field]: value,
      };
      setCurrentSelectedItem(nextItem);
    }

    if (nextItem) {
      handleValidate(nextItem);
    }
  };

  const currentDisplayItems = useMemo(() => {
    if (addingItem) {
      return [...data, addingItem] as InclusionTableProps[];
    }
    return data;
  }, [data, addingItem]);

  return {
    data: currentDisplayItems,
    mutatingItem,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    handleAdd,
    handleInputChange,
    error,
  };
};
