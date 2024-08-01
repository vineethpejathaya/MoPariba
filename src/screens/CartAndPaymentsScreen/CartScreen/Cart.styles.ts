import {StyleSheet} from 'react-native';
import {bottomNavigatorHeight} from '../../../constants/config';
import theme from '../../../themes/theme';

const CartScreenStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingBottom: bottomNavigatorHeight + 10,
    justifyContent: 'space-between',
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
  btn: {
    height: 40,
    borderRadius: 20,
  },
});

export default CartScreenStyles;
