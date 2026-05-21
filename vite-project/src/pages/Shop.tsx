import { useState } from "react";

import { Button } from "../components/Button";
import { AddItemModal } from "../components/AddItemModal";
import { ItemCard, type ShopItem } from "../components/ItemCard";
import { Text } from "../components/Text";

const Shop = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddItem = (newItem: Omit<ShopItem, "id">) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ...newItem,
        id: prevItems.length + 1,
      },
    ]);
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Text type="h1" className="text-3xl">
              Список товаров
            </Text>
            <Text type="p" className="mt-2">
              Здесь отображаются все товары.
            </Text>
          </div>

          <Button
            color="primary"
            size="middle"
            title="Добавить товар"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {items.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <Text type="h2" className="text-xl">
              Пока товаров нет
            </Text>
            <Text type="p" className="mt-2">
              Нажмите "Добавить товар", чтобы создать первый элемент.
            </Text>
          </div>
        )}
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </section>
  );
};

export default Shop;
