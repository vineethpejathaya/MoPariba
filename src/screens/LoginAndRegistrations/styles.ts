import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  inputHeader: {
    fontFamily: 'Sen-Medium',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkBox: {
    marginRight: 8,
    width: 16,
    height: 16,
  },

  signUpContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
});
