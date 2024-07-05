export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailVerification: undefined;
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
  };
  Product: undefined;
  Reviews: undefined;
  Profile: undefined;
  NotificationSettings: undefined;
  MyAddress: undefined;
};
