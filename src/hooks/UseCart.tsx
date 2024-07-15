import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CartItem = {
  id: string;
  [key: string]: any;
};

type setCartIdType = Dispatch<SetStateAction<string | null>>;

type CartContextType = {
  cart: CartItem[];
  cartId: string | null;
  setCartId: setCartIdType;
  setCart: Dispatch<SetStateAction<any[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        const storedCartId = await AsyncStorage.getItem('cartId');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        }
        if (storedCartId !== null) {
          setCartId(storedCartId);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    saveCart();
  }, [cart]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: any) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{cart, setCart, cartId, setCartId, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
