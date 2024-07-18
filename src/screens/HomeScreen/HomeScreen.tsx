import {useApolloClient} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, HStack, Image, Text, VStack, useTheme} from 'native-base';
import {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  CameraIcon,
  FaceSavoringFood,
  Fire,
  MenuIcon,
  NotificationIcon,
} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import CategoryItem from '../../components/CategoryItem';
import ProductCard from '../../components/ProductCard';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import SpinnerComponent from '../../components/SpinnerComponent';
import TitleActions from '../../components/TitleActions';
import {ProductItemInterface, banners, products} from '../../constants/main';
import {useAuth} from '../../hooks/UseAuth';
import {useCart} from '../../hooks/UseCart';
import {RootStackParamList} from '../../navigations/types';
import {
  CREATE_CART_MUTATION,
  GET_CUSTOMER_CART,
} from '../../services/ggl-queries/cart';
import {GET_HOME_SCREEN_DATA} from '../../services/ggl-queries/home';
import {CategoryItemInterface} from '../../services/interfaces/category.interface';
import {
  GetHomeScreenDataResponse,
  HomeScreenState,
} from '../../services/interfaces/home.interface';
import HomeScreenStyles from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const defaultState = {
  categories: null,
  categoryItems: [],
  customer: null,
};

function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const {isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const {setCartId, setCart, cart} = useCart();
  const [homeScreenState, setHomeScreenState] =
    useState<HomeScreenState>(defaultState);
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

        setHomeScreenState(prev => ({
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

        setHomeScreenState(prev => ({
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

  // const {loading, error, data} = useQuery<GetHomeScreenDataResponse>(
  //   GET_HOME_SCREEN_DATA,
  //   {
  //     fetchPolicy: 'network-only',
  //     variables: {parentId: ['2'], pageSize: 8, currentPage: 1},
  //     onCompleted: res => {
  //       AsyncStorage.setItem('userDetails', JSON.stringify(res.customer));
  //       setHomeScreenState(prev => ({
  //         categories: res.categories,
  //         customer: res.customer,
  //         categoryItems: res.categories.items,
  //       }));
  //     },
  //   },
  // );

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
            fontSize={'xl'}
            style={{textTransform: 'capitalize'}}>
            Hey {customer?.firstname ?? '--'} {customer?.lastname ?? '--'},{' '}
            <Text fontWeight={'bold'}>How are you!</Text>
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
          <BannerSection />

          {categoryItems?.length > 0 && (
            <CategoryList navigation={navigation} state={homeScreenState} />
          )}
          <BestDeals products={products} />
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;

export const CategoryList = ({
  navigation,
  state,
}: {
  navigation: HomeScreenNavigationProp;
  state: HomeScreenState;
}) => {
  const {categoryItems, categories} = state;

  const handleNavigation = (categoryItem: CategoryItemInterface) => {
    if (categoryItem.children_count > 0) {
      navigation.navigate('Category', {
        categoryUid: categoryItem.uid,
        categoryName: categoryItem.name,
      });
    } else {
      navigation.navigate('ProductList', {
        categoryId: categoryItem.uid,
        categoryName: categoryItem.name,
        categoryImageUrl: `${categoryItem.sw_menu_icon_img}`,
        totalProductCount: categories?.total_count ?? 0,
      });
    }
  };

  return (
    <>
      <VStack>
        <TitleActions
          title={
            <HStack alignItems={'center'} space={2}>
              <Text variant={'body2'} lineHeight={'md'} fontSize={'xl'}>
                Categories
              </Text>
              <FaceSavoringFood />
            </HStack>
          }
          btnText="See all"
          onPress={() => {
            navigation.navigate('Category', {parentId: 2});
          }}
        />

        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {categoryItems?.map(
            (category: CategoryItemInterface, index: number) => (
              <CategoryItem
                key={category.uid}
                title={category.name}
                imageUrl={category.sw_menu_icon_img}
                onPress={() => handleNavigation(category)}
              />
            ),
          )}
        </Box>
      </VStack>
    </>
  );
};

const BannerSection = () => {
  return (
    <Box style={HomeScreenStyles.container}>
      <Swiper autoplay={true} loop={true}>
        {banners.map((banner, index: number) => (
          <Box key={index} style={HomeScreenStyles.slide}>
            <Image
              source={banner}
              alt="banner"
              style={HomeScreenStyles.bannerImage}
            />
          </Box>
        ))}
      </Swiper>
    </Box>
  );
};

export const BestDeals = ({products}: {products: ProductItemInterface[]}) => {
  return (
    <>
      <VStack>
        <TitleActions
          title={
            <HStack alignItems={'center'} space={2}>
              <Text variant={'body2'} lineHeight={'md'} fontSize={'xl'}>
                Best deals
              </Text>
              <Fire />
            </HStack>
          }
          btnText="See all"
          onPress={() => {}}
        />

        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {products?.map((product: ProductItemInterface, index: number) => (
            <ProductCard
              key={index}
              imgSource={product?.image}
              discount={product.discount}
              price={product.price}
              originalPrice={product.originalPrice}
              title={product.title}
            />
          ))}
        </Box>
      </VStack>
    </>
  );
};
