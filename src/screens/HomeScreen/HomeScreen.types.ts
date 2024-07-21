import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';
import {
  Categories,
  CategoryItemInterface,
  Customer,
} from '../../services/ggl-queries/HomeScreen/Home.type';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export interface HomeScreenState {
  categories: Categories | null;
  categoryItems: CategoryItemInterface[] | [];
  customer: Customer | null;
}

export const defaultHomeScreenState = {
  categories: null,
  categoryItems: [],
  customer: null,
};
