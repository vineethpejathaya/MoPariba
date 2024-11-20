import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, HStack, ScrollView, Text, VStack} from 'native-base';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {CartBag} from '../../../assets/icons/Icons';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {useCartStore} from '../../../hooks/UseCartStore';
import {NavigationProp} from '../../../navigations/types';
import {CLEAR_CUSTOMER_CART} from '../../../services/GGL-Queries/CustomerCart/Cart.mutation';
import {GET_CUSTOMER_CART} from '../../../services/GGL-Queries/CustomerCart/Cart.queries';
import {GetCustomerCartResponse} from '../../../services/GGL-Queries/CustomerCart/interfaces/Cart.type';
import {CartItem} from '../../../services/GGL-Queries/CustomerCart/interfaces/CartItem.type';
import theme from '../../../themes/theme';
import CouponSection from '../components/CouponSection';
import ProductInCart from '../components/ProductInCart';
import CartScreenStyles from './Cart.styles';

function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    cartId,
    setCart,
    cartItems,
    setAppliedCoupons,
    setCartPrice,
    setShippingAddresses,
  } = useCartStore(state => state);
  const {loading, error, data, refetch} = useQuery<GetCustomerCartResponse>(
    GET_CUSTOMER_CART,
    {
      variables: {cart_id: cartId},
      onCompleted: res => {
        const appliedCoupons = res?.cart?.applied_coupons;
        const addresses = res?.cart?.shipping_addresses;
        setCart(res?.cart?.items);
        setCartPrice(res?.cart?.prices);
        setAppliedCoupons(appliedCoupons ? appliedCoupons : []);
        setShippingAddresses(addresses);
      },
    },
  );

  const totalItems = cartItems?.reduce((acc, curr) => curr.quantity + acc, 0);

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
                {/* <PressableContainer onPress={() => {}}>
                  <HStack space={2} alignItems={'center'}>
                    <Text
                      style={CartScreenStyles.cartReviewHeading}
                      fontSize={'sm'}
                      onPress={handleClear}>
                      Clear cart
                    </Text>
                    <DeleteIcon />
                  </HStack>
                </PressableContainer> */}
              </HStack>

              <VStack height={Dimensions.get('window').height * 0.35}>
                <ScrollView flex={1}>
                  <VStack>
                    {cartItems?.map((cartItem: CartItem, index: number) => (
                      <ProductInCart key={index} cartItem={cartItem} />
                    ))}
                  </VStack>
                </ScrollView>
              </VStack>
            </VStack>
            <CouponSection refetchCart={refetch} />
            <CartSummary />
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

const CartSummary = () => {
  const {cartPrices, shippingAddresses} = useCartStore(state => state);

  const shippingCharges =
    shippingAddresses?.reduce(
      (acc, curr) => acc + curr?.selected_shipping_method?.amount?.value,
      0,
    ) ?? 0;
  const appliedTaxes = cartPrices?.applied_taxes;
  const subTotalInclusiveOfTax = cartPrices?.subtotal_including_tax?.value;

  const subTotalExclusiveOfTax = cartPrices?.subtotal_excluding_tax?.value;

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
      <VStack space={1} paddingX={5}>
        <LabelValue label={'Subtotal'} value={`₹ ${subTotal || 0}`} />
        <LabelValue
          label={'Shipping charges'}
          value={`₹ ${shippingCharges || 0}`}
        />

        <LabelValue label={'Platform Fees'} value={` ₹ ${platFormFees}`} />

        <LabelValue label={'Applied Taxes'} value={`₹ ${0 || 0}`} />
        {totalDiscount > 0 && (
          <LabelValue label={'Discount'} value={`- ₹ ${totalDiscount}`} />
        )}

        <Divider />
        <HStack justifyContent={'space-between'}>
          <Text variant={'subheader1'}>Total</Text>
          <Text variant={'subheader1'}>₹ {grandTotal || 0}</Text>
        </HStack>
      </VStack>
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
