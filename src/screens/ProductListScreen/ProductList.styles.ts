import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const productListStyles = StyleSheet.create({
  // Product list screen main container
  mainContainer: {
    backgroundColor: theme.colors.white,
  },
  // Product list container
  productListContainer: {
    marginTop: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default productListStyles;
