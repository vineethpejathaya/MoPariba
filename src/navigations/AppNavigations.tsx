import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloWrapper} from '../../ApolloProvider';
import {AuthProvider} from '../hooks/UseAuth';
import {CartProvider} from '../hooks/UseCart';
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
const Tab = createBottomTabNavigator();
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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name={'NoNetwork'} component={NoNetworkScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}

const MnStack = createNativeStackNavigator<RootStackParamList>();

export function MainStack() {
  return (
    <MnStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <MnStack.Screen name={'Home'} component={HomeScreen} />
      <MnStack.Screen name={'Search'} component={SearchScreen} />
    </MnStack.Navigator>
  );
}

const CategoryStack = createNativeStackNavigator<RootStackParamList>();

export function ProductNavigationStack() {
  return (
    <CategoryStack.Navigator
      initialRouteName="Category"
      screenOptions={{headerShown: false}}>
      <CategoryStack.Screen name={'Category'} component={CategoryScreen} />
      <CategoryStack.Screen
        name={'ProductList'}
        component={ProductListScreen}
      />
      <CategoryStack.Screen name={'Product'} component={ProductScreen} />
      <CategoryStack.Screen name={'Reviews'} component={ReviewsScreen} />
    </CategoryStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export function ProfileNavigationStack() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name={'NotificationSettings'}
        component={NotificationSettings}
      />
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
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
