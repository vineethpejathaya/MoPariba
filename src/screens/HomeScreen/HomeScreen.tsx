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
import {RootStackParamList} from '../../navigations/types';
import {GET_HOME_SCREEN_DATA} from '../../services/ggl-queries/home';
import {CategoryItem} from '../../services/interfaces/category.interface';
import {Customer} from '../../services/interfaces/customer.interface';
import {GetHomeScreenDataResponse} from '../../services/interfaces/home.interface';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const toast = useToast();
  const [categories, setCategories] = useState<CategoryItem[] | []>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const {loading, error, data} = useQuery<GetHomeScreenDataResponse>(
    GET_HOME_SCREEN_DATA,
    {
      variables: {parentId: ['2'], pageSize: 10, currentPage: 1},
      onCompleted: res => {
        AsyncStorage.setItem('userDetails', JSON.stringify(res.customer));
        setCategories(res.categories.items);
        setCustomer(res.customer);
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
              Hey {customer?.firstname ?? '--'} {customer?.lastname ?? '--'},{' '}
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
          {categories?.length > 0 && (
            <CategoryList navigation={navigation} categories={categories} />
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
  categories,
}: {
  navigation: HomeScreenNavigationProp;
  categories: CategoryItem[] | null;
}) => {
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
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
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
          mt={4}
        />
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
