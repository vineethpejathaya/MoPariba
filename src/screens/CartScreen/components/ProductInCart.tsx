import {HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import QuantityButton from '../../../components/QuantityButton';
import {CartItem} from '../../../services/GGL-Queries/CustomerCart/Cart.types';
import theme from '../../../themes/theme';

function ProductInCart({cartItem}: {cartItem: CartItem}) {
  const price = cartItem?.prices?.row_total_including_tax?.value;
  const parentSku = cartItem?.product?.sku;
  const sku = cartItem?.configured_variant?.sku ?? '';

  return (
    <HStack style={styles.container}>
      <HStack alignItems="center" space={4}>
        <Image
          source={{uri: `${cartItem?.product?.image?.url}`}}
          alt={cartItem?.product?.image?.label ?? 'Product Image'}
          size="sm"
        />
        <VStack>
          <Text
            variant={'title2'}
            fontSize="md"
            bold
            numberOfLines={1}
            ellipsizeMode="tail">
            {cartItem?.product?.name ?? '--'}
          </Text>
          <Text variant={'title2'} fontSize="sm">
            ₹{price ?? 0}
          </Text>
        </VStack>
      </HStack>
      <QuantityButton isNative={false} parentSku={parentSku} sku={sku} />
    </HStack>
  );
}

export default ProductInCart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[300],
    borderBottomWidth: 1,
  },
  imageContainer: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 700,
  },
  btn: {
    height: 40,
    width: 100,
  },
});
