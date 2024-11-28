import {useQuery} from '@apollo/client';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import NoDataIllustration from '../../components/NoDataIllustration';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {baseUrl, bottomNavigatorHeight} from '../../constants/config';
import {GET_CATEGORIES_LIST} from '../../services/GGL-Queries/Categories/Categories.queries';
import {
  CategoryItemInterface,
  GetCategoriesResponse,
} from '../../services/GGL-Queries/Categories/Categories.type';
import theme from '../../themes/theme';
import {
  CategoryScreenNavigationProp,
  CategoryScreenProps,
  CategoryState,
} from './CategoryScreen.type';

function CategoryScreen({route, navigation}: CategoryScreenProps) {
  const {
    categoryUid = null,
    parentId = null,
    categoryName = 'Categories',
  } = route.params || {};
  const [categoryState, setCategoryState] = useState<CategoryState>(null);

  const {loading, error, data} = useQuery<GetCategoriesResponse>(
    GET_CATEGORIES_LIST,
    {
      variables: {
        categoryUid: categoryUid || null,
        ...(parentId ? {parentId: [parentId]} : {parentId: 2}),
        pageSize: 10,
        currentPage: 1,
      },
      onCompleted: res => {
        setCategoryState(res.categories);
      },
    },
  );

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      {/*Category Screen Header */}
      <ScreenHeader title={categoryName} />
      {/* Category Screen content */}
      <ScreenContent containerStyles={categoryScreenStyles.mainContainer}>
        {/* If category id is passed then the sub category list of the respective category is listed or else all the categories along with subcategory of each category is listed */}
        {categoryUid ? (
          <CategoryList
            categoryItems={categoryState?.items[0].children}
            navigation={navigation}
            categoryProductsCount={categoryState?.total_count ?? 0}
          />
        ) : (
          <>
            {/* all the categories along with subcategory of each category */}
            <AllCategories
              categories={categoryState?.items ?? []}
              navigation={navigation}
            />
          </>
        )}
      </ScreenContent>
    </>
  );
}
export default CategoryScreen;

export const AllCategories = ({
  categories,
  navigation,
}: {
  categories: CategoryItemInterface[];
  navigation: CategoryScreenNavigationProp;
}) => {
  return (
    <>
      <VStack space={3}>
        {categories?.map((category: CategoryItemInterface, index: number) => (
          <Box key={index}>
            <HStack space={2} alignItems={'center'} mb={3}>
              <Text style={categoryScreenStyles.categoryTitle}>
                {category?.name}
              </Text>
              <Divider />
            </HStack>
            <CategoryList
              categoryItems={
                category.children_count == 0 ? [category] : category.children
              }
              navigation={navigation}
              categoryProductsCount={0}
            />
          </Box>
        ))}
      </VStack>
    </>
  );
};
export const CategoryList = ({
  categoryItems = [],
  navigation,
  categoryProductsCount,
}: {
  categoryItems?: CategoryItemInterface[];
  navigation: CategoryScreenNavigationProp;
  categoryProductsCount: number;
}) => {
  const handlePress = (categoryItem: CategoryItemInterface) => {
    if (categoryItem.children_count > 0) {
      navigation.navigate('Category', {
        categoryUid: categoryItem.uid,
        categoryName: categoryItem.name,
      });
    } else {
      navigation.navigate('ProductList', {
        categoryId: categoryItem.uid,
        categoryName: categoryItem.name,
        categoryImageUrl: `${baseUrl}${categoryItem.sw_menu_icon_img}`,
        totalProductCount: categoryProductsCount ?? 0,
      });
    }
  };
  return (
    <>
      {/* If there are no sub categories then no data illustration is show else the list is shown */}
      {categoryItems?.length ? (
        <Box style={categoryScreenStyles.categoryListContainer}>
          {categoryItems?.map((item: CategoryItemInterface, index: number) => (
            <CategoryCard
              key={index}
              title={item.name}
              imageUrl={item.sw_menu_icon_img}
              onPress={() => handlePress(item)}
            />
          ))}
        </Box>
      ) : (
        <NoDataIllustration message={'No Categories found'} />
      )}
    </>
  );
};

const categoryScreenStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.white,
    paddingBottom: bottomNavigatorHeight,
  },
  categoryTitle: {
    fontWeight: 700,
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    textTransform: 'uppercase',
  },
  categoryListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    alignItems: 'flex-start',
    paddingBottom: 10,
    marginTop: 10,
  },
});
