import {
  AddIcon,
  Badge,
  Box,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import {ImageSourcePropType, ImageURISource, StyleSheet} from 'react-native';
import theme from '../themes/theme';

function ProductCard({
  imgSource,
  discount,
  title,
  price,
  originalPrice,
}: {
  imgSource: ImageSourcePropType | ImageURISource | string;
  discount: number;
  title: string;
  price: number;
  originalPrice: number;
}) {
  const imageSource =
    typeof imgSource === 'string' ? {uri: imgSource} : imgSource;
  return (
    <>
      <VStack style={styles.container}>
        <Badge style={styles.badge} _text={styles.badgeText}>
          {`${discount} % Off`}
        </Badge>
        <Image
          source={imageSource}
          alt="Product Image"
          style={styles.image}
          fallbackElement={<Box style={styles.image}></Box>}
        />
        <IconButton
          style={styles.addBtn}
          icon={<AddIcon size={5} color={theme.colors.white} />}
        />
        <VStack space={1}>
          <Text style={styles.price}>{price}rs</Text>
          <Text style={styles.originalPrice}>
            {originalPrice}rs{' '}
            <Text style={styles.badgeText}>{`${discount} % Off`}</Text>
          </Text>
          <Text fontSize="sm">{title}</Text>
        </VStack>
      </VStack>
    </>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
    height: 214,
    padding: 10,
    justifyContent: 'space-between',
    borderColor: theme.colors.gray[100],
  },

  image: {
    width: '100%',
    height: 96,
    resizeMode: 'contain',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: '#1B1C1E7A',
    fontSize: 12,
  },
  price: {
    color: '#FF324B',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addBtn: {
    backgroundColor: theme.colors.blue[500],
    borderRadius: 20,
    position: 'absolute',
    width: 36,
    height: 36,
    bottom: 90,
    right: 20,
    zIndex: 1,
  },
  badge: {
    width: '30%',
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.blue[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.blue[500],
  },
});
