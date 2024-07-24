import {useApolloClient, useMutation} from '@apollo/client';
import {create} from 'zustand';
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEMS,
} from '../services/GGL-Queries/CustomerCart/Cart.queries';

type CartItem = {
  id: string;
  [key: string]: any;
};

type CartState = {
  cart: CartItem[];
  cartId: string | null;
  loading: boolean;
  setCartId: (id: string | null) => void;
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  addToCartAsync: (item: any) => Promise<void>;
  removeFromCartAsync: (itemId: any) => Promise<void>;
  updateCartAsync: (item: any) => Promise<void>;
};

export const useCartStore = create<CartState>(set => ({
  cart: [],
  cartId: null,
  loading: false,
  setCartId: (id: string | null) => set({cartId: id}),
  setCart: (cart: CartItem[]) => set({cart}),
  addToCart: (item: CartItem) => set(state => ({cart: [...state.cart, item]})),
  removeFromCart: (itemId: string) =>
    set(state => ({cart: state.cart.filter(item => item.id !== itemId)})),

  addToCartAsync: async (item: CartItem) => {
    console.log(item, 'item from store');
    const client = useApolloClient();
    const [addToCartFn] = useMutation(ADD_CONFIGURABLE_PRODUCTS_TO_CART, {
      onCompleted: res => {
        console.log('added to caret');
        set({cart: res?.addConfigurableProductsToCart?.cart?.items});
      },
      onError: err => {
        console.log(err, 'err');
      },
    });

    await addToCartFn({
      variables: {cartId: useCartStore.getState().cartId, cartItems: item},
    });
  },
  removeFromCartAsync: async (itemId: string) => {
    const client = useApolloClient();
    const [removeFromCartFn] = useMutation(REMOVE_ITEM_FROM_CART, {
      onCompleted: res => {
        set({cart: res?.removeItemFromCart?.cart?.items});
      },
      onError: err => {
        console.log(err, 'err');
      },
    });

    await removeFromCartFn({
      variables: {cartId: useCartStore.getState().cartId, itemId},
    });
  },
  updateCartAsync: async (item: CartItem) => {
    const client = useApolloClient();
    const [updateCartFn] = useMutation(UPDATE_CART_ITEMS, {
      onCompleted: res => {
        set({cart: res?.updateCartItems?.cart?.items});
      },
      onError: err => {
        console.log(err, 'err');
      },
    });

    await updateCartFn({
      variables: {cartId: useCartStore.getState().cartId, items: [item]},
    });
  },
}));
