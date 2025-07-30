import { create } from "zustand";

type CartItemType = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartState = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => string;
  getItemCount: () => number;
  resetCart: () => void;
};

const initialCartItems: CartItemType[] = [];

/**
 * Zustand store hook for managing the shopping cart state.
 *
 * @remarks
 * This store provides actions and selectors for adding, removing, incrementing, and decrementing items in the cart,
 * as well as calculating the total price and item count. It also allows resetting the cart to its initial state.
 *
 * @example
 * ```tsx
 * const { items, addItem, removeItem, getTotalPrice } = useCartStore();
 * addItem({ id: 1, name: 'Product', price: 10, quantity: 1, maxQuantity: 5 });
 * ```
 *
 * @returns Zustand store API for cart management.
 *
 * @property {CartItemType[]} items - The current list of items in the cart.
 * @method addItem - Adds an item to the cart or updates its quantity if it already exists.
 * @method removeItem - Removes an item from the cart by its ID.
 * @method incrementItem - Increases the quantity of an item by 1, up to its maxQuantity.
 * @method decrementItem - Decreases the quantity of an item by 1, not going below 1.
 * @method getTotalPrice - Returns the total price of all items in the cart as a string with two decimals.
 * @method getItemCount - Returns the total quantity of all items in the cart.
 * @method resetCart - Resets the cart to its initial state.
 */
export const useCartStore = create<CartState>((set, get) => ({
  items: initialCartItems,
  addItem: (item: CartItemType) => {
    const existingItem = get().items.find((i) => i.id === item.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: Math.min(i.quantity + item.quantity, i.maxQuantity),
              }
            : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, item] }));
    }
  },
  removeItem: (id: number) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  incrementItem: (id: number) =>
    set((state) => {
      return {
        items: state.items.map((item) =>
          item.id === id && item.quantity < item.maxQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }),
  decrementItem: (id: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  getTotalPrice: () => {
    const { items } = get();

    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
  resetCart: () => set({ items: initialCartItems }),
}));
