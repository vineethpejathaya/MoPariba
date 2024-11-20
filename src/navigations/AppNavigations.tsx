import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloWrapper} from '../../ApolloProvider';
import {AuthProvider, useAuth} from '../hooks/UseAuth';
import BestDeals from '../screens/BestDeals/BestDeals';
import AddressSelection from '../screens/CartAndPaymentsScreen/AddressSelection/AddressSelection';
import OrderConfirm from '../screens/CartAndPaymentsScreen/OrderConfirm';
import EmailVerificationScreen from '../screens/LoginAndRegistrations/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginAndRegistrations/LoginScreen';
import OtpScreen from '../screens/LoginAndRegistrations/OtpScreen';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUpScreen';
import NoNetworkScreen from '../screens/NoNetworkScreen';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ReviewsScreen from '../screens/ProductReviews/ProductReviews';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import MapViewComponent from '../screens/UserProfileAndSettings/MyAddressScreen/GeoLOcationScreen';
import MyAddressScreen from '../screens/UserProfileAndSettings/MyAddressScreen/MyAddressScreen';
import MyOrdersScreen from '../screens/UserProfileAndSettings/MyOrdersScreen';
import OrderSummaryScreen from '../screens/UserProfileAndSettings/MyOrdersScreen/OrderSummaryScreen';
import MyProfile from '../screens/UserProfileAndSettings/MyProfile';
import NotificationSettings from '../screens/UserProfileAndSettings/NotificationSettings';
import theme from '../themes/theme';
import MainTabs from './MainTabs';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {isAuthenticated} = useAuth();
  const [initialPage, setInitialPage] = useState<
    keyof RootStackParamList | null
  >(null);

  const checkForInitialPage = async () => {
    try {
      const isInitialLaunch = await AsyncStorage.getItem('isInitialLaunch');
      const userToken = await AsyncStorage.getItem('userToken');
      if (isInitialLaunch === null || isInitialLaunch == 'true') {
        await AsyncStorage.setItem('isInitialLaunch', 'true');
        setInitialPage('Onboarding');
      } else {
        if (!isAuthenticated) {
          setInitialPage('Login');
        }
        if (userToken === null && !isAuthenticated) {
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
  }, [isAuthenticated, initialPage]);

  if (initialPage === null) {
    return null;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialPage}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="BestDeals" component={BestDeals} />
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Reviews" component={ReviewsScreen} />
            <Stack.Screen name="NoNetwork" component={NoNetworkScreen} />
            <Stack.Screen name="AddressScreen" component={MyAddressScreen} />
            <Stack.Screen
              name="GeoLocationScreen"
              component={MapViewComponent}
            />
            <Stack.Screen name="MyProfileScreen" component={MyProfile} />
            <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
            <Stack.Screen
              name="OrderSummaryScreen"
              component={OrderSummaryScreen}
            />

            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettings}
            />
            <Stack.Screen
              name="AddressSelection"
              component={AddressSelection}
            />
            <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerificationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

function AppNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <ApolloWrapper>
              <RootNavigator />
            </ApolloWrapper>
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default AppNavigator;
