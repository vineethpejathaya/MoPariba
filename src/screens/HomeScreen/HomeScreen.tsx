import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  Input,
  theme as NativeTheme,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MenuIcon, NotificationIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';

const categories = [
  {
    id: '1',
    name: 'Veggie',
    price: '$70',
    image: require('../../assets/images/pngs/pineapple-pieces.png'),
  },
  {
    id: '2',
    name: 'Fruits',
    price: '$50',
    image: require('../../assets/images/pngs/pomegranate-11.png'),
  },
  {
    id: '2',
    name: 'Veggie',
    price: '$50',
    image: require('../../assets/images/pngs/green-fresh-broccoli.png'),
  },
  // add more categories as needed
];

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  const theme = useTheme();
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
          <CategoryList navigation={navigation} />
          <GroceryShopList />
        </VStack>
      </ScreenContent>
    </>
  );
}

export default HomeScreen;

export const CategoryList = ({navigation}: any) => {
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
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Box style={CategoryStyles.container}>
              <Image
                style={CategoryStyles.image}
                source={item.image}
                alt={item?.name}
                resizeMode="contain"
                height={140}
                width={122}
              />

              <Text variant={'subheader2'}>{item.name}</Text>
              <HStack space={3}>
                <Text>Starting</Text>
                <Text>{item.price}</Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
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
                <Icon name="star" color="orange.500" />
                <Text ml={1}>4.7</Text>
              </HStack>
              <HStack alignItems="center" mr={4}>
                <Icon name="truck" color="orange.500" />
                <Text ml={1}>Free</Text>
              </HStack>
              <HStack alignItems="center">
                <Icon name="clock-o" color="orange.500" />
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
    padding: 4,
    margin: 4,
    borderRadius: 10,
    width: 147,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  image: {
    borderRadius: 10,
    objectFit: 'contain',
    zIndex: 1,
  },
});
