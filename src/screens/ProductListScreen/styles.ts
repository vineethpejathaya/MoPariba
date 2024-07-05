import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const productListStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 10,
    width: (Dimensions.get('window').width * 0.9) / 2,
    padding: 2,
  },

  new: {
    borderColor: theme.colors.primary[100],
    width: 38,
    height: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  favorite: {
    borderColor: 'red.400',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  discount: {
    borderColor: 'red.400',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  image: {
    height: 94,
    objectFit: 'contain',
  },
  prize: {
    fontSize: 12,
    color: theme.colors.primary[700],
  },
  weight: {
    fontSize: 12,
    color: theme.colors.gray[700],
  },
  addToCartBtn: {
    color: 'black',
  },
});

export default productListStyles;
