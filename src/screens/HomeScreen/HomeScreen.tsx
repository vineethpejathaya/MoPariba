import {useApolloClient} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
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
import {banners} from '../../constants/main';
import {useAuth} from '../../hooks/UseAuth';
import {useCartStore} from '../../hooks/UseCartStore';
import {useCustomerStore} from '../../hooks/UseCustomerStore';
import {CREATE_CART_MUTATION} from '../../services/GGL-Queries/CustomerCart/Cart.mutation';
import {GET_CUSTOMER_CART} from '../../services/GGL-Queries/CustomerCart/Cart.queries';
import {
  GET_CATEGORIES,
  GET_CUSTOMER_DETAILS,
  GET_DAILY_DEAL_PRODUCTS,
} from '../../services/GGL-Queries/HomeScreen/Home.queries';
import {
  GetDailyDealProductsQuery,
  GetHomeScreenDataResponse,
} from '../../services/GGL-Queries/HomeScreen/Home.type';
import theme from '../../themes/theme';
import HomeScreenStyles from './Home.styles';
import {
  HomeScreenProps,
  HomeScreenState,
  defaultHomeScreenState,
} from './Home.type';
import BestDeals from './components/BestDeals';
import HomeCategoryList from './components/CategoryList';
import HomeBanner from './components/HomeBanner';

function HomeScreen({navigation}: HomeScreenProps) {
  const {isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const {setCart, setCartId} = useCartStore(state => state);
  const {customer, initializeCustomer} = useCustomerStore();
  const [homeScreenState, setHomeScreenState] = useState<HomeScreenState>(
    defaultHomeScreenState,
  );
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetching categories for home page with max category items up to 6
        const homeScreenDataResponse =
          await client.query<GetHomeScreenDataResponse>({
            query: GET_CATEGORIES,
            variables: {parentId: ['2'], pageSize: 6, currentPage: 1},
            fetchPolicy: 'network-only',
          });
        const {categories} = homeScreenDataResponse.data;

        // fetching customer details
        const customerDetails = await client.query<any>({
          query: GET_CUSTOMER_DETAILS,
          fetchPolicy: 'network-only',
        });

        initializeCustomer(customerDetails?.data?.customer);

        // fetching best deals for the home page
        const bestDeals = await client.query<GetDailyDealProductsQuery>({
          query: GET_DAILY_DEAL_PRODUCTS,
          fetchPolicy: 'network-only',
        });

        setHomeScreenState((prev: any) => ({
          ...prev,
          categories,
          categoryItems: categories.items,
          dailyDeals: bestDeals?.data?.dailyDealProducts,
        }));

        const createCartResponse = await client.mutate({
          mutation: CREATE_CART_MUTATION,
        });

        const cartId = createCartResponse.data.createEmptyCart;
        setCartId(cartId);

        // fetching customer cart data
        const customerCartResponse = await client.query({
          query: GET_CUSTOMER_CART,
          variables: {cart_id: cartId},
        });

        const cart = customerCartResponse.data.cart;

        setCart(cart);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching customer data:', error);
      }
    };

    if (isAuthenticated) fetchData();
  }, [client, isAuthenticated, setCart]);

  const {categoryItems, dailyDeals} = homeScreenState;

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      {/* Home screen header */}
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
              style={{color: theme.colors.primary[400], fontSize: 12}}>
              DELIVER TO
            </Text>
            <Pressable onPress={() => navigation.navigate('AddressScreen')}>
              <HStack alignItems={'center'} space={2}>
                <Text variant="subTitle2">
                  {customer?.defaultAddress?.city ?? '--'}
                </Text>
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

      {/* Home screen  container*/}

      <ScreenContent flex={1} containerStyles={HomeScreenStyles.mainContainer}>
        <VStack space={2} px={2} justifyContent={'space-between'}>
          {/*Home screen User Greetings */}
          <Text style={HomeScreenStyles.greetings}>
            Hey {customer?.firstname ?? '--'} {customer?.lastname ?? '--'},{' '}
            <Text style={HomeScreenStyles.greetings2}>How are you!</Text>
          </Text>

          {/* Home screen search bar */}
          <SearchBar
            inputProps={{
              onPress: () => {
                navigation.navigate('Search');
              },
              InputRightElement: (
                <Box style={{padding: 10}}>
                  <CameraIcon />
                </Box>
              ),
            }}
            onSearch={() => {}}
          />

          {/* Home page banner */}
          <HomeBanner banners={banners} />

          {/* Home page category list shows only max of 6 categories */}
          {categoryItems?.length > 0 && (
            <HomeCategoryList navigation={navigation} state={homeScreenState} />
          )}

          {/* Home screen best deals list */}
          {dailyDeals?.length > 0 && (
            <BestDeals products={dailyDeals} navigation={navigation} />
          )}
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;
