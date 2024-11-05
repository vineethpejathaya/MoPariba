import {
  Box,
  Button,
  Center,
  ChevronDownIcon,
  FlatList,
  HStack,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useCartStore} from '../hooks/UseCartStore';
import {Product} from '../services/GGL-Queries/Products/Product.type';
import theme from '../themes/theme';
import ModalButton from './ModalButton';
import PressableContainer from './Pressable/PressableContainer';
import ProductVariant from './ProductVariant';

function ProductOptions({product}: {product: Product}) {
  const {cartItems, findByProductSku, checkProductExists} = useCartStore(
    state => state,
  );
  const isProductInCart = checkProductExists(product?.sku);
  const productListByProductSku = findByProductSku(product.sku);
  const totalSelectedPrice = productListByProductSku?.reduce(
    (acc, curr) => curr.totalPrice + acc,
    0,
  );
  const quantity = productListByProductSku?.reduce(
    (acc: any, curr: any) => curr?.quantity + acc,
    0,
  );

  const totalOptions = product?.variants?.length;

  return (
    <>
      <ModalButton
        anchor={({open}) => (
          <>
            {isProductInCart ? (
              <PressableContainer onPress={open}>
                <HStack style={styles.qtnContainer}>
                  <FontAwesomeIcon name={'minus'} size={10} color={'green'} />
                  <Center>
                    <Text style={styles.qtnText}>{quantity}</Text>
                  </Center>
                  <FontAwesomeIcon name={'plus'} size={10} color={'green'} />
                </HStack>
              </PressableContainer>
            ) : (
              <PressableContainer onPress={open}>
                <Button
                  variant={'outline'}
                  _text={styles.btnText}
                  style={styles.btn}
                  rightIcon={<ChevronDownIcon size={3} />}
                  onPress={open}>
                  {`${totalOptions ?? 0} options`}
                </Button>
              </PressableContainer>
            )}
          </>
        )}
        title={product.name ?? ''}
        content={({close}) => (
          <>
            <VStack space={2}>
              <Box maxHeight={350}>
                <FlatList
                  data={product?.variants}
                  ItemSeparatorComponent={() => <Box height={2} />}
                  renderItem={({item, index}) => (
                    <ProductVariant variant={item} parentSku={product.sku} />
                  )}
                  keyExtractor={(item: any) => item.product?.uid}
                />
              </Box>
              <PressableContainer onPress={close}>
                <HStack style={styles.confirmContainer}>
                  <Text style={styles.confirmText}>
                    Item total: ₹ {totalSelectedPrice ?? 0}
                  </Text>
                  <Text style={styles.confirmText}>Confirm</Text>
                </HStack>
              </PressableContainer>
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
    height: 35,
    width: 100,
    padding: 1,
    borderColor: theme.colors.gray[700],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'DMSans-Bold',
    color: theme.colors.primary[900],
  },

  qtnContainer: {
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[600],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    width: 100,
    height: 35,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  qtnText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    fontWeight: 900,
    color: theme.colors.primary[900],
  },

  confirmContainer: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[800],
  },
  confirmText: {
    fontSize: 14,
    fontWeight: 700,
    color: theme.colors.white,
  },
});
