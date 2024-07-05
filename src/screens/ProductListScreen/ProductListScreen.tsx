import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useQuery} from '@apollo/client';
import {Box, Button, FlatList, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {FilterIcon, ShoppingBagIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';
import {GET_PRODUCTS_BY_CATEGORY_ID} from '../../services/ggl-queries/products';
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
  // const {categoryName, categoryId} = route.params;
  const [products, setProducts] = useState<any[] | []>([]);

  const {loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORY_ID, {
    variables: {
      categoryUid: 'NA==' || null,
      pageSize: 10,
      currentPage: 1,
    },
    onCompleted: res => {
      setProducts(res.products.items);
    },
  });

  console.log(products, 'products');

  return (
    <>
      <ScreenHeader
        title={''}
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
          data={products}
          renderItem={({item}) => {
            return (
              <>
                {/* <Box style={productListStyles.container}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Product')}>
                    <Box
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        backgroundColor: theme.colors.gray[900],
                      }}>
                      <Image
                        style={productListStyles.image}
                        source={{uri: item?.image?.url}}
                        alt={item?.image?.label}
                      />
                    </Box>
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
                </Box> */}

                <Box style={productListStyles.container}>
                  <VStack space={2}>
                    <Image
                      source={{uri: item.imageUrl}}
                      alt={item.name}
                      size="xl"
                    />
                    <Text variant="title1">{item.name}</Text>
                    <Text variant="body2" style={productListStyles.weight}>
                      {item.weight}
                    </Text>
                    <Text>{item.weight}</Text>
                    <Text textDecorationLine="line-through">
                      ₹{item.originalPrice}
                    </Text>
                    <Text fontWeight="bold">₹{item.discountedPrice}</Text>
                    {/* {item.options.length > 0 ? (
                      <Select
                        selectedValue={item.options[0]}
                        minWidth="200"
                        accessibilityLabel="Choose option"
                        placeholder="Choose option"
                        _selectedItem={{
                          bg: 'teal.600',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}></Select>
                    ) : (
                
                    )} */}
                    <Button variant={'outline'} mt={2}>
                      Add
                    </Button>
                  </VStack>
                </Box>
              </>
            );
          }}
          numColumns={2}
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
