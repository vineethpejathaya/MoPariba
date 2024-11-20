import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useEffect} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CartBag} from '../../../assets/icons/Icons';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenContent from '../../../components/ScreenContent';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {useCartStore} from '../../../hooks/UseCartStore';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import {NavigationProp} from '../../../navigations/types';
import {GET_CUSTOMER_CART} from '../../../services/GGL-Queries/CustomerCart/Cart.queries';
import {GetCustomerCartResponse} from '../../../services/GGL-Queries/CustomerCart/interfaces/Cart.type';
import {CartItem} from '../../../services/GGL-Queries/CustomerCart/interfaces/CartItem.type';
import theme from '../../../themes/theme';
import CouponSection from '../components/CouponSection';
import ProductInCart from '../components/ProductInCart';

function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {cartId, setCart, cartItems} = useCartStore(state => state);
  const {customer} = useCustomerStore();

  const {loading, error, data, refetch} = useQuery<GetCustomerCartResponse>(
    GET_CUSTOMER_CART,
    {
      variables: {cart_id: cartId},
      onCompleted: res => {
        setCart(res?.cart);
      },
    },
  );

  const totalItems = cartItems?.reduce((acc, curr) => curr.quantity + acc, 0);

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
      <ScreenContent containerStyles={{paddingTop: 10}}>
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
            <VStack space={2}>
              <Box bg="white" borderRadius="md" shadow={1}>
                {cartItems?.map((cartItem: CartItem, index: number) => (
                  <ProductInCart key={index} cartItem={cartItem} />
                ))}
              </Box>

              <CouponSection refetchCart={refetch} />

              <CartSummary />
              {customer &&
                customer?.addresses?.length &&
                customer.defaultAddress && (
                  <>
                    <DeliveryAddress />
                  </>
                )}

              {/* <Button
                style={CartScreenStyles.btn}
                onPress={() => navigation.navigate('AddressSelection')}
                _text={{fontSize: 15}}
                mx={5}>{`Proceed to Buy ( ${totalItems} items)`}</Button> */}
            </VStack>
          </>
        )}
      </ScreenContent>
    </>
  );
}

export default CartScreen;

const DeliveryAddress = () => {
  return (
    <>
      <Box p="4" bg="white" borderRadius="lg" shadow="1">
        <VStack justifyContent="space-between">
          <HStack justifyContent={'space-between'}>
            <Text fontSize="md" bold>
              Delivery at
            </Text>
            <Pressable onPress={() => {}}>
              <Icon
                name="chevron-right"
                size={25}
                color={theme.colors.gray[900]}
                style={{marginLeft: 'auto'}}
              />
            </Pressable>
          </HStack>
          <Divider />
        </VStack>
      </Box>
    </>
  );
};

const CartSummary = () => {
  const {cartPrices, shippingAddresses} = useCartStore(state => state);

  const shippingCharges =
    shippingAddresses?.reduce(
      (acc, curr) => acc + curr?.selected_shipping_method?.amount?.value,
      0,
    ) ?? 0;

  const subTotal = cartPrices?.subtotal_excluding_tax?.value;
  const totalDiscount =
    Array.isArray(cartPrices?.discounts) && cartPrices?.discounts?.length
      ? cartPrices?.discounts.reduce(
          (acc, curr) => acc + Number(curr?.amount?.value ?? 0),
          0,
        )
      : 0;

  const platFormFees = cartPrices?.platform_fee?.amount?.value;
  const grandTotal = cartPrices?.grand_total?.value ?? 0;

  return (
    <>
      <Box bg="white" borderRadius="md" shadow={1} padding={4}>
        <VStack space={1}>
          <LabelValue label={'Subtotal'} value={`₹ ${subTotal || 0}`} />
          <LabelValue
            label={'Shipping charges'}
            value={`₹ ${shippingCharges || 0}`}
          />
          <LabelValue label={'Platform Fees'} value={` ₹ ${platFormFees}`} />

          {totalDiscount > 0 && (
            <LabelValue label={'Discount'} value={`- ₹ ${totalDiscount}`} />
          )}

          <Divider />
          <HStack justifyContent={'space-between'}>
            <Text variant={'subheader1'}>Total</Text>
            <Text variant={'subheader1'}>₹ {grandTotal || 0}</Text>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

const LabelValue = ({label, value}: {label: string; value: string}) => {
  if (value == null || value === '') return null;

  return (
    <>
      <HStack justifyContent="space-between" mb="2">
        <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
          {label}
        </Text>
        <Text variant={'body1'} style={{color: theme.colors.gray[900]}}>
          {value}
        </Text>
      </HStack>
    </>
  );
};
