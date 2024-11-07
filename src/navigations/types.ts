import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  // Stacks
  MainStack: undefined;
  MainTabs: undefined;
  AuthStack: undefined;

  // Screens
  // Authentication Screens
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OtpScreen: {
    mobileNumber: string;
  };
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailVerification: undefined;

  // Main screens
  Home: undefined;
  Search: undefined;

  NoNetwork: undefined;
  // Category
  Category: {
    categoryName?: string;
    categoryUid?: string;
    parentId?: number;
  };
  ProductList: {
    categoryName: string;
    categoryId: string;
    categoryImageUrl: string;
    totalProductCount: number;
  };
  // Product
  Product: {
    productSku: string;
  };
  Reviews: undefined;
  // Cart and Payments
  Cart: undefined;
  AddressSelection: undefined;
  OrderConfirm: undefined;
  // Profile
  Profile: undefined;
  NotificationSettings: undefined;
  MyAddress: undefined;
  MyOrdersScreen: undefined;
  AddressScreen: undefined;
  GeoLocationScreen: undefined;
  AboutMeScreen: undefined;
  FavoritesScreen: undefined;
  OrdersScreen: undefined;
  Dummy: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
