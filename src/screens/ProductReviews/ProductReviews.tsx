import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, Divider, HStack, Text, VStack, theme} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenHeader from '../../components/ScreenHeader';
import StarRating from '../../components/StarRating';
import {RootStackParamList} from '../../navigations/types';

const reviews = [
  {
    id: 1,
    name: 'Haylie Aminoff',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    review:
      'Lorem ipsum dolor sit amet, consectetur sadi sspcsing elitr, sed diam nonumy',
  },
  {
    id: 2,
    name: 'Carla Septimus',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    review:
      'Lorem ipsum dolor sit amet, consectetur sadi sspcsing elitr, sed diam nonumy',
  },
  {
    id: 3,
    name: 'Carla George',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    review:
      'Lorem ipsum dolor sit amet, consectetur sadi sspcsing elitr, sed diam nonumy',
  },
  {
    id: 4,
    name: 'Maren Kenter',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    review:
      'Lorem ipsum dolor sit amet, consectetur sadi sspcsing elitr, sed diam nonumy',
  },
];

type ReviewsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Reviews'
>;

type Props = {
  navigation: ReviewsScreenNavigationProp;
};

const ReviewsScreen = ({navigation}: Props) => (
  <>
    <ScreenHeader
      title={'Reviews'}
      rightActions={[
        <CustomIconButton
          iconName={'plus'}
          BtnStyles={{backgroundColor: 'white'}}
          iconSize={25}
          onPress={() => {}}
        />,
      ]}
    />

    <VStack space={3} alignItems={'center'} flex={1} mt={4}>
      {reviews.map((review, index: number) => (
        <ReviewItem key={index} {...review} />
      ))}
    </VStack>
  </>
);

export default ReviewsScreen;

const ReviewItem = ({name, avatar, rating, review}: any) => {
  return (
    <VStack style={ReviewCard.card}>
      <HStack space={3} alignItems={'center'}>
        <Avatar size="48px" source={{uri: avatar}} />
        <VStack>
          <Text variant={'title1'}>{name}</Text>
          <Text variant={'body2'}>32 minutes ago</Text>
        </VStack>
      </HStack>
      <Divider orientation="horizontal" />
      <VStack>
        <StarRating rating={4.5} maxRating={5} />
        <Text>{review}</Text>
      </VStack>
    </VStack>
  );
};

const ReviewCard = StyleSheet.create({
  card: {
    gap: 10,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 10,
    borderBlockColor: 'black',
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});
