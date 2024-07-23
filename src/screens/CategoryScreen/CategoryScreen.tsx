import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useState} from 'react';
import CategoryCard from '../../components/CategoryCard';
import NoDataIllustration from '../../components/NoDataIllustration';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {baseUrl} from '../../constants/config';
import {RootStackParamList} from '../../navigations/types';
import {
  Categories,
  CategoryItemInterface,
} from '../../services/GGL-Queries/HomeScreen/Home.type';
import {GET_CATEGORIES_LIST} from '../../services/GGL-Queries/category';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type CategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Category'
>;

export type CategoryScreenProps = {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavigationProp;
};

type CategoryState = Categories | null;
function CategoryScreen({route, navigation}: CategoryScreenProps) {
  const {
    categoryUid = null,
    parentId = null,
    categoryName = 'Categories',
  } = route.params || {};
  const [categoryState, setCategoryState] = useState<CategoryState>(null);

  const {loading, error, data} = useQuery(GET_CATEGORIES_LIST, {
    variables: {
      categoryUid: categoryUid || null,
      ...(parentId ? {parentId: [parentId]} : {parentId: 2}),
      pageSize: 10,
      currentPage: 1,
    },
    onCompleted: res => {
      setCategoryState(res.categories);
    },
  });

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader title={categoryName} />
      <ScreenContent px={2}>
        {categoryUid ? (
          <CategoryList
            categoryItems={categoryState?.items[0].children}
            navigation={navigation}
            categoryState={categoryState}
          />
        ) : (
          <>
            <VStack space={3}>
              {categoryState?.items?.map((category: any, index: number) => (
                <>
                  <HStack key={index} space={2} alignItems={'center'} mb={3}>
                    <Text variant={'subTitle2'}>{category?.name}</Text>
                    <Divider />
                  </HStack>
                  <CategoryList
                    categoryItems={
                      category.children_count == 0
                        ? [category]
                        : category.children
                    }
                    navigation={navigation}
                    categoryState={categoryState}
                  />
                </>
              ))}
            </VStack>
          </>
        )}
      </ScreenContent>
    </>
  );
}
export default CategoryScreen;

export const CategoryList = ({
  categoryItems = [],
  navigation,
  categoryState,
}: {
  categoryItems?: CategoryItemInterface[];
  navigation: any;
  categoryState: CategoryState;
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
        totalProductCount: categoryState?.total_count ?? 0,
      });
    }
  };
  return (
    <>
      {categoryItems?.length ? (
        <Box
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            alignItems: 'flex-start',
          }}>
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
