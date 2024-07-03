import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const productListStyles = StyleSheet.create({
  container: {
    width: '50%',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 20,
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
