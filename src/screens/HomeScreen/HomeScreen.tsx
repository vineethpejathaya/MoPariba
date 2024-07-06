import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  FlatList,
  Input,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MenuIcon, NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import CategoryCard from '../../components/CategoryCard';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import ShopCard from '../../components/ShopyCard';
import SpinnerComponent from '../../components/SpinnerComponent';
import TitleActions from '../../components/TitleActions';
import {baseUrl} from '../../constants/main';
import {RootStackParamList} from '../../navigations/types';
import {GET_HOME_SCREEN_DATA} from '../../services/ggl-queries/home';
import {CategoryItem} from '../../services/interfaces/category.interface';
import {
  GetHomeScreenDataResponse,
  HomeScreenState,
} from '../../services/interfaces/home.interface';

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
  const toast = useToast();
  const [homeScreenState, setHomeScreenState] =
    useState<HomeScreenState>(defaultState);
  const {loading, error, data} = useQuery<GetHomeScreenDataResponse>(
    GET_HOME_SCREEN_DATA,
    {
      variables: {parentId: ['2'], pageSize: 10, currentPage: 1},
      onCompleted: res => {
        AsyncStorage.setItem('userDetails', JSON.stringify(res.customer));
        setHomeScreenState(prev => ({
          categories: res.categories,
          customer: res.customer,
          categoryItems: res.categories.items,
        }));
      },
      onError: err => {
        toast.show({description: err.message});
      },
    },
  );

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
          <Box>
            <Text
              variant={'subheader2'}
              style={{color: theme.colors.primary[200], fontSize: 12}}>
              DELIVER TO
            </Text>
            <Text variant="subTitle2">Halal Lab office</Text>
          </Box>,
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
        <VStack px={4} justifyContent={'space-between'}>
          <Box>
            <Text
              mb={4}
              variant={'title2'}
              style={{textTransform: 'capitalize'}}>
              Hey {homeScreenState?.customer?.firstname ?? '--'}{' '}
              {homeScreenState?.customer?.lastname ?? '--'},{' '}
              <Text style={{fontWeight: 700}}>How are you!</Text>
            </Text>
            <Input
              onPress={() => {
                navigation.navigate('Search');
              }}
              variant={'outline'}
              InputLeftElement={
                <Icon
                  name="search"
                  size={25}
                  style={{
                    padding: 10,
                    color: theme.colors.gray[900],
                    backgroundColor: '#F6F6F6',
                  }}
                />
              }
              placeholder="Search dishes, restaurants"
            />
          </Box>
          {homeScreenState?.categoryItems?.length > 0 && (
            <CategoryList navigation={navigation} state={homeScreenState} />
          )}
          <GroceryShopList />
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
  return (
    <>
      <Box>
        <TitleActions
          title="All Categories"
          btnText="See all"
          onPress={() => {
            navigation.navigate('Category', {parentId: 2});
          }}
        />
        <Box>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoryItems}
            renderItem={({item}: {item: CategoryItem}) => (
              <CategoryCard
                title={item.name}
                imageUrl={item.sw_menu_icon_img}
                onPress={() => {
                  if (item.children_count > 0) {
                    navigation.navigate('Category', {
                      categoryUid: item.uid,
                      categoryName: item.name,
                    });
                  } else {
                    navigation.navigate('ProductList', {
                      categoryId: item.uid,
                      categoryName: item.name,
                      categoryImageUrl: `${baseUrl}/${item.sw_menu_icon_img}`,
                      totalProductCount: categories?.total_count ?? 0,
                    });
                  }
                }}
              />
            )}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 5,
            }}
            keyExtractor={(item: any) => item.uid}
          />
        </Box>
      </Box>
    </>
  );
};

export const GroceryShopList = () => {
  return (
    <>
      <TitleActions
        title="Open Grocery Shop"
        btnText="See all"
        onPress={() => {}}
      />
      <ShopCard />
    </>
  );
};
