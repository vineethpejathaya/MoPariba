import {useQuery} from '@apollo/client';
import {Badge, Box, FlatList, HStack, Text, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import SpinnerComponent from '../../components/SpinnerComponent';
import {recentKeywords} from '../../constants/main';
import {SEARCH_PRODUCTS} from '../../services/GGL-Queries/SearchScreen/SearchScreen.queries';
import searchScreenStyles from './SearchScreen.styles';
import {SearchScreenProps} from './SearchScreen.type';
import {debounce} from './service';

function SearchScreen({navigation}: SearchScreenProps) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const {loading, error, data} = useQuery(SEARCH_PRODUCTS, {
    variables: {search, pageSize: 20, currentPage: 1},
    skip: !search,
    onCompleted: res => {
      setProducts(res?.products?.items);
    },
  });

  useEffect(() => {
    if (data && data.products && data.products.items) {
      setProducts(data.products.items);
    }
  }, [data]);

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 300),
    [],
  );

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
    setDropdownVisible(true);
  };

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100);
  };

  const renderDropdownItem = ({item}: any) => {
    console.log(item, 'item');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Product', {
            productSku: item?.sku,
          });
          // setDropdownVisible(false);
        }}>
        <Text style={searchScreenStyles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

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
      {/* <LinearProgress /> */}
      <ScreenContent flex={1} containerStyles={{backgroundColor: 'white'}}>
        <VStack space={5} justifyContent={'space-between'} px={5}>
          <SearchBar
            placeholder="Search dishes, restaurants"
            onChangeText={handleSearchChange}
            onFocus={handleFocus}
            // onBlur={handleBlur}
          />
          {dropdownVisible && (
            <>
              {loading ? (
                <SpinnerComponent onlySpinner />
              ) : (
                <>
                  <Box style={searchScreenStyles.dropdown}>
                    {products.length ? (
                      <FlatList
                        data={products}
                        keyExtractor={(item: any) => item.id}
                        renderItem={renderDropdownItem}
                      />
                    ) : null}
                  </Box>
                </>
              )}
            </>
          )}

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
