import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const productStyles = StyleSheet.create({
  prize: {
    color: theme.colors.primary[500],
    fontSize: 18,
    lineHeight: 30,
  },
  text: {
    color: theme.colors.gray[900],
  },

  quantityContainer: {
    width: '100%',
    padding: 5,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    fontSize: 18,
    height: 60,
    width: '100%',
  },
});

export default productStyles;
