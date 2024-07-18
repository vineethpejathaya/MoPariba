import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Badge, Box, Button, HStack, Image, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FilterIcon, NoItemFound} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import {CategoryHeader} from '../../components/CategoryHeader';
import FavoriteCheckbox from '../../components/FavoriteCheckBox';
import NoDataIllustration from '../../components/NoDataIllustartion';
import ProductOptions from '../../components/ProductOptions';
import QuantityButton from '../../components/QuantityButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {useCart} from '../../hooks/UseCart';
import {RootStackParamList} from '../../navigations/types';
import {GET_PRODUCTS_BY_CATEGORY_ID} from '../../services/ggl-queries/products';
import {transformCartItemsToMap} from '../../services/utlis';
import productListStyles from './styles';

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
  const {categoryName, categoryId, totalProductCount, categoryImageUrl} =
    route.params;
  const [products, setProducts] = useState<any[] | []>([]);

  const {loading, error, data, refetch} = useQuery(
    GET_PRODUCTS_BY_CATEGORY_ID,
    {
      variables: {
        categoryUid: categoryId || null,
        pageSize: 10,
        currentPage: 1,
      },
      onCompleted: res => {
        setProducts(res.products.items);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader
        leftActions={[
          <CategoryHeader
            title={categoryName}
            productsCount={data?.products?.total_count}
            categoryImageUrl={categoryImageUrl}
          />,
        ]}
        rightActions={[
          <CustomIconButton
            svgIcon={<FilterIcon />}
            BtnStyles={{backgroundColor: 'white'}}
            iconSize={15}
            onPress={() => {}}
          />,
        ]}
      />
      <ScreenContent>
        {products.length == 0 ? (
          <NoDataIllustration
            message={
              <Box
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NoItemFound />
                <Text variant={'title1'}>{'No Products Found!'}</Text>
              </Box>
            }
          />
        ) : (
          <>
            <Box style={productListStyles.productListContainer}>
              {products?.map((product: any, index: number) => (
                <Product
                  key={index}
                  product={product}
                  navigation={navigation}
                />
              ))}
            </Box>
          </>
        )}
      </ScreenContent>
    </>
  );
}

export default ProductListScreen;

const Product = ({
  product,
  navigation,
}: {
  product: any;
  navigation: ProductListScreenNavigationProp;
}) => {
  const {cart} = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const map = transformCartItemsToMap(cart);
    const isProductInCart = map.has(product?.sku);
    const productInCart = map.get(product?.sku);
    const quantity = productInCart?.reduce(
      (acc: any, curr: any) => curr?.quantity + acc,
      0,
    );
    setQuantity(quantity);
    setIsProductInCart(isProductInCart);
  }, [cart, quantity, isProductInCart]);

  const price = product?.price_range?.maximum_price?.final_price?.value;

  return (
    <>
      <Box style={productListStyles.container}>
        <Badge
          style={productListStyles.discount}
          _text={productListStyles.discText}>
          {'16%'}
        </Badge>
        <Badge style={productListStyles.fav}>
          <FavoriteCheckbox iconSize={20} />
        </Badge>
        <VStack space={2}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product', {
                productSku: product?.sku,
              })
            }>
            <Image
              style={productListStyles.image}
              source={{uri: product?.image?.url}}
              alt={product?.image?.label}
            />
          </TouchableOpacity>
          <Text variant="title1">{product?.name}</Text>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text variant="body2" style={productListStyles.prize}>
              ₹{price ?? 0}
            </Text>
            {isProductInCart ? (
              <VStack alignItems={'center'} space={2}>
                <QuantityButton quantity={quantity ?? 0} />
                {product?.variants?.length > 0 && (
                  <ProductOptions
                    product={product}
                    btn={<Text variant={'body2'}>View Options</Text>}
                  />
                )}
              </VStack>
            ) : (
              <>
                {product?.variants?.length > 0 ? (
                  <ProductOptions product={product} />
                ) : (
                  <Button
                    variant={'outline'}
                    _text={{fontSize: 12}}
                    style={{
                      height: 40,
                      width: 100,
                      alignSelf: 'flex-end',
                    }}>
                    Add
                  </Button>
                )}
              </>
            )}
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
