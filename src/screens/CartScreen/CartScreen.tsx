import {useMutation, useQuery} from '@apollo/client';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {DeleteIcon} from '../../assets/icons/Icons';
import QuantityButton from '../../components/QuantityButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {useCart} from '../../hooks/UseCart';
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  GET_CUSTOMER_CART,
  REMOVE_ITEM_FROM_CART,
} from '../../services/ggl-queries/cart';
import theme from '../../themes/theme';

function CartScreen() {
  const {cart, cartId, setCart} = useCart();
  const {loading, error, data, refetch} = useQuery(GET_CUSTOMER_CART, {
    variables: {cart_id: cartId},
    onCompleted: (res: any) => {
      setCart(res?.cart?.items);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <>
      <ScreenHeader
        leftActions={[<Text variant={'subheader1'}>My Cart</Text>]}
      />
      <ScreenContent>
        <VStack px={4} flex={1} space={2} justifyContent={'space-between'}>
          <VStack>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text variant={'subheader2'} fontSize={'lg'}>
                Review Items
              </Text>
              <Button
                variant={'unstyled'}
                _text={{color: 'black'}}
                rightIcon={<DeleteIcon />}>
                Clear cart
              </Button>
            </HStack>
            <Divider />
            <Box style={styles.container}>
              <ScrollView>
                <VStack space={4}>
                  {cart?.length > 0 ? (
                    <>
                      {cart?.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem} />
                      ))}
                    </>
                  ) : null}
                </VStack>
              </ScrollView>
            </Box>
          </VStack>

          <Button variant={'solid'}>Proceed</Button>
        </VStack>
      </ScreenContent>
    </>
  );
}

export default CartScreen;

export const CartItem = ({cartItem}: {cartItem: any}) => {
  const {cartId, setCart} = useCart();
  const price = cartItem?.prices?.row_total_including_tax?.value;
  const parentSku = cartItem?.product?.sku;
  const sku = cartItem?.configured_variant?.sku;

  const [addToCartFn, {data: cartData}] = useMutation(
    ADD_CONFIGURABLE_PRODUCTS_TO_CART,
    {
      onCompleted: res => {
        setCart(res?.addConfigurableProductsToCart?.cart?.items);
      },
      onError: err => {
        console.log(err, 'err');
      },
    },
  );

  const [removeFromCartFn, {loading: removing, error: removeErr}] = useMutation(
    REMOVE_ITEM_FROM_CART,
    {
      onCompleted: res => {
        setCart(res?.removeItemFromCart?.cart?.items);
      },
      onError: err => {
        console.log(err, 'err');
      },
    },
  );

  const handleAdd = () => {
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

  const handleRemove = () => {
    removeFromCartFn({
      variables: {
        cartId: cartId,
        cartItemId: cartItem?.id,
      },
    });
  };

  return (
    <>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}>
        <HStack alignItems={'center'} space={2}>
          <Box style={styles.imageContainer}>
            {cartItem?.product?.image?.url && (
              <Image
                source={{uri: `${cartItem?.product?.image?.url}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={cartItem?.product?.image?.label}
              />
            )}
          </Box>
          <VStack>
            <Text variant="body2" fontSize={'sm'}>
              {cartItem?.product?.name ?? '--'}
            </Text>
          </VStack>
        </HStack>
        <QuantityButton
          quantity={cartItem?.quantity}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />

        <Text variant="body2" fontSize={'sm'}>
          ₹{price ?? 0}
        </Text>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('window').height * 0.65,
    overflow: 'scroll',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 700,
  },
  btn: {
    height: 40,
    width: 100,
  },
});
