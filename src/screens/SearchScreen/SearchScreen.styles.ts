import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const searchScreenStyles = StyleSheet.create({
  recentSearchContainer: {
    height: 46,
    width: 89,
    borderRadius: 25,
    borderColor: theme.colors.gray[500],
    color: theme.colors.black,
    padding: 5,
    marginRight: 10,
    borderWidth: 2,
    fontSize: 16,
  },

  categoryContainer: {
    backgroundColor: theme.colors.white,
    padding: 4,
    margin: 4,
    borderRadius: 10,
    width: 147,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  suggestedStoreItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: theme.colors.gray[30],
    gap: 5,
  },
  suggestedStoreImage: {
    width: 60,
    height: 50,
    borderRadius: 10,
    objectFit: 'contain',
  },
  categoryImage: {
    borderRadius: 10,
    objectFit: 'contain',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default searchScreenStyles;
