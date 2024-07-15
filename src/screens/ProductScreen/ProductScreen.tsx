import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ShoppingBagIcon} from '../../assets/icons/Icons';
import FavoriteCheckbox from '../../components/FavoriteCheckBox';
import ProductOptions from '../../components/ProductOptions';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import StarRating from '../../components/StarRating';
import {RootStackParamList} from '../../navigations/types';
import {GET_PRODUCT_DETAILS} from '../../services/ggl-queries/products';
import theme from '../../themes/theme';
import productStyles from './styles';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

export type ProductScreenProps = {
  route: ProductScreenRouteProp;
  navigation: ProductScreenNavigationProp;
};

function ProductScreen({route, navigation}: ProductScreenProps) {
  const [qnt, setQnt] = useState(0);
  const {productSku} = route.params;
  const [product, setProduct] = useState<any | null>(null);

  const {loading, error, data} = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      sku: productSku || null,
      pageSize: 1,
      currentPage: 1,
    },
    onCompleted: res => {
      setProduct(res.products.items[0]);
    },
  });

  if (loading) {
    <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader />
      <ScreenContent>
        <VStack px={3}>
          <Box
            style={{
              flex: 1,
              width: '100%',
              height: 350,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: product?.image?.url}}
              alt={product?.name ?? 'Product Image'}
              resizeMethod={'resize'}
              resizeMode="contain"
              style={{width: '80%', height: '80%'}}
            />
          </Box>

          <VStack space={2}>
            <ProductBrief navigation={navigation} product={product} />
            <Text variant={'body1'} style={productStyles.text}>
              {product?.short_description?.html}
            </Text>
            {product?.variants?.length > 0 ? (
              <ProductOptions product={product} />
            ) : (
              <Button
                onPress={() => {
                  setQnt(prev => prev++);
                }}
                rightIcon={<ShoppingBagIcon />}
                variant={'outline'}
                _text={{fontSize: 12}}
                style={productStyles.btn}>
                Add to cart
              </Button>
            )}
          </VStack>
        </VStack>
      </ScreenContent>
    </>
  );
}

export default ProductScreen;

export const ProductBrief = ({navigation, product}: any) => {
  const currency = product?.price_range?.maximum_price?.final_price?.currency;
  const value = product?.price_range?.maximum_price?.final_price?.value;
  return (
    <>
      <VStack>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text variant={'subTitle1'} style={productStyles.prize}>
            {`${currency ?? ''} ${value ?? 0}`}
          </Text>
          <FavoriteCheckbox />
        </HStack>

        <Text variant={'header1'}>{product?.name}</Text>
        <HStack alignItems={'center'}>
          <StarRating rating={product?.rating_summary ?? 0} maxRating={5} />
          <Button
            variant={'link'}
            _text={{
              color: theme.colors.gray[900],
            }}
            onPress={() => navigation.navigate('Reviews')}>
            {`(${product?.review_count ?? 0} reviews)`}
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export const QuantityComponent = () => {
  return (
    <>
      <HStack style={productStyles.quantityContainer}>
        <Text style={[productStyles.text, {fontSize: 16}]} variant={'body1'}>
          Quantity
        </Text>
        <HStack space={2} alignItems="center">
          <IconButton
            icon={<FontAwesomeIcon name={'minus'} size={18} color={'green'} />}
            onPress={() => {}}
          />
          <Divider orientation="vertical" />
          <Text variant={'subheader1'}>3</Text>
          <IconButton
            icon={<FontAwesomeIcon name={'plus'} size={18} color={'green'} />}
            onPress={() => {}}
          />
          <Divider orientation="vertical" />
        </HStack>
      </HStack>
    </>
  );
};
