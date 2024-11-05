import {Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';

function UserAddress({address}: {address: any}) {
  return (
    <>
      <VStack style={{padding: 5, width: '100%'}}>
        <Text style={styles.userName}>
          {address.firstname} {''}
          {address.lastname}
        </Text>
        <Text style={styles.address}>
          {address?.street?.slice(0, 2).join(',')}
        </Text>
        <Text style={styles.address}>
          {address.city},{address?.region?.region}, {address?.country_code},
          {address?.postcode}
        </Text>
        <Text style={styles.phone}>{address.telephone}</Text>
      </VStack>
    </>
  );
}

export default UserAddress;

const styles = StyleSheet.create({
  userName: {
    fontWeight: 700,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    lineHeight: 22,
  },
  address: {
    flexShrink: 1,

    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 400,
    lineHeight: 15,
    color: theme.colors.gray[700],
  },
  phone: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 15,
  },
});
