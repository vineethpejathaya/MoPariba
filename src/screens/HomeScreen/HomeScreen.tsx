import {useApolloClient} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, HStack, Pressable, Text, VStack, useTheme} from 'native-base';
import {useEffect, useState} from 'react';
import {
  CameraIcon,
  DropDownIcon,
  MenuIcon,
  NotificationIcon,
} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import SpinnerComponent from '../../components/SpinnerComponent';
import {banners, products} from '../../constants/main';
import {useAuth} from '../../hooks/UseAuth';
import {
  CREATE_CART_MUTATION,
  GET_CUSTOMER_CART,
} from '../../services/GGL-Queries/CustomerCart/Cart.queries';

import {useCartStore} from '../../hooks/UseCartStore';
import {
  GET_CATEGORIES,
  GET_CUSTOMER_DETAILS,
} from '../../services/GGL-Queries/HomeScreen/Home.queries';
import {GetHomeScreenDataResponse} from '../../services/GGL-Queries/HomeScreen/Home.type';
import {
  HomeScreenProps,
  HomeScreenState,
  defaultHomeScreenState,
} from './Home.type';
import BestDeals from './components/BestDeals';
import HomeCategoryList from './components/CategoryList';
import HomeBanner from './components/HomeBanner';

function HomeScreen({navigation}: HomeScreenProps) {
  const theme = useTheme();
  const {isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const {setCart, setCartId, setAddresses, defaultAddress} = useCartStore(
    state => state,
  );
  const [homeScreenState, setHomeScreenState] = useState<HomeScreenState>(
    defaultHomeScreenState,
  );
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const homeScreenDataResponse =
          await client.query<GetHomeScreenDataResponse>({
            query: GET_CATEGORIES,
            variables: {parentId: ['2'], pageSize: 8, currentPage: 1},
            fetchPolicy: 'network-only',
          });
        const {categories} = homeScreenDataResponse.data;
        const customerDetails = await client.query<GetHomeScreenDataResponse>({
          query: GET_CUSTOMER_DETAILS,
          variables: {parentId: ['2'], pageSize: 8, currentPage: 1},
          fetchPolicy: 'network-only',
        });

        const {customer} = customerDetails.data;

        setAddresses(customer.addresses);

        await AsyncStorage.setItem('userDetails', JSON.stringify(customer));

        setHomeScreenState((prev: any) => ({
          ...prev,
          categories,
          customer,
          categoryItems: categories.items,
        }));

        const createCartResponse = await client.mutate({
          mutation: CREATE_CART_MUTATION,
        });

        const cartId = createCartResponse.data.createEmptyCart;
        setCartId(cartId);

        const customerCartResponse = await client.query({
          query: GET_CUSTOMER_CART,
          variables: {cart_id: cartId},
        });

        const cart = customerCartResponse.data.cart?.items;
        setCart(cart);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        // const customer;

        setHomeScreenState((prev: any) => ({
          ...prev,
        }));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    if (isAuthenticated) fetchData();
  }, [client, isAuthenticated, setCart, setCartId]);

  const {customer, categoryItems} = homeScreenState;

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader
        disableNavigateBack
        leftActions={[
          <CustomIconButton
            svgIcon={<MenuIcon />}
            iconSize={25}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />,
          <VStack>
            <Text
              variant={'subheader2'}
              style={{color: theme.colors.primary[200], fontSize: 12}}>
              DELIVER TO
            </Text>
            <Pressable onPress={() => navigation.navigate('AddressScreen')}>
              <HStack alignItems={'center'} space={2}>
                <Text variant="subTitle2">{defaultAddress?.city ?? '--'}</Text>
                <DropDownIcon />
              </HStack>
            </Pressable>
          </VStack>,
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
      <ScreenContent
        flex={1}
        containerStyles={{backgroundColor: theme.colors.white}}>
        <VStack space={2} px={2} justifyContent={'space-between'}>
          <Text
            variant={'subTitle2'}
            fontFamily={'Sen-Regular'}
            fontSize={'xl'}
            style={{textTransform: 'capitalize'}}>
            Hey {customer?.firstname ?? '--'} {customer?.lastname ?? '--'},{' '}
            <Text fontFamily={'Sen-Bold'} fontWeight={'bold'}>
              How are you!
            </Text>
          </Text>

          <SearchBar
            onPress={() => {
              navigation.navigate('Search');
            }}
            InputRightElement={
              <Box style={{padding: 10}}>
                <CameraIcon />
              </Box>
            }
          />

          <HomeBanner banners={banners} />

          {categoryItems?.length > 0 && (
            <HomeCategoryList navigation={navigation} state={homeScreenState} />
          )}
          <BestDeals products={products} />
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;
