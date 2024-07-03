import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Box, Button, Divider, FlatList, Image, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FilterIcon, ShoppingBagIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';
import productListStyles from './styles';

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

type ProductListScreenRouteProp = RouteProp<RootStackParamList, 'ProductList'>;
type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

export type ProductListScreenProps = {
  route: ProductListScreenRouteProp;
  navigation: ProductListScreenNavigationProp;
};

function ProductListScreen({route, navigation}: ProductListScreenProps) {
  const {categoryName} = route.params;

  return (
    <>
      <ScreenHeader
        title={categoryName}
        rightActions={[
          <CustomIconButton
            svgIcon={<FilterIcon />}
            BtnStyles={{backgroundColor: 'white'}}
            iconSize={25}
            onPress={() => {}}
          />,
        ]}
      />
      <ScreenContent>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Box style={productListStyles.container}>
              <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                <Image
                  source={item?.image}
                  alt={item?.name}
                  resizeMode="contain"
                  height={150}
                />
                <VStack
                  space={1}
                  style={{paddingBottom: 3}}
                  alignItems={'center'}>
                  <Text variant="body2" style={productListStyles.prize}>
                    {item.price}
                  </Text>
                  <Text variant="title1">{item.name}</Text>
                  <Text variant="body2" style={productListStyles.weight}>
                    {item.weight}
                  </Text>
                </VStack>
              </TouchableOpacity>
              <Divider />
              <CartButton />
            </Box>
          )}
          numColumns={2}
          columnWrapperStyle={{gap: 10, paddingHorizontal: 12}}
          contentContainerStyle={{gap: 10, paddingBottom: 16}}
          keyExtractor={item => item.id}
        />
      </ScreenContent>
    </>
  );
}

export default ProductListScreen;

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

function CartButton() {
  return (
    <>
      <Button
        onPress={() => {}}
        _text={{color: 'black'}}
        style={{padding: 0, width: '100%'}}
        variant="ghost"
        leftIcon={<ShoppingBagIcon />}>
        Add to cart
      </Button>
    </>
  );
}
