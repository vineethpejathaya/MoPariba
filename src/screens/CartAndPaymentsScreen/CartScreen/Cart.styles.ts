import {Dimensions, StyleSheet} from 'react-native';
import {bottomNavigatorHeight} from '../../../constants/config';
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

  cartOverlay: {
    position: 'absolute',
    height: bottomNavigatorHeight,
    left: 0,
    right: 0,
    top: Dimensions.get('window').height * 0.1,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
});

export default CartScreenStyles;
