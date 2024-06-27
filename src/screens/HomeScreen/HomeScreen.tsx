import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Input,
  theme as NativeTheme,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MenuIcon, NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';
import {GET_CATEGORIES} from '../../services/GGL-Queries/Home';

const altImage = require('../../assets/images/pngs/altImage.png');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const {loading, error, data} = useQuery(GET_CATEGORIES, {
    variables: {parentId: ['2'], pageSize: 10, currentPage: 1},
    onCompleted: res => {
      console.log(res, 'result');
      setCategories(res.categories.items);
    },
  });

  const checkForUserToken = async () => {
    const data = await AsyncStorage.getItem('userToken');
    console.log(data, 'userToken');
  };

  useEffect(() => {
    const initialize = async () => {
      await checkForUserToken();
    };

    initialize();
  }, []);

  if (loading) {
    <Spinner />;
  }
  return (
    <>
      <ScreenHeader
        leftComponents={[
          <CustomIconButton
            SvgIcon={<MenuIcon />}
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
        actions={[
          <CustomIconButton
            SvgIcon={<NotificationIcon />}
            BtnStyles={{backgroundColor: '#181C2E'}}
            iconSize={25}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />,
        ]}
      />
      <ScreenContent flex={1}>
        <VStack px={4} alignItems={'stretch'}>
          <Box>
            <Text mb={4} variant={'title2'}>
              Hey Halal, <Text style={{fontWeight: 700}}>How are you!</Text>
            </Text>
            <Input
              onPress={() => {
                navigation.navigate('Search');
              }}
              InputLeftElement={
                <Icon name="search" size={25} style={{padding: 10}} />
              }
              placeholder="Search dishes, restaurants"
            />
          </Box>
          <CategoryList navigation={navigation} categories={categories} />
          <GroceryShopList />
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;

export const CategoryList = ({navigation, categories}: any) => {
  const theme = useTheme();

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mt={4}>
        <Text variant={'header2'}>All Categories</Text>
        <Button
          variant="link"
          rightIcon={<Icon name="chevron-right" size={20} />}
          onPress={() => {}}>
          See All
        </Button>
      </HStack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}: any) => (
          <Box style={CategoryStyles.container}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Category', {name: item.name})
              }>
              <Center>
                <Box style={CategoryStyles.image}>
                  <Image
                    source={item?.image ?? altImage}
                    alt={item?.name}
                    resizeMode="contain"
                  />
                </Box>

                <Text variant={'subheader2'} style={CategoryStyles.title}>
                  {item.name}
                </Text>
              </Center>
            </TouchableOpacity>
          </Box>
        )}
        keyExtractor={(item: any) => item.uid}
        mt={4}
      />
    </>
  );
};

export const GroceryShopList = () => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mt={4}>
        <Text variant={'header2'}>Open Grocery Shop</Text>
        <Button
          variant="link"
          rightIcon={<Icon name="chevron-right" size={20} />}
          onPress={() => {}}>
          See All
        </Button>
      </HStack>
      <Box bg="gray.200" p={4} borderRadius="lg">
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize="lg" bold>
              Grocery Shop
            </Text>
            <Text>Fruit, Vegetable</Text>
            <HStack mt={2}>
              <HStack alignItems="center" mr={4}>
                {/* <Icon name="star" color="orange.500" /> */}
                <Text ml={1}>4.7</Text>
              </HStack>
              <HStack alignItems="center" mr={4}>
                {/* <Icon name="truck" color="orange.500" /> */}
                <Text ml={1}>Free</Text>
              </HStack>
              <HStack alignItems="center">
                {/* <Icon name="clock-o" color="orange.500" /> */}
                <Text ml={1}>20 min</Text>
              </HStack>
            </HStack>
          </VStack>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            alt="Grocery Shop"
            size="lg"
            borderRadius="lg"
          />
        </HStack>
      </Box>
    </>
  );
};

export const CategoryStyles = StyleSheet.create({
  container: {
    backgroundColor: NativeTheme.colors.white,
    padding: 5,
    margin: 4,
    height: 144,
    borderRadius: 10,
    width: 147,
    elevation: 1,
    alignItems: 'center',
  },

  image: {
    backgroundColor: NativeTheme.colors.white,
    borderRadius: 10,
    objectFit: 'contain',
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
  },
});
