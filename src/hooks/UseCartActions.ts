import {useMutation} from '@apollo/client';

import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEMS,
} from '../services/GGL-Queries/CustomerCart/Cart.mutation';
import {useCartStore} from './UseCartStore';

const useCartActions = () => {
  const setCart = useCartStore(state => state.setCart);
  const setAdding = useCartStore(state => state.setAdding);
  const setRemoving = useCartStore(state => state.setRemoving);
  const setUpdating = useCartStore(state => state.setUpdating);
  const cartId = useCartStore(state => state.cartId);
  const adding = useCartStore(state => state.adding);
  const removing = useCartStore(state => state.removing);
  const updating = useCartStore(state => state.updating);
  const findProductInCart = useCartStore(state => state.findProductInCart);

  const [addToCartFn] = useMutation(ADD_CONFIGURABLE_PRODUCTS_TO_CART, {
    onCompleted: res => {
      setCart(res?.addConfigurableProductsToCart?.cart?.items || []);
      setAdding(false);
    },
    onError: err => {
      console.log(err, 'err');
      setAdding(false);
    },
  });

  const [removeFromCartFn] = useMutation(REMOVE_ITEM_FROM_CART, {
    onCompleted: res => {
      setCart(res?.removeItemFromCart?.cart?.items || []);
      setRemoving(false);
    },
    onError: () => {
      setRemoving(false);
    },
  });

  const [updateCartFn] = useMutation(UPDATE_CART_ITEMS, {
    onCompleted: res => {
      setCart(res?.updateCartItems?.cart?.items || []);
      setUpdating(false);
    },
    onError: () => {
      setUpdating(false);
    },
  });

  const addToCart = async (productSku: string, variantSku: string) => {
    setAdding(true);
    await addToCartFn({
      variables: {
        cartId,
        cartItems: [
          {
            parent_sku: productSku,
            data: {
              quantity: 1,
              sku: variantSku,
            },
          },
        ],
      },
    });
  };

  const removeFromCart = async (productSku: string, variantSku?: string) => {
    const productInCart = findProductInCart(productSku, variantSku ?? '');
    if (variantSku) {
      if (productInCart?.quantity && productInCart?.quantity > 1) {
        setUpdating(true);
        await updateCartFn({
          variables: {
            cartId,
            cartItems: [
              {
                cart_item_id: productInCart.id,
                quantity: Number(productInCart?.quantity) - 1,
              },
            ],
          },
        });
      } else {
        if (productInCart) {
          setRemoving(true);
          await removeFromCartFn({
            variables: {
              cartId,
              cartItemId: productInCart.id,
            },
          });
        }
      }
    }
  };

  return {
    addToCart,
    removeFromCart,
    adding,
    removing,
    updating,
  };
};

export default useCartActions;
