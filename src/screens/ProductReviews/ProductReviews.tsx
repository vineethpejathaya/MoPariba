import {Avatar, Box, HStack, Icon, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

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

const ReviewItem = ({name, avatar, rating, review}: any) => (
  <Box borderBottomWidth="1" borderColor="coolGray.200" py="4">
    <HStack space={3} justifyContent="space-between">
      <Avatar size="48px" source={{uri: avatar}} />
      <VStack>
        <Text bold>{name}</Text>
        <HStack space={1} alignItems="center">
          <Text>{rating}</Text>
          <Icon name="star" size="sm" color="yellow.400" />
          <Icon name="star" size="sm" color="yellow.400" />
          <Icon name="star" size="sm" color="yellow.400" />
          <Icon name="star" size="sm" color="yellow.400" />
          <Icon name="star-half" size="sm" color="yellow.400" />
        </HStack>
        <Text>{review}</Text>
      </VStack>
    </HStack>
  </Box>
);

const ReviewsScreen = () => (
  <SafeAreaView style={{flex: 1}}>
    <Box flex={1} p="4">
      <Text fontSize="xl" bold mb="4">
        Reviews
      </Text>
      <ScrollView>
        {reviews.map(review => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </ScrollView>
    </Box>
  </SafeAreaView>
);

export default ReviewsScreen;
