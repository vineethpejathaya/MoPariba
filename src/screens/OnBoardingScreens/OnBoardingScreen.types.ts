import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';

export type OnBoardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export type OnBoardingScreenProps = {
  navigation: OnBoardingScreenNavigationProp;
};
