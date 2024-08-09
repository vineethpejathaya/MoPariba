import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import {recentKeywords} from '../../constants/main';
import {NavigationProp} from '../../navigations/types';
import {SEARCH_PRODUCTS} from '../../services/GGL-Queries/SearchScreen/SearchScreen.queries';
import theme from '../../themes/theme';
import searchScreenStyles from './SearchScreen.styles';
import {SearchScreenProps} from './SearchScreen.type';
import AnimatedSkeleton from './components/AnimatedSkeleton';

function SearchScreen({navigation}: SearchScreenProps) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [shouldQueryRun, setShouldQueryRun] = useState(false);
  const {loading, error, data} = useQuery(SEARCH_PRODUCTS, {
    variables: {search, pageSize: 20, currentPage: 1},
    skip: !shouldQueryRun,
    onCompleted: res => {
      setProducts(res?.products?.items);
    },
  });

  useEffect(() => {
    if (search) {
      setShouldQueryRun(true);
    } else {
      setShouldQueryRun(false);
    }
  }, [search]);

  useEffect(() => {
    if (data && data.products && data.products.items) {
      setProducts(data.products.items);
    }
  }, [data]);

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

      <ScreenContent flex={1} containerStyles={{backgroundColor: 'white'}}>
        <VStack space={5} justifyContent={'space-between'} px={5}>
          <SearchBar
            placeholder="Search dishes, restaurants"
            onSearch={v => {
              setSearch(v);
            }}
          />

          {search ? (
            <>
              {loading ? (
                <AnimatedSkeleton />
              ) : (
                <>
                  <ScrollView>
                    <Box
                      style={{
                        flex: 1,
                      }}>
                      {products.length > 0 ? (
                        <>
                          {products?.map(product => (
                            <ProductItem product={product} />
                          ))}
                        </>
                      ) : (
                        <Box
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text>{`No Products found with name ${search}`}</Text>
                        </Box>
                      )}
                    </Box>
                  </ScrollView>
                </>
              )}
            </>
          ) : (
            <>
              <RecentSearchSection recentKeywords={recentKeywords} />
              {/* <SuggestedStoresSection suggestedStores={suggestedStores} /> */}
              {/* <PopularOffersSection
            navigation={navigation}
            popularOffers={popularOffers}
          /> */}
            </>
          )}
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

export const ProductItem = ({product}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const price = product?.price_range?.maximum_price?.final_price?.value;
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Product', {
            productSku: product?.sku,
          })
        }>
        <HStack style={styles.container}>
          <HStack space={2} alignItems={'center'}>
            <Box style={styles.imageContainer}>
              {product?.image?.url && (
                <Image
                  source={{uri: `${product?.image?.url}`}}
                  style={{width: '80%', height: '80%'}}
                  resizeMode="contain"
                  alt={product?.image?.label}
                />
              )}
            </Box>

            <VStack>
              <Text variant="body2" fontSize={'sm'}>
                {product?.name ?? '--'}
              </Text>
              <Text variant="body2" fontSize={'sm'}>
                ₹{price ?? 0}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[500],
  },

  imageContainer: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
