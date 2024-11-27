import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const ProductStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: 15,
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 3,
  },

  discount: {
    height: '10%',
    width: '15%',
    borderTopLeftRadius: 15,
    backgroundColor: theme.colors.red[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  discText: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.colors.red[400],
  },

  image: {
    objectFit: 'contain',
    aspectRatio: 1,
  },

  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: Dimensions.get('window').height * 0.45,
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
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 30,
  },
});

export default ProductStyles;
