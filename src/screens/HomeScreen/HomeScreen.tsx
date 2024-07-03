import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, FlatList, Input, Text, VStack, useTheme} from 'native-base';
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
import {GET_HOME_SCREEN_DATA} from '../../services/GGL-Queries/Home';
import {
  CategoryItem,
  Customer,
  GetHomeScreenDataResponse,
} from '../../services/interfaces/Home';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  const theme = useTheme();
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
                    color: 'gray.200',
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
            navigation.navigate('Category', {
              categoryName: '',
            });
          }}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({item}: any) => (
            <CategoryCard
              title={item.name}
              price={item.price}
              imageUrl={item.image}
              onPress={() => {
                console.log('clicked home');
              }}
            />
          )}
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
