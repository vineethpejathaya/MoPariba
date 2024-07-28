import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';

// Login screen
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const defaultLoginFormState = {
  email: '',
  password: '',
  rememberMe: false,
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
  email: string;
  password: string;
  confirmPassword: string;
  is_subscribed: string;
}

export type FieldName = keyof FormDataType;

export interface Field {
  name: FieldName;
  label: string;
  placeholder: string;
  type?: 'password' | 'text';
  isPassword?: boolean;
}
