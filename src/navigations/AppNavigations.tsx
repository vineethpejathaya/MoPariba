import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {useEffect, useState} from 'react';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginAndRegistrations';
import EmailVerificationScreen from '../screens/LoginAndRegistrations/EmailVerification';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import theme from '../themes/theme';

const Stack = createNativeStackNavigator();

const Routes = {
  LOGIN: 'Login',
  ONBOARDING: 'Onboarding',
  FORGOT_PASSWORD: 'ForgotPassword',
  SIGN_UP: 'SignUp',
  EMAIL_VERIFICATION: 'EmailVerification',
  HOME: 'Home',
  PROFILE: 'Profile',
  CATEGORY: 'Category',
  SEARCH: 'Search',
  PRODUCT: 'Product',
};

function AppNavigator() {
  const [isInitialLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  const checkForInitialLaunch = async () => {
    try {
      const data = await AsyncStorage.getItem('isInitialLaunch');
      console.log(data, 'data');
      if (data === null) {
        await AsyncStorage.setItem('isInitialLaunch', 'false');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Failed to load the initial launch state', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    checkForInitialLaunch();
  }, []);

  console.log('dat aftere ;;');
  if (isInitialLaunch === null) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isInitialLaunch ? Routes.ONBOARDING : Routes.LOGIN}>
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
          <Stack.Screen
            name={Routes.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name={Routes.SIGN_UP} component={SignUpScreen} />
          <Stack.Screen
            name={Routes.EMAIL_VERIFICATION}
            component={EmailVerificationScreen}
          />
          <Stack.Screen name={Routes.HOME} component={HomeScreen} />
          <Stack.Screen name={Routes.PROFILE} component={ProfileScreen} />
          <Stack.Screen name={Routes.CATEGORY} component={CategoryScreen} />
          <Stack.Screen name={Routes.SEARCH} component={SearchScreen} />
          <Stack.Screen name={Routes.PRODUCT} component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default AppNavigator;
