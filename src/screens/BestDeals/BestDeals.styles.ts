import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const bestDealsStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.white,
    marginTop: 3,
    paddingBottom: 0,
  },
  productListContainer: {
    marginTop: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default bestDealsStyles;
