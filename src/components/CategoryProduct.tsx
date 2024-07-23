import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Badge, Box, Button, HStack, Image, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useCart} from '../hooks/UseCart';
import {RootStackParamList} from '../navigations/types';
import {transformCartItemsToMap} from '../services/utils';
import theme from '../themes/theme';
import FavoriteCheckbox from './FavoriteCheckBox';
import PressableContainer from './Pressable/PressableContainer';
import ProductOptions from './ProductOptions';
import QuantityButton from './QuantityButton';

type NavigationProp = StackNavigationProp<RootStackParamList>;

function CategoryProduct({product}: {product: any}) {
  const navigation = useNavigation<NavigationProp>();
  const {cart} = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log('product useEffect called');
    const map = transformCartItemsToMap(cart);
    const isProductInCart = map.has(product?.sku);
    const productInCart = map.get(product?.sku);
    const quantity = productInCart?.reduce(
      (acc: any, curr: any) => curr?.quantity + acc,
      0,
    );
    setQuantity(quantity);
    setIsProductInCart(isProductInCart);
  }, [cart, quantity, isProductInCart]);

  console.log(quantity, 'quantity');
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
          <Badge style={styles.discount} _text={styles.discText}>
            {'16%'}
          </Badge>
          <Badge style={styles.fav}>
            <FavoriteCheckbox iconSize={20} />
          </Badge>
          <VStack space={2}>
            <Image
              style={styles.image}
              source={{uri: product?.image?.url}}
              alt={product?.image?.label}
            />

            <Text variant="title1">{product?.name}</Text>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text variant="body2" style={styles.prize}>
                ₹{price ?? 0}
              </Text>
              {isProductInCart ? (
                <VStack alignItems={'center'} space={2}>
                  <QuantityButton quantity={quantity ?? 0} />
                  {product?.variants?.length > 0 && (
                    <ProductOptions
                      product={product}
                      btn={<Text variant={'body2'}>View Options</Text>}
                    />
                  )}
                </VStack>
              ) : (
                <>
                  {product?.variants?.length > 0 ? (
                    <ProductOptions product={product} />
                  ) : (
                    <Button
                      variant={'outline'}
                      _text={{fontSize: 12}}
                      style={{
                        height: 40,
                        width: 100,
                        alignSelf: 'flex-end',
                      }}>
                      Add
                    </Button>
                  )}
                </>
              )}
            </HStack>
          </VStack>
        </Box>
      </PressableContainer>
    </>
  );
}

export default CategoryProduct;

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    padding: 10,
  },
  discount: {
    backgroundColor: theme.colors.red[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  discText: {
    fontSize: 10,
    color: theme.colors.red[400],
  },
  fav: {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: '80%',
    height: 140,
    objectFit: 'contain',
    aspectRatio: 1,
  },

  imageContainer: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prize: {
    fontSize: 12,
  },
  weight: {
    fontSize: 12,
    color: theme.colors.gray[700],
  },
  addToCartBtn: {
    color: 'black',
  },
});
