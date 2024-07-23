import {useApolloClient, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {CREATE_CART_MUTATION} from '../services/GGL-Queries/CustomerCart/Cart.queries';

type CartItem = {
  id: string;
  [key: string]: any;
};

type setCartIdType = Dispatch<SetStateAction<string | null>>;

type CartContextType = {
  cart: CartItem[];
  cartId: string | null;
  loading: boolean;
  setCartId: setCartIdType;
  setCart: Dispatch<SetStateAction<any[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  getCustomerCartDetails: () => Promise<void>;
  createCustomerCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const client = useApolloClient();
  const [cart, setCart] = useState<any[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [createCustomerCartMutation] = useMutation(CREATE_CART_MUTATION, {
    onCompleted: async data => {
      const newCartId = data.createCustomerCart.id;
      setCartId(newCartId);
      await getCustomerCartDetails(newCartId);
      // await AsyncStorage.setItem('cartId', newCartId);
    },
    onError: error => {
      console.error('Failed to create customer cart:', error);
    },
  });

  const createCustomerCart = async () => {
    try {
      await createCustomerCartMutation();
    } catch (error) {
      console.error('Error creating customer cart:', error);
    }
  };

  const getCustomerCartDetails = async (providedCartId?: string) => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const idToUse = providedCartId || cartId;

      if (!idToUse) {
        throw new Error('No cart ID available');
      }

      // const {data} = await client.query({
      //   query: GET_CUSTOMER_CART,
      //   variables: {cartId: idToUse},
      //   fetchPolicy: 'network-only',
      // });

      // const fetchedCart = data?.getCustomerCart?.items || [];
      // setCart(fetchedCart);
      // await AsyncStorage.setItem('cart', JSON.stringify(fetchedCart));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch customer cart details:', error);
      setLoading(false);
    }
  };

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

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartId,
        setCartId,
        loading,
        addToCart,
        removeFromCart,
        getCustomerCartDetails,
        createCustomerCart,
      }}>
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
