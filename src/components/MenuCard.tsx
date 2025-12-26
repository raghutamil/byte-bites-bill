import { MenuItem } from "@/types/menu";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleClick = () => {
    addToCart(item);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left w-full"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-card group-hover:text-primary-foreground transition-colors">
              {item.name}
            </h3>
            <p className="text-primary font-semibold group-hover:text-accent transition-colors">
              ₹{item.price}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
      
      <div className="p-4 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          {item.name}
        </h3>
        <p className="text-primary font-semibold">₹{item.price}</p>
      </div>
    </button>
  );
};
