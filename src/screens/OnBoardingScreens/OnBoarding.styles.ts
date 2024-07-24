import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/theme';

const onBoardingStyles = StyleSheet.create({
  body: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.gray[900],
    lineHeight: 22.5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 25,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 380,
    marginBottom: 40,
  },

  dot: {
    backgroundColor: theme.colors.gray[100],
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: theme.colors.primary[700],
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  textContainer: {
    padding: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
});

export default onBoardingStyles;
