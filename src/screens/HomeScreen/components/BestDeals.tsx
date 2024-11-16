import {Box, FlatList, VStack} from 'native-base';
import {Fire} from '../../../assets/icons/Icons';
import ProductCard from '../../../components/ProductCard';
import TitleActions from '../../../components/TitleActions';
import {DailyDealProduct} from '../../../services/GGL-Queries/HomeScreen/Home.type';
import {HomeScreenNavigationProp} from '../Home.type';

function BestDeals({
  navigation,
  products,
}: {
  navigation: HomeScreenNavigationProp;
  products: DailyDealProduct[];
}) {
  return (
    <>
      <VStack>
        <TitleActions
          title={' Best deals'}
          titleIcon={<Fire />}
          btnText="See all"
          onPress={() => {
            navigation.navigate('BestDeals');
          }}
        />

        <FlatList
          data={products}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: {item: DailyDealProduct}) => (
            <ProductCard
              key={item.sku}
              imgSource={item.image}
              discount={item.discount}
              price={item.final_price}
              originalPrice={item.price}
              title={item.name}
              containerStyles={{width: 163}}
            />
          )}
          ItemSeparatorComponent={() => <Box width={4} />}
        />
      </VStack>
    </>
  );
}

export default BestDeals;
