import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IconButton} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  CartIcon,
  CategoryIcon,
  HomeIcon,
  ProfileTabIcon,
} from '../assets/icons/Icons';
import {bottomNavigatorHeight} from '../constants/config';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/UserProfileAndSettings/ProfileScreen';
import {RootStackParamList} from './types';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type TabItem = {
  route: keyof RootStackParamList;
  label: string;
  icon: JSX.Element;
  component: React.ComponentType<any>;
};

const Tab = createBottomTabNavigator();

export const TabArr: TabItem[] = [
  {
    route: 'Home',
    label: 'Home',
    icon: <HomeIcon />,
    component: HomeScreen,
  },
  {
    route: 'Category',
    label: 'Category',
    icon: <CategoryIcon />,
    component: CategoryScreen,
  },
  {
    route: 'Cart',
    label: 'Cart',
    icon: <CartIcon />,
    component: CartScreen,
  },

  {
    route: 'Profile',
    label: 'Profile',
    icon: <ProfileTabIcon />,
    component: ProfileScreen,
  },
];

type TabButtonProps = BottomTabBarButtonProps & {
  item: TabItem;
};

export const TabButton = ({item, ...props}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const handleNavigation = (route: any) => {
    if (route == 'Category') {
      navigation.navigate('Category', {parentId: 2});
    }
    navigation.navigate(route);
  };

  return (
    <TouchableOpacity activeOpacity={1} style={[styles.container]}>
      <IconButton
        icon={item.icon}
        onPress={() => handleNavigation(item.route)}
      />
    </TouchableOpacity>
  );
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      {TabArr.map((item: any, index: number) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton item={item} {...props} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: bottomNavigatorHeight,
  },
});
