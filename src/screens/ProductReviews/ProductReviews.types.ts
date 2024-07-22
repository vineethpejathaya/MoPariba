import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types';

export type ReviewsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Reviews'
>;

export type ProductReviewScreenProps = {
  navigation: ReviewsScreenNavigationProp;
};

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}
