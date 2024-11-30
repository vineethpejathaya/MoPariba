import {useQuery} from '@apollo/client';
import {Box, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {NoItemFound} from '../../assets/icons/Icons';
import {CategoryHeader} from '../../components/CategoryHeader';
import CategoryProduct from '../../components/CategoryProduct';
import NoDataIllustration from '../../components/NoDataIllustration';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';

import {GET_PRODUCTS_BY_CATEGORY_ID} from '../../services/GGL-Queries/Products/Product.queries';
import {
  GetProductsResponse,
  Product,
} from '../../services/GGL-Queries/Products/Product.type';
import productListStyles from './ProductList.styles';
import {ProductListScreenProps} from './ProductList.type';

function ProductListScreen({route, navigation}: ProductListScreenProps) {
  const {categoryName, categoryId, categoryImageUrl} = route.params;
  const [products, setProducts] = useState<any[] | []>([]);
  const {loading, data} = useQuery<GetProductsResponse>(
    GET_PRODUCTS_BY_CATEGORY_ID,
    {
      variables: {
        categoryUid: categoryId || null,
        pageSize: 20,
        currentPage: 1,
      },
      onCompleted: res => {
        setProducts(res.products.items);
      },
    },
  );

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      {/* Screen header */}
      <ScreenHeader
        leftActions={[
          <CategoryHeader
            title={categoryName}
            productsCount={data?.products?.total_count ?? 0}
            categoryImageUrl={categoryImageUrl}
          />,
        ]}
        // rightActions={[
        //   <CustomIconButton
        //     svgIcon={<FilterIcon />}
        //     BtnStyles={{backgroundColor: 'white'}}
        //     iconSize={15}
        //     onPress={() => {}}
        //   />,
        // ]}
      />

      {/* Screen content  if no data is present then No products illustration is rendered if not then products list is rendered*/}
      <ScreenContent showCart containerStyles={productListStyles.mainContainer}>
        {products.length == 0 ? (
          <NoDataIllustration
            message={
              <VStack alignItems={'center'}>
                <NoItemFound />
                <Text variant={'title1'}>{'No Products Found!'}</Text>
              </VStack>
            }
          />
        ) : (
          <>
            <Box style={productListStyles.productListContainer}>
              {products?.map((product: Product, index: number) => (
                <CategoryProduct key={index} product={product} />
              ))}
            </Box>
          </>
        )}
      </ScreenContent>
    </>
  );
}

export default ProductListScreen;
