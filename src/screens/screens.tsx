import {lazy} from 'react';

// Login and Onboarding
const LoginScreen = lazy(() => import(`./LoginAndRegistrations/LoginScreen`));
const OtpScreen = lazy(() => import(`./LoginAndRegistrations/OtpScreen`));
const SignUpScreen = lazy(() => import(`./LoginAndRegistrations/SignUpScreen`));
const OnBoardingScreen = lazy(() => import(`./OnBoardingScreens`));
const ForgotPassword = lazy(
  () => import(`./LoginAndRegistrations/ForgotPasswordScreen`),
);
const EmailVerification = lazy(
  () => import(`./LoginAndRegistrations/EmailVerificationScreen`),
);

// Home Screen
const HomeScreen = lazy(() => import(`./HomeScreen`));
const SearchScreen = lazy(() => import(`./SearchScreen`));

// Products Screens
const BestDeals = lazy(() => import(`./BestDeals`));
const ProductListScreen = lazy(() => import(`./ProductListScreen`));
const ProductScreen = lazy(() => import(`./ProductScreen`));
const ReviewsScreen = lazy(() => import(`./ProductReviews`));

// Cart
const CartScreen = lazy(() => import(`./CartAndPaymentsScreen/CartScreen`));
const PaymentMethodScreen = lazy(
  () => import(`./CartAndPaymentsScreen/PaymentMethodScreen`),
);

// User profile
const MyAddressScreen = lazy(
  () => import(`./UserProfileAndSettings/MyAddressScreen`),
);
const GeoLocationScreen = lazy(
  () => import(`./UserProfileAndSettings/MyAddressScreen/GeoLocationScreen`),
);
const MyOrdersScreen = lazy(
  () => import(`./UserProfileAndSettings/MyOrdersScreen`),
);
const OrderSummaryScreen = lazy(
  () => import(`./UserProfileAndSettings/MyOrdersScreen/OrderSummaryScreen`),
);
const MyProfile = lazy(() => import(`./UserProfileAndSettings/MyProfile`));
const NotificationSettings = lazy(
  () => import(`./UserProfileAndSettings/NotificationSettings`),
);

const OrderSuccessScreen = lazy(
  () => import(`./CartAndPaymentsScreen/OrderConfirm`),
);

// Other Screens
const NoNetworkScreen = lazy(() => import(`./NoNetworkScreen`));

// export {
//   BestDeals,
//   CartScreen,
//   EmailVerification,
//   ForgotPassword,
//   GeoLocationScreen,
//   HomeScreen,
//   LoginScreen,
//   MyAddressScreen,
//   MyOrdersScreen,
//   MyProfile,
//   NoNetworkScreen,
//   NotificationSettings,
//   OnBoardingScreen,
//   OrderSuccessScreen,
//   OrderSummaryScreen,
//   OtpScreen,
//   PaymentMethodScreen,
//   ProductListScreen,
//   ProductScreen,
//   ReviewsScreen,
//   SearchScreen,
//   SignUpScreen,
// };
