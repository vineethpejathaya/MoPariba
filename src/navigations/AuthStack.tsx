import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import LoginScreen from '../screens/LoginAndRegistrations/LoginScreen';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function AuthStack() {
  const [initialPage, setInitialPage] = useState<string | null>(null);

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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
