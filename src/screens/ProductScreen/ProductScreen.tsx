import {useQuery} from '@apollo/client';
import {Badge, Box, Button, HStack, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ExpandableDetailsCard from '../../components/ExpandableDetailsCard';
import ProductOptions from '../../components/ProductOptions';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {GET_PRODUCT_DETAILS} from '../../services/GGL-Queries/Products/Product.queries';
import {Product} from '../../services/GGL-Queries/Products/Product.type';
import theme from '../../themes/theme';
import ProductStyles from './ProductScreen.styles';
import {ProductScreenProps} from './ProductScreen.types';

const renderIfExists = (value: any, render: () => JSX.Element) => {
  return value ? render() : null;
};

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
      console.log(res.products.items[0]?.variants, 'data');
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
      <ScreenContent
        showCart
        containerStyles={{paddingHorizontal: 15, paddingTop: 10}}>
        <VStack space={3}>
          <Box style={[ProductStyles.container, ProductStyles.card]}>
            <Box style={ProductStyles.imageContainer}>
              <Badge
                style={ProductStyles.discount}
                _text={ProductStyles.discText}>
                {'16% off'}
              </Badge>
              {product?.image?.url && (
                <Image
                  style={ProductStyles.image}
                  source={{uri: product?.image?.url || ''}}
                  alt={product?.name ?? 'Product Image'}
                  resizeMode="contain"
                />
              )}
            </Box>
            <ProductBrief product={product} />
          </Box>

          {renderIfExists(product?.short_description?.html, () => (
            <ExpandableDetailsCard title={'Description'} keepExpanded>
              <Text variant={'body1'}>{product?.short_description?.html}</Text>
            </ExpandableDetailsCard>
          ))}
        </VStack>
      </ScreenContent>
    </>
  );
}

export default ProductScreen;

export const ProductBrief = ({product}: {product: Product}) => {
  const currency = product?.price_range?.maximum_price?.final_price?.currency;
  const value = product?.price_range?.maximum_price?.final_price?.value;
  return (
    <>
      <VStack mt={2}>
        <HStack alignItems={'flex-end'} justifyContent={'space-between'}>
          {/* Product name and price */}
          <VStack space={1} flex={1}>
            <Text variant={'header1'}>{product?.name}</Text>
            <Text variant={'title1'} style={ProductStyles.prize}>
              {`${currency ?? ''} ${value ?? 0}`}
            </Text>
          </VStack>
          {/* Product options */}
          {product?.variants?.length > 0 ? (
            <ProductOptions product={product} />
          ) : (
            <Button
              variant={'outline'}
              _text={styles.btnText}
              style={styles.btn}>
              Add
            </Button>
          )}
        </HStack>
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 35,
    width: 100,
    padding: 1,
    borderColor: theme.colors.gray[700],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },

  btnText: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'DMSans-Bold',
    color: theme.colors.primary[900],
  },
});
