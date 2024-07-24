import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Badge, Box, Button, HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigations/types';
import theme from '../themes/theme';
import FavoriteCheckbox from './FavoriteCheckBox';
import PressableContainer from './Pressable/PressableContainer';
import ProductOptions from './ProductOptions';

type NavigationProp = StackNavigationProp<RootStackParamList>;

function CategoryProduct({product}: {product: any}) {
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
            <VStack space={2}>
              <ProductImage product={product} />
              <Text variant="title1">{product?.name}</Text>
            </VStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text variant="body2" style={styles.prize}>
                ₹{price ?? 0}
              </Text>

              {product?.variants?.length > 0 ? (
                <ProductOptions product={product} />
              ) : (
                <Button
                  variant={'outline'}
                  _text={{fontSize: 10, lineHeight: 10}}
                  style={{
                    height: 35,
                    width: 100,
                    alignSelf: 'flex-end',
                  }}>
                  Add
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </PressableContainer>
    </>
  );
}

export default CategoryProduct;

const ProductImage = ({product}: {product: any}) => {
  return (
    <Box style={styles.imageContainer}>
      <Badge style={styles.discount} _text={styles.discText}>
        {'16% off'}
      </Badge>
      <Image
        style={styles.image}
        source={{uri: product?.image?.url}}
        alt={product?.image?.label}
      />
      <Badge style={styles.fav}>
        <FavoriteCheckbox iconSize={20} />
      </Badge>
    </Box>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 350,
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

  fav: {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },

  image: {
    objectFit: 'contain',
    aspectRatio: 1,
  },

  imageContainer: {
    width: '100%',
    height: 175,
    margin: 'auto',
    borderRadius: 15,
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 1,
  },

  prize: {
    fontSize: 12,
  },
});
