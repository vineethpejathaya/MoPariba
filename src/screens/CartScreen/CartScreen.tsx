import {useMutation, useQuery} from '@apollo/client';
import {Button, Divider, HStack, ScrollView, Text, VStack} from 'native-base';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {CartBag, DeleteIcon} from '../../assets/icons/Icons';
import NoDataIllustration from '../../components/NoDataIllustration';
import PressableContainer from '../../components/Pressable/PressableContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {useCart} from '../../hooks/UseCart';
import {
  CLEAR_CUSTOMER_CART,
  GET_CUSTOMER_CART,
} from '../../services/ggl-queries/CustomerCart/Cart.queries';
import theme from '../../themes/theme';
import CartScreenStyles from './CartScreen.styles';
import {CartItem} from './components/CartItem';
import CouponSection from './components/CouponSection';

function CartScreen() {
  const {cart, cartId, setCart} = useCart();
  const {loading, error, data, refetch} = useQuery(GET_CUSTOMER_CART, {
    variables: {cart_id: cartId},
    onCompleted: (res: any) => {
      setCart(res?.cart?.items);
    },
  });

  const [
    clearCustomerCart,
    {loading: clearingCart, data: cartData, error: cartError},
  ] = useMutation(CLEAR_CUSTOMER_CART, {
    onCompleted: res => {},
  });

  const handleClear = () => {
    clearCustomerCart({
      variables: {
        cartId: cartId,
      },
    });
  };

  const shippingCharges = 0;
  const subTotal = cart?.reduce(
    (acc, curr) => curr?.prices?.row_total_including_tax?.value + acc,
    0,
  );
  const total = subTotal + shippingCharges;
  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader
        hStackProps={{shadow: 3}}
        leftActions={[<Text variant={'subheader1'}>My Cart</Text>]}
      />
      {cart.length == 0 ? (
        <NoDataIllustration
          message={
            <VStack alignItems={'center'}>
              <CartBag />
              <Text variant={'title1'}>{'No Products in the cart!'}</Text>
            </VStack>
          }
        />
      ) : (
        <>
          <VStack style={CartScreenStyles.mainContainer}>
            <VStack>
              <HStack style={CartScreenStyles.cartReviewContainer}>
                <Text style={CartScreenStyles.cartReviewHeading}>
                  Review Items
                </Text>
                <PressableContainer onPress={() => {}}>
                  <HStack space={2} alignItems={'center'}>
                    <Text
                      style={CartScreenStyles.cartReviewHeading}
                      fontSize={'sm'}
                      onPress={handleClear}>
                      Clear cart
                    </Text>
                    <DeleteIcon />
                  </HStack>
                </PressableContainer>
              </HStack>

              <ScrollView>
                <VStack height={Dimensions.get('window').height * 0.35}>
                  <ScrollView flex={1}>
                    <VStack>
                      {cart?.map((cartItem: any, index: number) => (
                        <CartItem key={index} cartItem={cartItem} />
                      ))}
                    </VStack>
                  </ScrollView>
                </VStack>
              </ScrollView>
            </VStack>
            <CouponSection />
            <CartSummary
              subTotal={subTotal}
              total={total}
              shippingCharges={shippingCharges}
            />
            <Button mx={5}>Proceed to pay</Button>
          </VStack>
        </>
      )}
    </>
  );
}

export default CartScreen;

const CartSummary = ({
  subTotal,
  total,
  shippingCharges,
}: {
  subTotal: number;
  total: number;
  shippingCharges: number;
}) => {
  return (
    <>
      <VStack space={2} padding={5}>
        <HStack justifyContent="space-between" my="2">
          <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
            Subtotal
          </Text>
          <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
            ₹ {subTotal ?? 0}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" mb="2">
          <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
            Shipping charges
          </Text>
          <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
            ₹ {shippingCharges ?? 0}
          </Text>
        </HStack>

        <Divider />
        <HStack justifyContent={'space-between'}>
          <Text variant={'subheader1'}>Total</Text>
          <Text variant={'subheader1'}>₹ {total ?? 0}</Text>
        </HStack>
      </VStack>
    </>
  );
};
