import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../../themes/theme';

const AddressSelectionStyles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    marginTop: 10,
  },
  mainContainer: {
    width: Dimensions.get('window').width * 0.95,
    margin: 'auto',
    marginTop: 10,
  },
  addressesContainer: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },

  addressCardContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 10,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.gray[700],
    padding: 20,
  },

  addressSelected: {
    borderWidth: 1,
    borderColor: theme.colors.blue[500],
    borderRadius: 10,
    padding: 10,
  },
  Btn: {
    backgroundColor: '#FFD700',
    height: 40,
    borderRadius: 20,
  },
  btnTxt: {
    fontSize: 14,
    color: theme.colors.black,
    fontWeight: 400,
  },
  secBtn: {
    backgroundColor: theme.colors.white,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  secBtnTxt: {
    fontSize: 12,
    color: theme.colors.black,
    fontWeight: 400,
  },
});

export default AddressSelectionStyles;
