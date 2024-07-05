import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text} from 'native-base';
import {useRef, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import ResponsiveImage from '../../components/ResponsiveImage';
import {Slide, slides} from '../../constants/OnBoardingSlides';
import {RootStackParamList} from '../../navigations/types';
import theme from '../../themes/theme';
import onBoardingStyles from './styles';

type OnBoardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

type Props = {
  navigation: OnBoardingScreenNavigationProp;
};

function OnboardingScreen({navigation}: Props) {
  const swiperRef: any = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        dot={<View style={onBoardingStyles.dot} />}
        activeDot={<View style={onBoardingStyles.activeDot} />}>
        {slides.map((slide: Slide, index: number) => (
          <View key={slide.key} style={onBoardingStyles.slide}>
            <ResponsiveImage source={slide.image} alt={slide.title} />
            <View style={onBoardingStyles.textContainer}>
              <Text variant="heading">{slide.title}</Text>
              <Text variant={'body2'} style={onBoardingStyles.body}>
                {slide.description}
              </Text>
            </View>
            <View style={onBoardingStyles.buttonContainer}>
              <Button
                variant={'ghost'}
                onPress={handleSkip}
                _text={{
                  color: theme.colors.gray[900],
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
}

export default OnboardingScreen;
