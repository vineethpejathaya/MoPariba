import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Badge, Box, FlatList, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ImageComponent from '../../components/ImageComponent';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import {
  PopularOffer,
  SuggestedStore,
  recentKeywords,
} from '../../constants/main';
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
        disableNavigateBack
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
        <VStack space={5} justifyContent={'space-between'} px={5}>
          <SearchBar placeholder="Search dishes, restaurants" />
          <RecentSearchSection recentKeywords={recentKeywords} />
          {/* <SuggestedStoresSection suggestedStores={suggestedStores} /> */}
          {/* <PopularOffersSection
            navigation={navigation}
            popularOffers={popularOffers}
          /> */}
        </VStack>
      </ScreenContent>
    </>
  );
}

export default SearchScreen;

export const RecentSearchSection = ({
  recentKeywords,
}: {
  recentKeywords: String[];
}) => {
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

export const SuggestedStoresSection = ({
  suggestedStores,
}: {
  suggestedStores: SuggestedStore[];
}) => {
  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Suggested Stores</Text>
        <VStack space={3}>
          {suggestedStores?.map((store, index: number) => (
            <HStack key={index} style={searchScreenStyles.suggestedStoreItem}>
              <ImageComponent
                styles={searchScreenStyles.suggestedStoreImage}
                source={store?.image ? store?.image : undefined}
                alt={store.name}
              />
              <VStack space={2}>
                <Text variant={'title2'}>{store?.name}</Text>
                <HStack space={1} alignItems="center">
                  <Icon
                    name="star"
                    size={15}
                    color={theme.colors.orange[700]}
                  />
                  <Text variant={'title2'}>{store?.rating}</Text>
                </HStack>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </>
  );
};

export const PopularOffersSection = ({
  navigation,
  popularOffers,
}: {
  navigation: SearchScreenNavigationProp;
  popularOffers: PopularOffer[];
}) => {
  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Popular Offers</Text>
        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {popularOffers?.map((offer: any, index: number) => (
            <Box key={index} style={searchScreenStyles?.categoryContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <VStack space={2}>
                  <ImageComponent
                    styles={searchScreenStyles?.categoryImage}
                    source={offer?.image ?? undefined}
                    alt={offer?.name}
                    height={120}
                    width={122}
                  />
                  <Text variant={'subheader2'}>{offer?.name}</Text>
                  <HStack space={3}>
                    <Text>{offer?.discount}</Text>
                  </HStack>
                </VStack>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </VStack>
    </>
  );
};
