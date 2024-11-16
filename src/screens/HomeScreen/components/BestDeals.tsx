import {FlatList, VStack} from 'native-base';
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
              price={item.price}
              originalPrice={item.price}
              title={item.name}
            />
          )}
        />
      </VStack>
    </>
  );
}

export default BestDeals;
