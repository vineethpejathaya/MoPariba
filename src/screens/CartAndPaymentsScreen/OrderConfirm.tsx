import {Button, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {ShoppingBagIcon} from '../../assets/icons/Icons';
import ScreenHeader from '../../components/ScreenHeader';
import theme from '../../themes/theme';

function OrderConfirm() {
  return (
    <>
      <ScreenHeader title={'Order Confirm'} />

      <VStack style={styles.container}>
        <ShoppingBagIcon />
        <Text style={styles.mainText}>Your order was successful !</Text>
        <Text style={styles.subText}>
          You will get a response within a few minutes.
        </Text>
      </VStack>
      <Button m={7}>Track Order</Button>
    </>
  );
}

export default OrderConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    margin: 'auto',
  },
  mainText: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  subText: {
    fontWeight: 500,
    fontSize: 15,
    lineHeight: 22.5,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: theme.colors.gray[700],
  },
});
