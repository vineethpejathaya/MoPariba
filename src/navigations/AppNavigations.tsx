import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloWrapper} from '../../ApolloProvider';
import {AuthProvider, useAuth} from '../hooks/UseAuth';
import {CartProvider} from '../hooks/UseCart';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import LoginScreen from '../screens/LoginAndRegistrations/LoginScreen';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import NoNetworkScreen from '../screens/NoNetworkScreen';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ReviewsScreen from '../screens/ProductReviews/ProductReviews';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import theme from '../themes/theme';
import MainTabs from './MainTabs';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  console.log('rootNavigator');
  const {isAuthenticated} = useAuth();

  const [initialPage, setInitialPage] = useState<
    keyof RootStackParamList | null
  >(null);

  const checkForInitialPage = async () => {
    try {
      console.log('called');
      const isInitialLaunch = await AsyncStorage.getItem('isInitialLaunch');
      const userToken = await AsyncStorage.getItem('userToken');

      if (isInitialLaunch === null) {
        console.log('called onboarding');
        await AsyncStorage.setItem('isInitialLaunch', 'false');
        setInitialPage('Onboarding');
      } else {
        if (userToken === null) {
          console.log('called login');
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
  console.log(initialPage, 'initialPage');
  if (initialPage === null) {
    return null;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialPage}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="NoNetwork" component={NoNetworkScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </>
  );
}

function AppNavigator() {
  console.log('appnavigator');
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <ApolloWrapper>
              <CartProvider>
                <RootNavigator />
              </CartProvider>
            </ApolloWrapper>
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default AppNavigator;
