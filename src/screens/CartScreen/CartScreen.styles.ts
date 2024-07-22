import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const CartScreenStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingBottom: 70,
  },
  cartReviewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  cartReviewHeading: {
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    fontWeight: 700,
  },
});

export default CartScreenStyles;
