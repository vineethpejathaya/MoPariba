import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Box,
  Button,
  Divider,
  FlatList,
  Image,
  Text,
  Theme,
  VStack,
  useTheme,
} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FilterIcon, ShoppingBagIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
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

type ProductListScreenRouteProp = RouteProp<RootStackParamList, 'ProductList'>;
type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

export type ProductListScreenProps = {
  route: ProductListScreenRouteProp;
  navigation: ProductListScreenNavigationProp;
};

const ProductListScreen = ({route, navigation}: ProductListScreenProps) => {
  const {categoryName} = route.params;

  const theme = useTheme();
  const productStyles = createStyles(theme);
  return (
    <>
      <ScreenHeader
        title={categoryName}
        actions={[
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
            <Box style={productStyles.container}>
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
                  <Text variant="body2" style={productStyles.prize}>
                    {item.price}
                  </Text>
                  <Text variant="title1">{item.name}</Text>
                  <Text variant="body2" style={productStyles.weight}>
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
};

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

function createStyles(theme: Theme) {
  const styles = StyleSheet.create({
    container: {
      width: '50%',
      borderWidth: 1,
      borderColor: theme.colors.gray[200],
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
      fontSize: 12,
      color: theme.colors.primary[700],
    },
    weight: {
      fontSize: 12,
      color: theme.colors.gray[700],
    },
    addToCartBtn: {
      color: 'black',
    },
  });

  return styles;
}
