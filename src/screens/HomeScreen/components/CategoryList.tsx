import {Box, VStack} from 'native-base';
import {FaceSavoringFood} from '../../../assets/icons/Icons';
import CategoryItem from '../../../components/CategoryItem';
import TitleActions from '../../../components/TitleActions';
import {CategoryItemInterface} from '../../../services/GGL-Queries/HomeScreen/Home.type';
import {HomeScreenNavigationProp, HomeScreenState} from '../Home.types';

function HomeCategoryList({
  navigation,
  state,
}: {
  navigation: HomeScreenNavigationProp;
  state: HomeScreenState;
}) {
  const {categoryItems, categories} = state;

  const handleNavigation = (categoryItem: CategoryItemInterface) => {
    if (categoryItem.children_count > 0) {
      navigation.navigate('Category', {
        categoryUid: categoryItem.uid,
        categoryName: categoryItem.name,
      });
    } else {
      navigation.navigate('ProductList', {
        categoryId: categoryItem.uid,
        categoryName: categoryItem.name,
        categoryImageUrl: `${categoryItem.sw_menu_icon_img}`,
        totalProductCount: categories?.total_count ?? 0,
      });
    }
  };

  return (
    <>
      <VStack>
        <TitleActions
          titleIcon={<FaceSavoringFood />}
          title={'Categories'}
          btnText="See all"
          onPress={() => {
            navigation.navigate('Category', {parentId: 2});
          }}
        />

        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {categoryItems?.map(
            (category: CategoryItemInterface, index: number) => (
              <CategoryItem
                key={category.uid}
                title={category.name}
                imageUrl={category.sw_menu_icon_img}
                onPress={() => handleNavigation(category)}
              />
            ),
          )}
        </Box>
      </VStack>
    </>
  );
}

export default HomeCategoryList;
