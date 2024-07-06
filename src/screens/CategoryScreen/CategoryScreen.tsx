import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, useToast} from 'native-base';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import NoDataIllustration from '../../components/NoDataIllustartion';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {baseUrl} from '../../constants/main';
import {RootStackParamList} from '../../navigations/types';
import {GET_CATEGORIES_LIST} from '../../services/ggl-queries/category';
import {
  Categories,
  CategoryItem,
} from '../../services/interfaces/category.interface';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type CategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Category'
>;

export type CategoryScreenProps = {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavigationProp;
};

function CategoryScreen({route, navigation}: CategoryScreenProps) {
  const toast = useToast();
  const {categoryUid, parentId, categoryName} = route.params;
  const [categoryState, setCategoryState] = useState<Categories | null>(null);
  const [categoryItems, setCategoryItems] = useState([]);

  const {loading, error, data} = useQuery(GET_CATEGORIES_LIST, {
    variables: {
      categoryUid: categoryUid || null,
      ...(parentId ? {parentId: [parentId]} : {}),
      pageSize: 10,
      currentPage: 1,
    },
    onCompleted: res => {
      if (categoryUid) {
        setCategoryItems(res.categories.items[0]?.children);
      } else {
        setCategoryItems(res.categories.items);
      }
      setCategoryState(res.categories);
    },
    onError: err => {
      toast.show({description: err.message});
    },
  });

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader title={categoryName ?? 'Categories'} />
      <ScreenContent>
        {categoryItems?.length == 0 ? (
          <NoDataIllustration message={'No Categories found'} />
        ) : (
          <>
            <FlatList
              data={categoryItems}
              renderItem={({item}: {item: CategoryItem}) => (
                <CategoryCard
                  title={item.name}
                  imageUrl={item.sw_menu_icon_img}
                  cardStyles={{
                    width: (Dimensions.get('window').width * 0.9) / 2,
                  }}
                  onPress={() => {
                    if (item.children_count > 0) {
                      navigation.navigate('Category', {
                        categoryUid: item.uid,
                        categoryName: item.name,
                      });
                    } else {
                      navigation.navigate('ProductList', {
                        categoryId: item.uid,
                        categoryName: item.name,
                        categoryImageUrl: `${baseUrl}/${item.sw_menu_icon_img}`,
                        totalProductCount: categoryState?.total_count ?? 0,
                      });
                    }
                  }}
                />
              )}
              numColumns={2}
              contentContainerStyle={{gap: 10}}
              columnWrapperStyle={{gap: 10}}
              keyExtractor={item => item.uid}
            />
          </>
        )}
      </ScreenContent>
    </>
  );
}
export default CategoryScreen;
