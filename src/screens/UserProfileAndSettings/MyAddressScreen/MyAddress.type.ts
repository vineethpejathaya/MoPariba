import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigations/types';

export type MyAddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyAddress'
>;

export type MyAddressScreenProps = {
  navigation: MyAddressScreenNavigationProp;
};

export type AddressState = {
  name: string;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  postcode: string;
  country_code: string;
  default_billing: boolean;
  telephone: string;
  region_id: number | null;
};
