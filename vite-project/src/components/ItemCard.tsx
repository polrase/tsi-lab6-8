import { Text } from "./Text";

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ItemCardProps {
  item: ShopItem;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <Text type="h2" className="text-xl">
          {item.name}
        </Text>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {item.price} c
        </span>
      </div>
      <Text type="p" className="mt-3">
        {item.description}
      </Text>
    </article>
  );
};
