import { useStore } from "@/store/useStore";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm">Click on items to add them</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {cart.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{item.name}</h4>
              <p className="text-sm text-primary font-semibold">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-7 h-7 rounded-full bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center ml-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mt-4 space-y-3">
        <div className="flex justify-between items-center text-lg font-display">
          <span className="text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">₹{total}</span>
        </div>
        <Button
          variant="outline"
          onClick={clearCart}
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
