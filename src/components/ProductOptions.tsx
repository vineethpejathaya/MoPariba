import {Button, Center, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useCartStore} from '../hooks/UseCartStore';
import {transformCartItemsToMap} from '../services/utils';
import theme from '../themes/theme';
import ModalButton from './ModalButton';
import PressableContainer from './Pressable/PressableContainer';
import ProductVariant from './ProductVariant';

function ProductOptions({product}: any) {
  const {cartItems} = useCartStore(state => state);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const totalOptions = product?.variants?.length;

  useEffect(() => {
    const map = transformCartItemsToMap(cartItems);
    const isProductInCart = map.has(product?.sku);
    const productInCart = map.get(product?.sku);
    const quantity = productInCart?.reduce(
      (acc: any, curr: any) => curr?.quantity + acc,
      0,
    );
    setQuantity(quantity);
    setIsProductInCart(isProductInCart);
  }, [cartItems, quantity, isProductInCart]);

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
              <Button
                variant={'outline'}
                _text={styles.btnText}
                style={styles.btn}
                onPress={open}>
                {`${totalOptions ?? 0} options`}
              </Button>
            )}
          </>
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
    height: 35,
    width: 100,
    padding: 1,
    borderColor: theme.colors.gray[700],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 3,
  },
  btnText: {
    fontSize: 12,
    lineHeight: 12,
  },

  qtnContainer: {
    gap: 4,
    alignItems: 'center',

    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[700],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 3,
    width: 70,
    height: 35,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  qtnText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    fontWeight: 900,
    color: theme.colors.primary[800],
  },
});
