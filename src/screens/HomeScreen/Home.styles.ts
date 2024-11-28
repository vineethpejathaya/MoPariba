import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const {width} = Dimensions.get('window');

const HomeScreenStyles = StyleSheet.create({
  // Home screen main container
  mainContainer: {
    backgroundColor: theme.colors.white,
  },

  // User greetings styles
  greetings: {
    fontFamily: 'Sen-Regular',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  greetings2: {
    fontFamily: 'Sen-Bold',
    fontWeight: 'bold',
  },
  // Banner Styles
  bannerContainer: {
    height: 120,
    marginTop: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: width * 0.9,
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },

  // Categories
  categoriesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 5,
  },
});

export default HomeScreenStyles;
