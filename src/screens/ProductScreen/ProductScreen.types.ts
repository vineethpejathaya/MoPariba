import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';

export type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

export type ProductScreenProps = {
  route: ProductScreenRouteProp;
  navigation: ProductScreenNavigationProp;
};
