import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';

// Login screen
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type OtpScreenRouteProp = RouteProp<RootStackParamList, 'OtpScreen'>;

// Otp screen
export type OtpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OtpScreen'
>;

export type OtpScreenProps = {
  route: OtpScreenRouteProp;
  navigation: OtpScreenNavigationProp;
};

export interface LoginFormData {
  mobileNumber: string;
  // email: string;
  // password: string;
  // rememberMe: boolean;
}

export interface OtpFormData {
  otp: string;
}

export const defaultLoginFormState = {
  mobileNumber: '',
  // email: '',
  // password: '',
  // rememberMe: false,
};

// Email verification screen
export type EmailVerificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EmailVerification'
>;

export type EmailVerificationScreenProps = {
  navigation: EmailVerificationNavigationProp;
};

// Forgot password screen
export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

export type ForgotPasswordScreenProps = {
  navigation: ForgotPasswordNavigationProp;
};

// Sign up screen
export type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export type SignUpScreenProps = {
  navigation: SignUpNavigationProp;
};

export interface ShowPasswordState {
  [key: string]: boolean;
}

export interface FormDataType {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  // password: string;
  // confirmPassword: string;
  is_subscribed: string;
}

export type FieldName = keyof FormDataType;

export type KeyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url';

export interface Field {
  name: FieldName;
  label: string;
  placeholder: string;
  type?: 'password' | 'text';
  isPassword?: boolean;
  keyboardType: KeyboardType;
}
