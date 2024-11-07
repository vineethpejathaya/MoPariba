import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/types';

export type ProductListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductList'
>;

export type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

export type ProductListScreenProps = {
  route: ProductListScreenRouteProp;
  navigation: ProductListScreenNavigationProp;
};
