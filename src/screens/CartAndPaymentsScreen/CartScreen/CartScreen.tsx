import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, HStack, ScrollView, Text, VStack} from 'native-base';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {CartBag, DeleteIcon} from '../../../assets/icons/Icons';
import NoDataIllustration from '../../../components/NoDataIllustration';
import PressableContainer from '../../../components/Pressable/PressableContainer';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {useCartStore} from '../../../hooks/UseCartStore';
import {NavigationProp} from '../../../navigations/types';
import {
  CLEAR_CUSTOMER_CART,
  GET_CUSTOMER_CART,
} from '../../../services/GGL-Queries/CustomerCart/Cart.queries';
import {
  CartItem,
  GetCustomerCartResponse,
} from '../../../services/GGL-Queries/CustomerCart/Cart.type';
import theme from '../../../themes/theme';
import CouponSection from '../components/CouponSection';
import ProductInCart from '../components/ProductInCart';
import CartScreenStyles from './Cart.styles';

function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {cartId, setCart, cartItems} = useCartStore(state => state);
  const {loading, error, data, refetch} = useQuery<GetCustomerCartResponse>(
    GET_CUSTOMER_CART,
    {
      variables: {cart_id: cartId},
      onCompleted: res => {
        setCart(res?.cart?.items);
      },
    },
  );
  const shippingCharges = 0;
  const totalItems = cartItems?.reduce((acc, curr) => curr.quantity + acc, 0);
  const subTotal = cartItems?.reduce(
    (acc, curr) => curr?.prices?.row_total_including_tax?.value + acc,
    0,
  );
  const total = subTotal + shippingCharges;

  const [clearCustomerCart] = useMutation(CLEAR_CUSTOMER_CART, {
    onCompleted: res => {
      setCart([]);
    },
    onError: err => {
      console.log(err, 'err');
    },
  });

  const handleClear = () => {
    clearCustomerCart({
      variables: {
        cartId: cartId,
      },
    });
  };

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

      {cartItems.length == 0 ? (
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
                      {cartItems?.map((cartItem: CartItem, index: number) => (
                        <ProductInCart key={index} cartItem={cartItem} />
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
            <Button
              style={CartScreenStyles.btn}
              onPress={() => navigation.navigate('AddressSelection')}
              _text={{fontSize: 15}}
              mx={5}>{`Proceed to Buy ( ${totalItems} items)`}</Button>
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
