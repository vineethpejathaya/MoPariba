import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {useEffect, useState} from 'react';
import {ApolloWrapper} from '../../ApolloClient';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginAndRegistrations';
import EmailVerificationScreen from '../screens/LoginAndRegistrations/EmailVerification';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ReviewsScreen from '../screens/ProductReviews/ProductReviews';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import theme from '../themes/theme';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  const [isInitialLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [initialPage, setInitialPage] = useState<
    keyof RootStackParamList | null
  >(null);

  const checkForInitialPage = async () => {
    try {
      const isInitialLaunch = await AsyncStorage.getItem('isInitialLaunch');
      const userToken = await AsyncStorage.getItem('userToken');

      if (isInitialLaunch === null) {
        await AsyncStorage.setItem('isInitialLaunch', 'false');
        setInitialPage('Onboarding');
      } else {
        if (userToken === null) {
          setInitialPage('Login');
        } else {
          setInitialPage('Home');
        }
      }
    } catch (error) {
      console.error('Failed to load the initial launch state', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await checkForInitialPage();
    };
    initialize();
  }, []);

  if (initialPage === null) {
    return null;
  }

  return (
    <ApolloWrapper>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={initialPage}>
            <Stack.Screen name={'Login'} component={LoginScreen} />
            <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
            <Stack.Screen
              name={'ForgotPassword'}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name={'SignUp'} component={SignUpScreen} />
            <Stack.Screen
              name={'EmailVerification'}
              component={EmailVerificationScreen}
            />
            <Stack.Screen name={'Home'} component={HomeScreen} />
            <Stack.Screen name={'Profile'} component={ProfileScreen} />
            <Stack.Screen name={'Category'} component={CategoryScreen} />
            <Stack.Screen name={'Search'} component={SearchScreen} />
            <Stack.Screen name={'Product'} component={ProductScreen} />
            <Stack.Screen name={'Reviews'} component={ReviewsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloWrapper>
  );
}

export default AppNavigator;
