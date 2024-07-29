import {Box, HStack, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';

const coupons = [
  {
    discount: 'FLAT ₹125 OFF',
    message: 'USE FLAT DEAL | ABOVE ₹249',
  },
  {
    discount: '40% OFF UPTO ₹100',
    message: 'USE GUILT FREE | ON SELECT ITEMS',
  },
];

function CouponSection() {
  return (
    <>
      <VStack style={styles.container}>
        <HStack justifyContent="space-between" alignItems="center">
          {coupons?.map((coupon: any, index: number) => (
            <Box key={index} style={styles.couponCard}>
              <Text fontWeight="bold" color="orange.500">
                {coupon.discount}
              </Text>
              <Text fontSize="xs">{coupon.message}</Text>
            </Box>
          ))}
        </HStack>
        <Box alignItems="center" my="2">
          <Text color="red.500" fontWeight="bold">
            Free delivery on orders above ₹149
          </Text>
        </Box>
      </VStack>
    </>
  );
}
export default CouponSection;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    padding: 10,
  },

  couponCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    height: 70,
    borderRadius: 10,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
