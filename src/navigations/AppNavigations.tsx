import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginAndRegistrations';
import EmailVerificationScreen from '../screens/LoginAndRegistrations/EmailVerification';
import ForgotPasswordScreen from '../screens/LoginAndRegistrations/ForgotPassword';
import SignUpScreen from '../screens/LoginAndRegistrations/SignUp';
import OnboardingScreen from '../screens/OnBoardingScreens/OnBoardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import theme from '../themes/theme';

function AppNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default AppNavigator;
