import {Button, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {useCart} from '../hooks/UseCart';
import ModalButton from './ModalButton';
import ProductVariant from './ProductVariant';

function ProductOptions({product}: any) {
  const {cartId, setCartId, addToCart, cart, setCart} = useCart();
  const sku = product?.sku;
  const cartItem = cart?.find(item => item?.product?.sku == sku);
  const totalOptions = product?.variants?.length;
  return (
    <>
      <ModalButton
        anchor={({open}) => (
          <Button
            variant={'outline'}
            _text={{fontSize: 12}}
            style={styles.btn}
            onPress={open}>
            {`${totalOptions ?? 0} options`}
          </Button>
        )}
        content={({close}) => (
          <>
            <VStack space={3}>
              <Text variant={'subheader2'}>{product?.name}</Text>
              {product?.variants?.map((variant: any, index: number) => (
                <ProductVariant
                  key={index}
                  variant={variant}
                  parentSku={product.sku}
                />
              ))}
            </VStack>
          </>
        )}
      />
    </>
  );
}
export default ProductOptions;

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 100,
  },
});
