import {useMutation} from '@apollo/client';
import {Button, HStack, Text, VStack} from 'native-base';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {GreenTick} from '../../../assets/icons/Icons';
import Card from '../../../components/Card';
import TextField from '../../../components/Forms/TextInput';
import {useCartStore} from '../../../hooks/UseCartStore';
import {
  APPLY_COUPON_TO_CART,
  REMOVE_COUPON_FROM_CART,
} from '../../../services/GGL-Queries/CustomerCart/Cart.mutation';
import theme from '../../../themes/theme';

function CouponSection({refetchCart}: {refetchCart: () => void}) {
  const {cartId, appliedCoupons, cartPrices, setCart} = useCartStore(
    state => state,
  );
  const [couponCode, setCouponCode] = useState<string>('');
  const totalDiscount =
    Array.isArray(cartPrices?.discounts) && cartPrices?.discounts?.length
      ? cartPrices?.discounts.reduce(
          (acc, curr) => acc + Number(curr?.amount?.value ?? 0),
          0,
        )
      : 0;
  const [applyCouponCode, {loading}] = useMutation(APPLY_COUPON_TO_CART, {
    onCompleted: res => {
      setCart(res?.applyCouponToCart?.cart);
    },
  });

  const [removeCouponFromCart, {loading: removingCoupon}] = useMutation(
    REMOVE_COUPON_FROM_CART,
    {
      onCompleted: res => {
        setCart(res?.removeCouponFromCart?.cart);
      },
    },
  );

  const handleApplyCoupon = () => {
    if (couponCode == '' || couponCode == null) return;
    applyCouponCode({
      variables: {
        cartId: cartId,
        couponCode: couponCode,
      },
    });
  };

  const handleRemoveCoupon = () => {
    removeCouponFromCart({
      variables: {
        input: {cart_id: cartId},
      },
    });
  };

  return (
    <>
      <Card>
        {appliedCoupons.length > 0 ? (
          <>
            <VStack space={2}>
              <HStack justifyContent={'space-between'}>
                <HStack space={4} alignItems={'center'}>
                  <GreenTick />
                  <VStack space={2}>
                    <Text style={styles.heading}>
                      You saved ₹ {totalDiscount} with{' '}
                    </Text>
                    <Text style={styles.heading}>
                      "{appliedCoupons[0]?.code}"
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  isLoading={removingCoupon}
                  _text={styles.removeCouponBtn}
                  onPress={handleRemoveCoupon}
                  variant={'unstyled'}>
                  Remove
                </Button>
              </HStack>
            </VStack>
          </>
        ) : (
          <VStack style={styles.container}>
            <HStack justifyContent="flex-start" alignItems="flex-end" space={2}>
              <TextField
                height={45}
                name={'coupon'}
                value={couponCode}
                inputStyles={{
                  backgroundColor: '#F5F8FA',
                  padding: 0,
                  height: 35,
                  paddingHorizontal: 10,
                }}
                onChangeText={e => {
                  setCouponCode(e);
                }}
                containerProps={{
                  style: {
                    width: '70%',
                  },
                }}
                placeholder="Enter coupon code"
              />

              <Button
                style={{minWidth: 100, height: 45, flex: 1}}
                isDisabled={!couponCode}
                isLoading={loading}
                spinnerPlacement="end"
                onPress={handleApplyCoupon}>
                Apply
              </Button>
            </HStack>
          </VStack>
        )}
      </Card>
    </>
  );
}
export default CouponSection;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },

  heading: {
    textAlign: 'left',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    fontWeight: 700,
  },

  removeCouponBtn: {
    fontSize: 14,
    color: theme.colors.rose[600],
    fontWeight: 900,
  },
});
