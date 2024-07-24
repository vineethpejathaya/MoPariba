import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {CartItem} from '../services/GGL-Queries/CustomerCart/Cart.types';

interface CartState {
  cartItems: CartItem[];
  cartId: string | null;
  setCartId: (id: string | null) => void;
  setCart: (cart: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  checkProductExists: (variantSku: string, parentSku?: string) => boolean;
  findProductInCart: (parentSku: string, variantSku: string) => CartItem | null;
}

export const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    cartItems: [],
    cartId: null,
    setCart: (cartItems: CartItem[]) => set({cartItems}),
    setCartId: (id: string | null) => set({cartId: id}),
    addItem: (item: CartItem) =>
      set(state => ({cartItems: [...state.cartItems, item]}), false, 'addItem'),
    removeItem: (itemId: string) =>
      set(
        state => ({
          cartItems: state.cartItems.filter(item => item.id !== itemId),
        }),
        false,
        'removeItem',
      ),
    clearCart: () => set({cartItems: []}, false, 'clearCart'),
    checkProductExists: (variantSku: string, parentSku?: string) => {
      const cartItems = get().cartItems;
      return cartItems.some(
        item =>
          item.product.sku === parentSku &&
          item.configured_variant?.sku === variantSku,
      );
    },
    findProductInCart: (parentSku: string, variantSku: string) => {
      const items = get().cartItems;
      return (
        items.find(
          item =>
            item.product.sku === parentSku &&
            item.configured_variant?.sku === variantSku,
        ) || null
      );
    },
  })),
);
// cart: [],
// cartId: null,
// loading: false,
// setCartId: (id: string | null) => set({cartId: id}),
// setCart: (cart: CartItem[]) => set({cart}),
// addItem: (item: CartItem) =>
//   set(state => ({cartItems: [...state.items, item]})),
// removeItem: (itemId: string) =>
//   set(state => ({items: state.items.filter(item => item.id !== itemId)})),
// clearCart: () => set({items: []}),
// checkProductExists: (parentSku: string, variantSku: string) => {
//   const items = get().items;
//   return items.some(
//     item =>
//       item.product.sku === parentSku &&
//       item.configured_variant?.sku === variantSku,
//   );
// },
