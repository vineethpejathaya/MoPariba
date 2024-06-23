import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Divider,
  FlatList,
  Image,
  Text,
  VStack,
  theme,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';

const data = [
  {
    id: '1',
    name: 'Fresh Peach',
    price: '$8.00',
    weight: 'dozen',
    image: require('../../assets/images/pngs/Group-32.png'),
    new: false,
  },
  {
    id: '2',
    name: 'Avocado',
    price: '$7.00',
    weight: '2.0 lbs',
    image: require('../../assets/images/pngs/avocado.png'),
    new: true,
  },
  {
    id: '3',
    name: 'Pineapple',
    price: '$9.90',
    weight: '1.50 lbs',
    image: require('../../assets/images/pngs/pineapple-pieces.png'),
    favorite: true,
  },
  {
    id: '4',
    name: 'Black Grapes',
    price: '$7.05',
    weight: '5.0 lbs',
    image: require('../../assets/images/pngs/grapes-31.png'),
    discount: '-16%',
  },
  {
    id: '5',
    name: 'Pomegranate',
    price: '$2.09',
    weight: '1.50 lbs',
    image: require('../../assets/images/pngs/pomegranate-11.png'),
    new: true,
  },
  {
    id: '6',
    name: 'Fresh Broccoli',
    price: '$3.00',
    weight: '1 kg',
    image: require('../../assets/images/pngs/green-fresh-broccoli.png'),
    favorite: true,
  },
];

type CategoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Category'
>;

type Props = {
  navigation: CategoryScreenNavigationProp;
};
const CategoryPage = ({navigation}: Props) => {
  return (
    <>
      <ScreenHeader title={'Vegetables'} />
      <ScreenContent>
        <FlatList
          data={data}
          renderItem={ProductCard}
          numColumns={2}
          columnWrapperStyle={{gap: 10, paddingHorizontal: 12}}
          contentContainerStyle={{gap: 10, paddingBottom: 16}}
          keyExtractor={item => item.id}
        />
      </ScreenContent>
    </>
  );
};

export default CategoryPage;

interface Product {
  id: number;
  name: string;
  price: string;
  weight: string;
  image?: string;
  favorite?: boolean;
  new?: boolean;
  discount?: number;
}
function ProductCard({item}: any) {
  const productStyles = createStyles();
  return (
    <>
      <Box style={productStyles.container}>
        <Image
          source={item?.image}
          alt={item?.name}
          resizeMode="contain"
          height={150}
        />
        <VStack space={1} style={{paddingBottom: 3}} alignItems={'center'}>
          <Text variant="body2" style={productStyles.prize}>
            {item.price}
          </Text>
          <Text variant="title1">{item.name}</Text>
          <Text variant="body2" style={{color: theme.colors.gray[700]}}>
            {item.weight}
          </Text>
        </VStack>
        <Divider />
        <CartButton />
      </Box>
    </>
  );
}

function CartButton() {
  return (
    <>
      <Button
        onPress={() => {}}
        _text={{color: 'black'}}
        style={{padding: 0, width: '100%'}}
        variant="ghost">
        Add to cart
      </Button>
    </>
  );
}

function createStyles() {
  const styles = StyleSheet.create({
    container: {
      width: '50%',
      borderWidth: 1,
      borderColor: theme.colors.gray[200],
      borderRadius: 10,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    new: {
      borderColor: theme.colors.primary[100],
      width: 38,
      height: 18,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    favorite: {
      borderColor: 'red.400',
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    discount: {
      borderColor: 'red.400',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    image: {
      width: 20,
      height: 94,
      objectFit: 'contain',
    },
    prize: {
      color: theme.colors.primary[700],
    },

    addToCartBtn: {
      color: 'black',
    },
  });

  return styles;
}
