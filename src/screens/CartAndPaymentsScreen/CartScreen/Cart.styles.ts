import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';

const CartScreenStyles = StyleSheet.create({
  cartItemsContainer: {
    backgroundColor: theme.colors.white,

    borderRadius: 25,
  },
  cartReviewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 25,
    paddingBottom: 5,
  },
  cartReviewHeading: {
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    fontWeight: 700,
  },
  btn: {
    height: 40,
    borderRadius: 20,
  },
});

export default CartScreenStyles;
