import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, useToast} from 'native-base';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {RootStackParamList} from '../../navigations/types';
import {GET_CATEGORIES_LIST} from '../../services/ggl-queries/category';
import {CategoryItem} from '../../services/interfaces/category.interface';

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
  const [categories, setCategories] = useState<CategoryItem[] | []>([]);
  const [numColumns, setNumColumns] = useState(3);
  const {loading, error, data} = useQuery(GET_CATEGORIES_LIST, {
    variables: {
      categoryUid: categoryUid || null,
      ...(parentId ? {parentId: [parentId]} : {}),
      pageSize: 10,
      currentPage: 1,
    },
    onCompleted: res => {
      setCategories(res.categories.items[0].children);
    },
    onError: err => {
      toast.show({description: err.message});
    },
  });

  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      const columnCount = Math.floor(screenWidth / 160);
      setNumColumns(columnCount > 0 ? columnCount : 1);
    };

    updateNumColumns();
    Dimensions.addEventListener('change', updateNumColumns);
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ScreenHeader title={categoryName ?? 'Categories'} />
      <ScreenContent>
        <FlatList
          data={categories}
          renderItem={({item}: {item: CategoryItem}) => (
            <CategoryCard
              title={item.name}
              imageUrl={item.sw_menu_icon_img}
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
                  });
                }
              }}
            />
          )}
          numColumns={numColumns}
          keyExtractor={item => item.uid}
        />
      </ScreenContent>
    </>
  );
}
export default CategoryScreen;
