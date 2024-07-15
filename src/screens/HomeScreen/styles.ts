import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const HomeScreenStyles = StyleSheet.create({
  container: {
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
});

export default HomeScreenStyles;
