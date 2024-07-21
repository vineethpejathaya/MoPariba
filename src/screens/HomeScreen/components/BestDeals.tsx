import {Box, VStack} from 'native-base';
import {Fire} from '../../../assets/icons/Icons';
import ProductCard from '../../../components/ProductCard';
import TitleActions from '../../../components/TitleActions';
import {ProductItemInterface} from '../../../constants/main';

function BestDeals({products}: {products: ProductItemInterface[]}) {
  return (
    <>
      <VStack>
        <TitleActions
          title={' Best deals'}
          titleIcon={<Fire />}
          btnText="See all"
          onPress={() => {}}
        />

        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {products?.map((product: ProductItemInterface, index: number) => (
            <ProductCard
              key={index}
              imgSource={product?.image}
              discount={product.discount}
              price={product.price}
              originalPrice={product.originalPrice}
              title={product.title}
            />
          ))}
        </Box>
      </VStack>
    </>
  );
}

export default BestDeals;
