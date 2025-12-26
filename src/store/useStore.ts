import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, MenuItem, Sale } from "@/types/menu";
import { initialMenuItems } from "@/data/menuData";

interface StoreState {
  menuItems: MenuItem[];
  cart: CartItem[];
  sales: Sale[];
  
  // Menu CRUD
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  
  // Cart operations
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Sales
  completeSale: (paymentMethod: string) => void;
  
  // Getters
  getCartTotal: () => number;
  getMonthlySales: () => { month: string; total: number; count: number }[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      menuItems: initialMenuItems,
      cart: [],
      sales: [],

      addMenuItem: (item) => {
        const newItem: MenuItem = {
          ...item,
          id: Date.now().toString(),
        };
        set((state) => ({
          menuItems: [...state.menuItems, newItem],
        }));
      },

      updateMenuItem: (id, updates) => {
        set((state) => ({
          menuItems: state.menuItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },

      deleteMenuItem: (id) => {
        set((state) => ({
          menuItems: state.menuItems.filter((item) => item.id !== id),
        }));
      },

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      completeSale: (paymentMethod) => {
        const { cart, getCartTotal, clearCart } = get();
        if (cart.length === 0) return;

        const sale: Sale = {
          id: Date.now().toString(),
          items: [...cart],
          total: getCartTotal(),
          date: new Date().toISOString(),
          paymentMethod,
        };

        set((state) => ({
          sales: [...state.sales, sale],
        }));
        clearCart();
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getMonthlySales: () => {
        const { sales } = get();
        const monthlyData: Record<string, { total: number; count: number }> = {};

        sales.forEach((sale) => {
          const date = new Date(sale.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          const monthName = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });

          if (!monthlyData[monthName]) {
            monthlyData[monthName] = { total: 0, count: 0 };
          }
          monthlyData[monthName].total += sale.total;
          monthlyData[monthName].count += 1;
        });

        return Object.entries(monthlyData).map(([month, data]) => ({
          month,
          total: data.total,
          count: data.count,
        }));
      },
    }),
    {
      name: "restaurant-storage",
      partialize: (state) => ({
        menuItems: state.menuItems,
        sales: state.sales,
      }),
    }
  )
);
