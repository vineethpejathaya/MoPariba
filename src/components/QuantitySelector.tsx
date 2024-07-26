import {useMutation} from '@apollo/client';
import {
  AddIcon,
  Button,
  Center,
  HStack,
  IconButton,
  MinusIcon,
  Text,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useCartStore} from '../hooks/UseCartStore';
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEMS,
} from '../services/GGL-Queries/CustomerCart/Cart.queries';
import {
  AddConfigurableProductsToCartResponse,
  RemoveItemFromCartResponse,
  UpdateCartItemsResponse,
} from '../services/GGL-Queries/CustomerCart/Cart.types';
import theme from '../themes/theme';

const btnTypes = Object.freeze({
  regular: 'regular',
  custom: 'custom',
});
interface QuantityComponentProps {
  sku: string;
  parentSku: string;
  btnType: 'regular' | 'custom';
}

interface QuantityBtnProps {
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  quantity?: number;
}

const QuantitySelector = ({
  parentSku,
  sku,
  btnType = btnTypes.regular,
}: QuantityComponentProps) => {
  const {setCart, cartId, findProductInCart} = useCartStore();
  const productInCart = findProductInCart(parentSku, sku);
  const [addToCartFn, {loading: adding}] =
    useMutation<AddConfigurableProductsToCartResponse>(
      ADD_CONFIGURABLE_PRODUCTS_TO_CART,
      {
        onCompleted: res => {
          setCart(res?.addConfigurableProductsToCart?.cart?.items);
        },
      },
    );

  const [removeFromCartFn, {loading: updating}] =
    useMutation<RemoveItemFromCartResponse>(REMOVE_ITEM_FROM_CART, {
      onCompleted: res => {
        setCart(res?.removeItemFromCart?.cart?.items);
      },
      onError: err => {
        console.log(err, 'err');
      },
    });

  const [updateCartFn] = useMutation<UpdateCartItemsResponse>(
    UPDATE_CART_ITEMS,
    {
      onCompleted: res => {
        setCart(res?.updateCartItems?.cart?.items);
      },
    },
  );

  const handleAddToCart = async () => {
    addToCartFn({
      variables: {
        cartId: cartId,
        cartItems: [
          {
            parent_sku: parentSku,
            data: {
              quantity: 1,
              sku: sku,
            },
          },
        ],
      },
    });
  };

  const handleRemoveFromCart = async () => {
    if (productInCart?.quantity && productInCart?.quantity > 1) {
      updateCartFn({
        variables: {
          cartId: cartId,
          cartItems: [
            {
              cart_item_id: productInCart.id,
              quantity: Number(productInCart?.quantity) - 1,
            },
          ],
        },
      });
    } else {
      if (productInCart)
        removeFromCartFn({
          variables: {
            cartId: cartId,
            cartItemId: productInCart.id,
          },
        });
    }
  };

  return (
    <>
      {productInCart ? (
        <>
          {btnType == btnTypes.regular ? (
            <NativeQuantityBtn
              removeItem={handleRemoveFromCart}
              addItem={handleAddToCart}
              quantity={productInCart?.quantity}
            />
          ) : (
            <CustomQuantityBtn
              removeItem={handleRemoveFromCart}
              addItem={handleAddToCart}
              quantity={productInCart?.quantity}
            />
          )}
        </>
      ) : (
        <Button
          onPress={handleAddToCart}
          variant={'ghost'}
          _text={styles.addPlainBtnText}
          style={styles.addPlainBtn}>
          ADD
        </Button>
      )}
    </>
  );
};

export default QuantitySelector;

const NativeQuantityBtn = ({
  removeItem,
  addItem,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack style={styles.qtnContainer}>
        <IconButton
          icon={<FontAwesomeIcon name={'minus'} size={10} color={'green'} />}
          onPress={removeItem}
        />
        <Center>
          <Text style={styles.addPlainBtnText}>{quantity}</Text>
        </Center>
        <IconButton
          icon={<FontAwesomeIcon name={'plus'} size={10} color={'green'} />}
          onPress={addItem}
        />
      </HStack>
    </>
  );
};

const CustomQuantityBtn = ({
  removeItem,
  addItem,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack alignItems="center" space={3}>
        <IconButton
          onPress={removeItem}
          style={[styles.customBth]}
          icon={<MinusIcon size={2} style={{color: 'black'}} />}
        />

        <Text variant={'subheader2'}>{quantity}</Text>

        <IconButton
          onPress={addItem}
          style={[styles.customBth, styles.addBtn]}
          icon={<AddIcon size={2} color={theme.colors.white} />}
        />
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  qtnContainer: {
    gap: 4,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[300],
  },

  customBth: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[500],
  },
  customBtnText: {
    color: theme.colors.black,
  },
  addBtn: {
    backgroundColor: theme.colors.primary[900],
  },

  addPlainBtnText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    fontWeight: 900,
    color: theme.colors.primary[800],
  },
  addPlainBtn: {
    height: 40,
    width: 100,
  },
});
