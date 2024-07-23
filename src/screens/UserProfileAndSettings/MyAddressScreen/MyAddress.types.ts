import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigations/types';

export type MyAddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyAddress'
>;

export type MYAddressScreenProps = {
  navigation: MyAddressScreenNavigationProp;
};
