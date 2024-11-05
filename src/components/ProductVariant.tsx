import {Box, HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {ConfigurableVariant} from '../services/GGL-Queries/Products/Product.type';
import theme from '../themes/theme';
import QuantitySelector from './QuantitySelector';

function ProductVariant({
  variant,
  parentSku,
}: {
  variant: ConfigurableVariant;
  parentSku: string;
}) {
  const variantName = variant?.product?.name;
  const price =
    variant?.product?.price_range?.maximum_price?.final_price?.value;
  const sku = variant?.product?.sku;

  return (
    <>
      <HStack style={styles.container}>
        <HStack space={2} alignItems={'center'}>
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

        <Box style={styles.column}>
          <QuantitySelector
            productSku={parentSku}
            variantSku={sku}
            btnType={'regular'}
            productType={'ConfigurableProduct'}
            addType={'variantAdd'}
          />
        </Box>
      </HStack>
    </>
  );
}

export default ProductVariant;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#848282',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },

  column: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
});
