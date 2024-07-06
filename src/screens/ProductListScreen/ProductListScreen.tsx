import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Button, FlatList, HStack, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FilterIcon} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import ModalButton from '../../components/ModalButton';
import NoDataIllustration from '../../components/NoDataIllustartion';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {baseUrl} from '../../constants/main';
import {RootStackParamList} from '../../navigations/types';
import {GET_PRODUCTS_BY_CATEGORY_ID} from '../../services/ggl-queries/products';
import theme from '../../themes/theme';
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

  const {loading, error, data} = useQuery(GET_PRODUCTS_BY_CATEGORY_ID, {
    variables: {
      categoryUid: categoryId || null,
      pageSize: 10,
      currentPage: 1,
    },
    onCompleted: res => {
      setProducts(res.products.items);
    },
  });

  if (loading) {
    <SpinnerComponent />;
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
          <NoDataIllustration message={'No Products found'} />
        ) : (
          <>
            <FlatList
              data={products}
              renderItem={({item}) => (
                <Product product={item} navigation={navigation} />
              )}
              numColumns={2}
              keyExtractor={item => item.id}
              contentContainerStyle={{gap: 10}}
              columnWrapperStyle={{gap: 10}}
            />
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
  const [qnt, setQnt] = useState(0);
  return (
    <>
      <Box style={productListStyles.container}>
        <VStack space={2}>
          <TouchableOpacity onPress={() => navigation.navigate('Product')}>
            <Image
              style={productListStyles.image}
              source={{uri: product?.image?.url}}
              alt={product?.image?.label}
            />
          </TouchableOpacity>

          <Text variant="title1">{product?.name}</Text>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text variant="body2" style={productListStyles.prize}>
              ₹{product?.price_range?.maximum_price?.final_price?.value}
            </Text>
            {product?.variants?.length > 0 ? (
              <ModalButton
                title={product?.name}
                anchor={({open}) => (
                  <Button
                    variant={'outline'}
                    _text={{fontSize: 12}}
                    style={{
                      height: 40,
                      width: 100,
                      alignSelf: 'flex-end',
                    }}
                    onPress={open}>
                    {product?.variants?.length + ' ' + 'options'}
                  </Button>
                )}
                content={({close}) => (
                  <>
                    <VStack space={3}>
                      {product?.variants?.map((variant: any) => (
                        <ProductVariant variant={variant} />
                      ))}
                    </VStack>
                  </>
                )}
              />
            ) : (
              <Button
                onPress={() => {
                  setQnt(prev => prev++);
                }}
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
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export const CategoryHeader = ({
  title,
  categoryImageUrl,
  productsCount,
}: {
  title: string;
  categoryImageUrl: string;
  productsCount: number;
}) => {
  return (
    <>
      <HStack space={2}>
        <Box
          style={{
            height: 40,
            width: 40,
            aspectRatio: 1,
            backgroundColor: theme.colors.gray[500],
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {categoryImageUrl && (
            <Image
              source={{uri: `${baseUrl}/${categoryImageUrl}`}}
              style={{width: '80%', height: '80%'}}
              resizeMode="contain"
              alt={''}
            />
          )}
        </Box>
        <VStack>
          <Text variant={'subheader1'}>{title}</Text>
          <Text variant={'body2'}>{productsCount} items</Text>
        </VStack>
      </HStack>
    </>
  );
};

export const ProductVariant = ({variant}: any) => {
  const [qnt, setQnt] = useState(0);
  return (
    <>
      <HStack
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 16,

          justifyContent: 'space-between',
          elevation: 1,

          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}>
        <HStack alignItems={'center'} space={2}>
          <Box
            style={{
              height: 40,
              width: 40,
              aspectRatio: 1,
              backgroundColor: theme.colors.gray[500],
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {variant?.product?.image?.url && (
              <Image
                source={{uri: `${variant?.product?.image?.url}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={variant?.product?.image?.label}
              />
            )}
          </Box>
          <VStack>
            <Text variant="body2" style={productListStyles.prize}>
              {variant?.product?.name}
            </Text>
            <Text variant="body2" style={productListStyles.prize}>
              ₹
              {variant?.product?.price_range?.maximum_price?.final_price?.value}
            </Text>
          </VStack>
        </HStack>
        <Button
          onPress={() => {
            setQnt(prev => prev++);
          }}
          variant={'ghost'}
          _text={{fontSize: 14, fontWeight: 900}}
          style={{
            height: 40,
            width: 100,
          }}>
          ADD
        </Button>
      </HStack>
    </>
  );
};
