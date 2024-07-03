import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ResponsiveImage from '../../components/ResponsiveImage';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';
import theme from '../../themes/theme';
import searchScreenStyles from './styles';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;
type Props = {
  navigation: SearchScreenNavigationProp;
};

function SearchScreen({navigation}: Props) {
  return (
    <>
      <ScreenHeader
        leftActions={[
          <HStack space={4} alignItems={'center'}>
            <CustomIconButton
              iconName="chevron-left"
              iconSize={25}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text variant={'subTitle2'} style={{fontSize: 17}}>
              Search
            </Text>
          </HStack>,
        ]}
        rightActions={[
          <CustomIconButton
            svgIcon={<NotificationIcon />}
            BtnStyles={{backgroundColor: '#181C2E'}}
            iconSize={25}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />,
        ]}
      />
      <ScreenContent flex={1}>
        <SafeAreaView style={{flex: 1}}>
          <VStack space={5} justifyContent={'space-between'} px={5}>
            <Input
              variant={'outline'}
              InputLeftElement={
                <Icon
                  name="search"
                  size={25}
                  style={{padding: 10}}
                  color={theme.colors.gray[900]}
                />
              }
              placeholder="Search dishes, restaurants"
            />
            <RecentSearchSection />
            <SuggestedStoresSection />
            <PopularOffersSection navigation={navigation} />
          </VStack>
        </SafeAreaView>
      </ScreenContent>
    </>
  );
}

export default SearchScreen;

export const RecentSearchSection = () => {
  const recentKeywords = ['Fruite', 'Grocery', 'Veggies', 'Snacks'];

  return (
    <>
      <VStack space={4}>
        <Text variant={'header2'}>Recent Keywords</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentKeywords}
          renderItem={({item}: any) => (
            <Badge
              style={searchScreenStyles.recentSearchContainer}
              variant="outline">
              {item}
            </Badge>
          )}
          keyExtractor={(item: any) => item}
        />
      </VStack>
    </>
  );
};

export const SuggestedStoresSection = () => {
  const suggestedStores = [
    {
      name: 'Pansi Store',
      rating: 4.7,
    },
    {
      name: 'Store 2',
      rating: 4.3,
      image: require('../../assets/images/pngs/pineapple-pieces.png'),
    },
    {
      name: 'Store 3',
      rating: 4.0,
      image: require('../../assets/images/pngs/pineapple-pieces.png'),
    },
  ];

  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Suggested Stores</Text>
        <VStack space={3}>
          <FlatList
            data={suggestedStores}
            renderItem={({item, index}) => (
              <HStack key={index} style={searchScreenStyles.suggestedStoreItem}>
                <ResponsiveImage
                  styles={searchScreenStyles.suggestedStoreImage}
                  source={item.image}
                  alt={item.name}
                />
                <VStack space={2}>
                  <Text variant={'title2'}>{item.name}</Text>
                  <HStack space={1} alignItems="center">
                    <Icon
                      name="star"
                      size={15}
                      color={theme.colors.orange[700]}
                    />
                    <Text variant={'title2'}>{item.rating}</Text>
                  </HStack>
                </VStack>
              </HStack>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </VStack>
      </VStack>
    </>
  );
};

export const PopularOffersSection = ({
  navigation,
}: {
  navigation: SearchScreenNavigationProp;
}) => {
  const popularOffers = [
    {
      id: '1',
      name: 'Veggie',
      price: '$70',
      image: require('../../assets/images/pngs/pineapple-pieces.png'),
      discount: '20% Off On ....',
    },
    {
      id: '2',
      name: 'Grocery',
      price: '$50',
      image: require('../../assets/images/pngs/pomegranate-11.png'),
      discount: '30% Off On ....',
    },
  ];

  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Popular Offers</Text>
        <FlatList
          horizontal
          data={popularOffers}
          renderItem={({item}) => (
            <Box style={searchScreenStyles?.categoryContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  style={searchScreenStyles?.categoryImage}
                  source={item.image}
                  alt={item?.name}
                  resizeMode="contain"
                  height={140}
                  width={122}
                />
                <Text variant={'subheader2'}>{item.name}</Text>
                <HStack space={3}>
                  <Text>{item.discount}</Text>
                </HStack>
              </TouchableOpacity>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </VStack>
    </>
  );
};
