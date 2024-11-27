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

        const homeScreenDataResponse =
          await client.query<GetHomeScreenDataResponse>({
            query: GET_CATEGORIES,
            variables: {parentId: ['2'], pageSize: 8, currentPage: 1},
            fetchPolicy: 'network-only',
          });
        const {categories} = homeScreenDataResponse.data;

        const customerDetails = await client.query<any>({
          query: GET_CUSTOMER_DETAILS,
          fetchPolicy: 'network-only',
        });

        initializeCustomer(customerDetails?.data?.customer);

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

          <HomeBanner banners={banners} />

          {categoryItems?.length > 0 && (
            <HomeCategoryList navigation={navigation} state={homeScreenState} />
          )}
          {dailyDeals?.length > 0 && (
            <BestDeals products={dailyDeals} navigation={navigation} />
          )}
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;
