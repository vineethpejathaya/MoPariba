import {useMutation} from '@apollo/client';
import {Box, Button, FlatList, HStack, Text, VStack} from 'native-base';
import {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import TextField from '../../../components/Forms/TextInput';
import {useCartStore} from '../../../hooks/UseCartStore';
import {APPLY_COUPON_TO_CART} from '../../../services/GGL-Queries/CustomerCart/Cart.mutation';
import theme from '../../../themes/theme';

function CouponSection({refetchCart}: {refetchCart: () => void}) {
  const {cartId, appliedCoupons} = useCartStore(state => state);
  const [couponCode, setCouponCode] = useState<string>('');

  const [applyCouponCode, {loading}] = useMutation(APPLY_COUPON_TO_CART, {
    onCompleted: res => {
      refetchCart();
      console.log(res, 'res');
    },
    onError: err => {},
  });
  const handleApplyCoupon = () => {
    if (couponCode == '' || couponCode == null) return;
    applyCouponCode({
      variables: {
        cartId: cartId,
        couponCode: couponCode,
      },
    });
  };

  return (
    <>
      <Box bg="white" borderRadius="md" shadow={1}>
        <VStack style={styles.container}>
          <HStack justifyContent="flex-start" alignItems="flex-end" space={2}>
            <TextField
              label={''}
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
          <VStack space={2}>
            {appliedCoupons.length > 0 && (
              <>
                <Text style={styles.heading}>Applied Coupons</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={appliedCoupons}
                  renderItem={({item}: any) => (
                    <Box style={styles.couponCard}>
                      <Text
                        color="red.500"
                        fontWeight="bold"
                        textAlign={'center'}>
                        {item}
                      </Text>
                    </Box>
                  )}
                  keyExtractor={(item: any) => item}
                />
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </>
  );
}
export default CouponSection;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    paddingHorizontal: 10,
  },

  couponCard: {
    width: Dimensions.get('window').width * 0.4,
    marginRight: 10,
    backgroundColor: '#F9F9F9',
    height: 65,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  heading: {
    textAlign: 'left',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    fontWeight: 700,
  },
});
