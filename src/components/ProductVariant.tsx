import {useMutation} from '@apollo/client';
import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useCart} from '../hooks/UseCart';
import {ADD_CONFIGURABLE_PRODUCTS_TO_CART} from '../services/ggl-queries/cart';
import theme from '../themes/theme';

function ProductVariant({
  variant,
  parentSku,
}: {
  variant: any;
  parentSku?: string;
}) {
  const [qnt, setQnt] = useState(0);
  const {cartId, setCartId} = useCart();
  const variantName = variant?.product?.name;
  const price =
    variant?.product?.price_range?.maximum_price?.final_price?.value?.value;
  const sku = variant?.product?.sku;

  const [addToCart, {loading, error, data}] = useMutation(
    ADD_CONFIGURABLE_PRODUCTS_TO_CART,
    {
      onCompleted: res => {
        setQnt(prev => prev++);
      },
    },
  );
  return (
    <>
      <HStack style={styles.container}>
        <HStack alignItems={'center'} space={2}>
          <Box style={styles.imageContainer}>
            {variant?.product?.image?.url && (
              <Image
                source={{uri: `${variant?.product?.image?.url}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={variant?.product?.image?.label}
              />
            )}
          </Box>
          <VStack>
            <Text variant="body2" fontSize={'sm'}>
              {variantName ?? '--'}
            </Text>
            <Text variant="body2" fontSize={'sm'}>
              ₹{price ?? 0}
            </Text>
          </VStack>
        </HStack>
        <Button
          onPress={() => {
            addToCart({
              variables: {
                cartId: cartId,
                cartItems: [
                  {
                    parent_sku: parentSku,
                    data: {
                      quantity: 1,
                      sku: sku,
                    },
                  },
                ],
              },
            });
          }}
          variant={'ghost'}
          _text={styles.btnText}
          style={styles.btn}>
          ADD
        </Button>
      </HStack>
    </>
  );
}

export default ProductVariant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 40,
    width: 40,
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
