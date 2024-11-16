import {useQuery} from '@apollo/client';
import {Box, Text, VStack} from 'native-base';
import {useState} from 'react';
import {NoItemFound} from '../../assets/icons/Icons';
import NoDataIllustration from '../../components/NoDataIllustration';
import ProductCard from '../../components/ProductCard';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {GET_DAILY_DEAL_PRODUCTS} from '../../services/GGL-Queries/HomeScreen/Home.queries';
import {
  DailyDealProduct,
  GetDailyDealProductsQuery,
} from '../../services/GGL-Queries/HomeScreen/Home.type';
import bestDealsStyles from './BestDeals.styles';

function BestDeals() {
  const [products, setProducts] = useState<any[] | []>([]);
  const {loading} = useQuery<GetDailyDealProductsQuery>(
    GET_DAILY_DEAL_PRODUCTS,
    {
      onCompleted: res => {
        setProducts(res.dailyDealProducts);
      },
    },
  );

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader title={'Best Deals'} />
      <ScreenContent containerStyles={bestDealsStyles.mainContainer}>
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
            <Box style={bestDealsStyles.productListContainer}>
              {products?.map((product: DailyDealProduct, index: number) => (
                <ProductCard
                  key={product.sku}
                  productSku={product?.sku}
                  imgSource={product.image}
                  discount={product.discount}
                  price={product.final_price}
                  originalPrice={product.price}
                  title={product.name}
                />
              ))}
            </Box>
          </>
        )}
      </ScreenContent>
    </>
  );
}

export default BestDeals;
