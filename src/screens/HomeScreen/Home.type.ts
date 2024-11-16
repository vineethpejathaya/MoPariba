import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';
import {
  Categories,
  CategoryItemInterface,
} from '../../services/GGL-Queries/HomeScreen/Home.type';

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
  dailyDeals: any[];
}

export const defaultHomeScreenState = {
  categories: null,
  categoryItems: [],
  dailyDeals: [],
};
