export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailVerification: undefined;
  AuthStack: undefined;
  NoNetwork: undefined;
  Home: undefined;
  Search: undefined;
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
  Product: {
    productSku: string;
  };
  Reviews: undefined;
  Cart: undefined;
  Profile: undefined;
  FavoritesScreen: undefined;
  OrdersScreen: undefined;
  AboutMeScreen: undefined;
  AddressScreen: undefined;
  NotificationSettings: undefined;
  MyAddress: undefined;
  MainTabs: undefined;
  Dummy: undefined;
};
