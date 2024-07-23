import {useApolloClient} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, Text, VStack, useTheme} from 'native-base';
import {useEffect, useState} from 'react';
import {CameraIcon, MenuIcon, NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import SpinnerComponent from '../../components/SpinnerComponent';
import {banners, products} from '../../constants/main';
import {useAuth} from '../../hooks/UseAuth';
import {useCart} from '../../hooks/UseCart';
import {
  CREATE_CART_MUTATION,
  GET_CUSTOMER_CART,
} from '../../services/GGL-Queries/CustomerCart/Cart.queries';

import {GET_HOME_SCREEN_DATA} from '../../services/GGL-Queries/HomeScreen/Home.queries';
import {GetHomeScreenDataResponse} from '../../services/GGL-Queries/HomeScreen/Home.type';
import {
  HomeScreenProps,
  HomeScreenState,
  defaultHomeScreenState,
} from './HomeScreen.types';
import BestDeals from './components/BestDeals';
import HomeCategoryList from './components/CategoryList';
import HomeBanner from './components/HomeBanner';

function HomeScreen({navigation}: HomeScreenProps) {
  const theme = useTheme();
  const {isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const {setCartId, setCart, cart} = useCart();
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
            query: GET_HOME_SCREEN_DATA,
            variables: {parentId: ['2'], pageSize: 8, currentPage: 1},
            fetchPolicy: 'network-only',
          });

        const {categories, customer} = homeScreenDataResponse.data;

        await AsyncStorage.setItem('userDetails', JSON.stringify(customer));

        setHomeScreenState((prev: any) => ({
          ...prev,
          categories,
          customer,
          categoryItems: categories.items,
        }));

        // Create a customer cart
        const createCartResponse = await client.mutate({
          mutation: CREATE_CART_MUTATION,
        });

        const cartId = createCartResponse.data.createEmptyCart;
        setCartId(cartId);
        // Fetch customer cart details
        const customerCartResponse = await client.query({
          query: GET_CUSTOMER_CART,
          variables: {cart_id: cartId},
        });

        const cart = customerCartResponse.data.cart?.items;
        setCart(cart);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

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
  }, [client]);

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
            <Text variant="subTitle2">Halal Lab office</Text>
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
      <ScreenContent flex={1}>
        <VStack space={3} px={2} justifyContent={'space-between'}>
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
