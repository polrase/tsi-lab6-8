import { useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";
import { Text } from "./Text";
import type { ShopItem } from "./ItemCard";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<ShopItem, "id">) => void;
}

export const AddItemModal = ({
  isOpen,
  onClose,
  onAddItem,
}: AddItemModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) {
    return null;
  }

  const isSubmitDisabled =
    !name.trim() || !price.trim() || !description.trim() || Number(price) <= 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddItem({
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
    });

    setName("");
    setPrice("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <Text type="h2">Добавление товара</Text>
          <Button
            color="secondary"
            size="small"
            title="Закрыть"
            onClick={onClose}
          />
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Название товара"
            name="name"
            type="text"
            placeholder="Например, Ноутбук"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            label="Цена"
            name="price"
            type="number"
            min="1"
            placeholder="Введите цену"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
            <span>Описание</span>
            <textarea
              name="description"
              placeholder="Коротко опишите товар"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-28 rounded-xl border border-slate-300 px-4 py-3 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <div className="mt-2 flex justify-end gap-3">
            <Button
              color="secondary"
              size="middle"
              title="Отмена"
              onClick={onClose}
            />
            <Button
              color="primary"
              size="middle"
              title="Добавить"
              type="submit"
              disabled={isSubmitDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
