import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloWrapper} from '../../ApolloProvider';
import {AuthProvider, useAuth} from '../hooks/UseAuth';
import {CartProvider} from '../hooks/UseCart';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginAndRegistrations';
import EmailVerificationScreen from '../screens/LoginAndRegistrations/EmailVerification';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import NoNetworkScreen from '../screens/NoNetworkScreen';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ReviewsScreen from '../screens/ProductReviews/ProductReviews';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/UserProfileAndSettings/ProfileScreen';
import NotificationSettings from '../screens/UserProfileAndSettings/SubScreens/NotificationSettings';
import theme from '../themes/theme';
import Tabs from './TabNavigations';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <ApolloWrapper>
              <CartProvider>
                <Navigator />
              </CartProvider>
            </ApolloWrapper>
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default AppNavigator;

function Navigator() {
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(userToken !== null);
      } catch (error) {
        console.error('Error checking authentication state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name={'NoNetwork'} component={NoNetworkScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Search'} component={SearchScreen} />
      <Stack.Screen name={'Category'} component={CategoryScreen} />
      <Stack.Screen name={'Cart'} component={CartScreen} />
      <Stack.Screen name={'ProductList'} component={ProductListScreen} />
      <Stack.Screen name={'Product'} component={ProductScreen} />
      <Stack.Screen name={'Reviews'} component={ReviewsScreen} />
      <Stack.Screen
        name={'NotificationSettings'}
        component={NotificationSettings}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
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
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialPage}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPasswordScreen} />
      <Stack.Screen
        name={'EmailVerification'}
        component={EmailVerificationScreen}
      />
    </Stack.Navigator>
  );
}
