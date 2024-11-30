import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SpinnerComponent from '../../components/SpinnerComponent';
import {useCartStore} from '../../hooks/UseCartStore';
import usePayment from '../../hooks/UsePayment';

function PaymentLoadingScreen() {
  const {handleDeliverToAddress} = usePayment();
  const {shippingAddresses} = useCartStore(state => state);

  useEffect(() => {
    handleDeliverToAddress(shippingAddresses[0]);
  }, []);
  return (
    <View style={styles.container}>
      <SpinnerComponent onlySpinner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentLoadingScreen;
