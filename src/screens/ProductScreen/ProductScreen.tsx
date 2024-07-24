import {useQuery} from '@apollo/client';
import {Badge, Box, Button, HStack, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import FavoriteCheckbox from '../../components/FavoriteCheckBox';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import StarRating from '../../components/StarRating';
import {GET_PRODUCT_DETAILS} from '../../services/GGL-Queries/products';
import theme from '../../themes/theme';
import ProductStyles from './ProductScreen.styles';
import {ProductScreenProps} from './ProductScreen.types';

function ProductScreen({route, navigation}: ProductScreenProps) {
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
      <ScreenHeader
        leftActions={[<Text variant={'subheader1'}>{product?.name}</Text>]}
      />
      <ScreenContent containerStyles={{paddingBottom: 0}}>
        <VStack space={3}>
          <Box style={[ProductStyles.container, ProductStyles.card]}>
            <Box style={ProductStyles.imageContainer}>
              <Badge
                style={ProductStyles.discount}
                _text={ProductStyles.discText}>
                {'16% off'}
              </Badge>
              <Image
                style={ProductStyles.image}
                source={{uri: product?.image?.url}}
                alt={product?.name ?? 'Product Image'}
                resizeMode="contain"
              />
            </Box>
            <ProductBrief navigation={navigation} product={product} />
          </Box>
          <Box style={[ProductStyles.card, {marginBottom: 20}]}>
            <VStack space={2}>
              <Text variant={'header2'} fontSize={'2xl'}>
                Description
              </Text>
              <Text variant={'body1'} style={ProductStyles.text}>
                {product?.short_description?.html}
              </Text>
            </VStack>
          </Box>
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
      <VStack mt={2}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text variant={'header1'}>{product?.name}</Text>
          <FavoriteCheckbox />
        </HStack>

        <VStack space={1}>
          <Text variant={'title1'} style={ProductStyles.prize}>
            {`${currency ?? ''} ${value ?? 0}`}
          </Text>
          <HStack space={1} alignItems={'center'}>
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
      </VStack>
    </>
  );
};
