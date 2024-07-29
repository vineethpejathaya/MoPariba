import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Box, IconButton, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  CartIcon,
  CategoryIcon,
  HomeIcon,
  ProfileTabIcon,
} from '../assets/icons/Icons';
import {bottomNavigatorHeight} from '../constants/config';
import {useCartStore} from '../hooks/UseCartStore';
import CartScreen from '../screens/CartAndPaymentsScreen/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/UserProfileAndSettings/ProfileScreen';
import {NavigationProp, RootStackParamList} from './types';

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

export const TabButton = ({item, ...props}: TabButtonProps) => {
  const navigation = useNavigation<NavigationProp>();
  const {cartItems} = useCartStore();
  const handleNavigation = (route: any) => {
    if (route == 'Category') {
      navigation.navigate('Category', {parentId: 2});
    }
    navigation.navigate(route);
  };

  return (
    <TouchableOpacity activeOpacity={1} style={[styles.container]}>
      <Box>
        {cartItems.length > 0 && item.label == 'Cart' && (
          <Box style={styles.cartItemCount}>
            <Text style={{fontFamily: 'DMSans-Bold', fontWeight: 900}}>
              {cartItems.length}
            </Text>
          </Box>
        )}
        <IconButton
          icon={item.icon}
          onPress={() => handleNavigation(item.route)}
        />
      </Box>
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
  cartItemCount: {
    position: 'absolute',
    top: 10,
    left: -5,
    borderRadius: 30,
    width: 25,
    height: 25,
    borderWidth: 0.5,
    backgroundColor: 'yellow',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
