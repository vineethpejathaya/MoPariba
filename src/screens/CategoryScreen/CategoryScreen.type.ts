import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/types';
import {Categories} from '../../services/GGL-Queries/HomeScreen/Home.type';

export type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
export type CategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Category'
>;

export type CategoryScreenProps = {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavigationProp;
};

export type CategoryState = Categories | null;
