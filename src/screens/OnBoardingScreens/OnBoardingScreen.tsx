import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text, Theme, useTheme} from 'native-base';
import {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const OnboardingScreen = ({navigation}: any) => {
  const swiperRef: any = useRef(null);
  const theme = useTheme();
  const styles = createStyles(theme);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      key: '1',
      title: 'Buy Grocery',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: require('../../assets/images/pngs/buy_grocery.png'),
    },
    {
      key: '2',
      title: 'Fast Delivery',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: require('../../assets/images/pngs/fast_delivery.png'),
    },
    {
      key: '3',
      title: 'Enjoy Quality Vegitable',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: require('../../assets/images/pngs/enjoy_quality.png'),
    },
  ];

  const handleSkip = () => {
    AsyncStorage.setItem('isInitialLaunch', 'false');
    navigation.navigate('Login');
  };

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      AsyncStorage.setItem('isInitialLaunch', 'false');
      navigation.navigate('Login');
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={index => setCurrentIndex(index)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {slides.map((slide, index) => (
          <View key={slide.key} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text variant="heading">{slide.title}</Text>
              <Text variant={'body2'} style={styles.body}>
                {slide.text}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                variant={'ghost'}
                onPress={handleSkip}
                _text={{
                  color: theme.colors.gray[600],
                }}>
                Skip
              </Button>
              <Button variant={'ghost'} onPress={handleNext}>
                {index === slides.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </View>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

export const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    body: {
      fontSize: 15,
      color: theme.colors.gray[900],
      lineHeight: 22.5,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      padding: 20,
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
  return styles;
};
