import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  // Stacks
  MainStack: undefined;
  MainTabs: undefined;
  AuthStack: undefined;

  // Screens
  // Authentication Screens
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
  BestDeals: undefined;
  // Product
  Product: {
    productSku: string;
  };
  Reviews: undefined;

  // Cart and Payments
  Cart: undefined;
  PaymentLoadingScreen: undefined;
  OrderConfirm: {
    orderNumber: string;
  };

  // Profile
  PaymentMethodScreen: undefined;
  Profile: undefined;
  NotificationSettings: undefined;
  MyAddress: undefined;
  MyOrdersScreen: undefined;
  OrderSummaryScreen: {
    orderNumber: string;
  };
  AddressScreen: undefined;
  GeoLocationScreen: {
    navigateTo?: keyof RootStackParamList;
  };
  MyProfileScreen: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
