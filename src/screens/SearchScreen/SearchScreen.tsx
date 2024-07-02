import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Avatar,
  Badge,
  Box,
  FlatList,
  HStack,
  Image,
  Input,
  Text,
  Theme,
  VStack,
  theme,
  useTheme,
} from 'native-base';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';

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
        leftComponents={[
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
        actions={[
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
                <Icon name="search" size={25} style={{padding: 10}} />
              }
              placeholder="Search dishes, restaurants"
            />
            <RecentSearch />
            <SuggestedStores />
            <PopularOffers navigation={navigation} />
          </VStack>
        </SafeAreaView>
      </ScreenContent>
    </>
  );
}

export default SearchScreen;

export const RecentSearch = () => {
  const recentKeywords = ['Fruite', 'Grocery', 'Veggies', 'Snacks'];
  const theme = useTheme();
  const styles = createRecentSearchStyles(theme);
  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Recent Keywords</Text>
        <HStack space={2} mb={4} flexWrap="wrap">
          {recentKeywords.map((keyword, index) => (
            <Badge key={index} style={styles.container} variant="outline">
              {keyword}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export const SuggestedStores = () => {
  const suggestedStores = [
    {name: 'Pansi Store', rating: 4.7},
    {name: 'Store 2', rating: 4.3},
    {name: 'Store 3', rating: 4.0},
  ];

  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Suggested Stores</Text>
        <VStack space={3} mb={4}>
          <FlatList
            data={suggestedStores}
            renderItem={({item, index}) => (
              <HStack
                key={index}
                alignItems="center"
                space={3}
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  borderColor: 'gray.500',
                }}>
                <Avatar bg="gray.300" size="48px" />
                <VStack>
                  <Text>{item.name}</Text>
                  <HStack space={1} alignItems="center">
                    <Icon name="star" size={12} color="orange.400" />
                    <Text>{item.rating}</Text>
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

export const PopularOffers = ({navigation}: any) => {
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
            <Box style={CategoryStyles?.container}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  style={CategoryStyles?.image}
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

const createRecentSearchStyles = (theme: Theme) => {
  const RecentSearchStyles = StyleSheet.create({
    container: {
      height: 46,
      width: 89,
      color: theme.colors.gray[500],
      borderRadius: 15,
      borderColor: theme.colors.gray[500],
      padding: 5,
      fontSize: 16,
    },
  });
  return RecentSearchStyles;
};

export const CategoryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 4,
    margin: 4,
    borderRadius: 10,
    width: 147,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  image: {
    borderRadius: 10,
    objectFit: 'contain',
    zIndex: 1,
  },
});
