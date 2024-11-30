import {useNavigation} from '@react-navigation/native';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '../navigations/types';
import {
  Product,
  ProductImage,
} from '../services/GGL-Queries/Products/Product.type';
import theme from '../themes/theme';
import PressableContainer from './Pressable/PressableContainer';
import ProductOptions from './ProductOptions';
import QuantitySelector from './QuantitySelector';

function CategoryProduct({product}: {product: Product}) {
  const navigation = useNavigation<NavigationProp>();
  const price = product?.price_range?.maximum_price?.final_price?.value;

  return (
    <>
      <PressableContainer
        onPress={() =>
          navigation.navigate('Product', {
            productSku: product?.sku,
          })
        }
        styles={{width: '50%'}}>
        <Box style={styles.container}>
          <VStack justifyContent={'space-between'} style={{flex: 1}}>
            <VStack space={4}>
              <ProductImageComponent productImage={product.image} />
              <Text style={styles.productText}>{product?.name}</Text>
            </VStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text style={styles.productText}>₹{price ?? 0}</Text>

              {product?.variants?.length > 0 ? (
                <ProductOptions product={product} />
              ) : (
                <QuantitySelector
                  productSku={product.sku}
                  productType={'SimpleProduct'}
                  btnType={'regular'}
                  addType={'simpleAdd'}
                />
              )}
            </HStack>
          </VStack>
        </Box>
      </PressableContainer>
    </>
  );
}

export default CategoryProduct;

const ProductImageComponent = ({
  productImage,
}: {
  productImage: ProductImage;
}) => {
  return (
    <Box style={styles.imageContainer}>
      {/* <Badge style={styles.discount} _text={styles.discText}>
        {'16% off'}
      </Badge> */}
      {productImage?.url && (
        <>
          <Image
            style={styles.image}
            source={{uri: productImage?.url}}
            alt={productImage?.label}
          />
        </>
      )}
    </Box>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 290,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    padding: 10,
    paddingHorizontal: 15,
  },

  discount: {
    borderTopLeftRadius: 15,
    backgroundColor: theme.colors.red[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  discText: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: theme.colors.red[400],
  },

  image: {
    objectFit: 'contain',
    aspectRatio: 1,
    borderRadius: 15,
  },

  imageContainer: {
    width: '100%',
    height: 175,
    margin: 'auto',
    borderRadius: 15,
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderColor: theme.colors.gray[700],
  },

  productText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    fontWeight: 700,
  },

  modalTitle: {
    fontFamily: 'DMSans-Bold',
    fontWeight: 700,
    fontSize: 18,
  },

  confirmContainer: {
    borderRadius: 10,
    padding: 10,
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
