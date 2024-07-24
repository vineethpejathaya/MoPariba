import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {useCartStore} from '../hooks/UseCartStore';
import {getVariantFromCart, transformCartItemsToMap} from '../services/utils';
import theme from '../themes/theme';
import QuantityButton from './QuantityButton';

function ProductVariant({
  variant,
  parentSku,
}: {
  variant: any;
  parentSku?: string;
}) {
  const {cartId, setCart, cart} = useCartStore(state => state);

  let variantInCart: {id: any; quantity: any} | undefined = undefined;
  const map = transformCartItemsToMap(cart);

  const productInCart = map.get(parentSku);
  variantInCart = productInCart?.length
    ? getVariantFromCart(variant, productInCart)
    : undefined;

  const variantName = variant?.product?.name;
  const price =
    variant?.product?.price_range?.maximum_price?.final_price?.value;
  const sku = variant?.product?.sku;

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
        {variantInCart ? (
          <>
            <QuantityButton
              quantity={variantInCart?.quantity ?? 0}
              parentSku={parentSku}
              sku={sku}
            />
          </>
        ) : (
          <Button
            onPress={() => {}}
            variant={'ghost'}
            _text={styles.btnText}
            style={styles.btn}>
            ADD
          </Button>
        )}
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
