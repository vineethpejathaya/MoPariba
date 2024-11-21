import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CartBag} from '../../../assets/icons/Icons';
import ModalButton from '../../../components/ModalButton';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {bottomNavigatorHeight} from '../../../constants/config';
import {useCartStore} from '../../../hooks/UseCartStore';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import usePayment from '../../../hooks/UsePayment';
import {NavigationProp} from '../../../navigations/types';
import {GET_CUSTOMER_CART} from '../../../services/GGL-Queries/CustomerCart/Cart.queries';
import {ShippingAddress} from '../../../services/GGL-Queries/CustomerCart/interfaces/BillingAndShippingAddress.type';
import {GetCustomerCartResponse} from '../../../services/GGL-Queries/CustomerCart/interfaces/Cart.type';
import {CartItem} from '../../../services/GGL-Queries/CustomerCart/interfaces/CartItem.type';
import theme from '../../../themes/theme';
import {LabelValuePair} from '../../UserProfileAndSettings/MyOrdersScreen/OrderSummaryScreen';
import AddressSelection from '../AddressSelection';
import CouponSection from '../components/CouponSection';
import ProductInCart from '../components/ProductInCart';
import CartScreenStyles from './Cart.styles';

function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {cartId, setCart, cartItems} = useCartStore(state => state);
  const {customer, selectedAddress} = useCustomerStore();
  const {isLoading, setCustomerPaymentAddress, handleDeliverToAddress} =
    usePayment();
  const totalItems = cartItems?.reduce((acc, curr) => curr.quantity + acc, 0);
  const {loading, error, data, refetch} = useQuery<GetCustomerCartResponse>(
    GET_CUSTOMER_CART,
    {
      variables: {cart_id: cartId},
      onCompleted: res => {
        setCart(res?.cart);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  const shippingAddress = data?.cart.shipping_addresses[0] || null;

  useEffect(() => {
    if (customer?.addresses?.length) {
      const defaultAddress = customer?.addresses?.find(
        item => item.default_shipping,
      );
      if (defaultAddress) {
        setCustomerPaymentAddress(defaultAddress?.id);
      }
    }
  }, [shippingAddress, customer?.addresses, data]);

  if (loading || isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader
        hStackProps={{shadow: 3}}
        leftActions={[<Text variant={'subheader1'}>My Cart</Text>]}
      />
      <VStack
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flex: 1,
          paddingBottom: bottomNavigatorHeight + 80,
        }}>
        <ScrollView>
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

                {selectedAddress && (
                  <>
                    <DeliveryAddress address={shippingAddress} />
                  </>
                )}
                <Box p="4" bg="white" borderRadius="lg" shadow="1">
                  <VStack justifyContent="space-between">
                    <HStack
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text fontSize="md" bold>
                        Select payment method
                      </Text>

                      <Icon
                        name="chevron-right"
                        size={25}
                        color={theme.colors.gray[900]}
                        style={{marginLeft: 'auto'}}
                        onPress={() =>
                          navigation.navigate('PaymentMethodScreen')
                        }
                      />
                    </HStack>
                    <Divider />
                    <VStack>
                      <Text>Razorpay</Text>
                    </VStack>
                  </VStack>
                </Box>
              </VStack>
            </>
          )}
        </ScrollView>
      </VStack>
      {totalItems > 0 && (
        <Box
          position="absolute"
          bottom={60}
          left={0}
          right={0}
          bg="white"
          p={4}
          shadow={5}
          borderTopWidth={1}
          borderTopColor="gray.200">
          {selectedAddress ? (
            <Button
              style={CartScreenStyles.btn}
              onPress={() => handleDeliverToAddress(shippingAddress)}
              _text={{fontSize: 15}}
              mx={5}>{`Proceed to Buy ( ${totalItems} items)`}</Button>
          ) : (
            <ModalButton
              anchor={({open}) => (
                <Button onPress={open}>Select Address</Button>
              )}
              title="Select an address"
              content={({close}) => <AddressSelection close={close} />}
            />
          )}
        </Box>
      )}
    </>
  );
}

export default CartScreen;

const DeliveryAddress = ({address}: {address: ShippingAddress | null}) => {
  if (!address) return null;
  return (
    <>
      <Box p="4" bg="white" borderRadius="lg" shadow="1">
        <VStack justifyContent="space-between">
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize="md" bold>
              Delivery at
            </Text>
            <ModalButton
              anchor={({open}) => (
                <Icon
                  name="chevron-right"
                  size={25}
                  color={theme.colors.gray[900]}
                  style={{marginLeft: 'auto'}}
                  onPress={open}
                />
              )}
              title="Select an address"
              content={({close}) => <AddressSelection close={close} />}
            />
          </HStack>
          <Divider />
          <VStack space={2} mt={2}>
            <LabelValuePair
              label={'Name'}
              value={`${address?.firstname} ${address?.lastname}`}
            />
            <LabelValuePair
              label={'Address'}
              value={`${address?.street?.join(', ')}\n ${address?.city}`}
            />
            <LabelValuePair label={'Zipcode'} value={`${address?.postcode}`} />
          </VStack>
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
