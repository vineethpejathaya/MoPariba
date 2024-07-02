import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from 'native-base';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import {RootStackParamList} from '../../navigations/types';

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
  const {categoryName} = route.params;

  const theme = useTheme();

  return (
    <>
      <ScreenHeader title={categoryName ?? ''} />
      <ScreenContent></ScreenContent>
    </>
  );
}
export default CategoryScreen;
