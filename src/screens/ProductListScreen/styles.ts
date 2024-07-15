import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const productListStyles = StyleSheet.create({
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    width: (Dimensions.get('window').width * 0.9) / 2,
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

export default productListStyles;
