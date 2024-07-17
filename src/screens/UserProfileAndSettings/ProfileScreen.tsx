import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, Box, Center, FlatList, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  FavoriteIcon,
  LocationIcon,
  NotificationGreenIcon,
  OrderIcon,
  ProfileIcon,
  SignOutIcon,
} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import NavigationItem from '../../components/NavigationItem';
import {useAuth} from '../../hooks/UseAuth';
import {RootStackParamList} from '../../navigations/types';
import {Customer} from '../../services/interfaces/customer.interface';
import {GetInitialLetterOfString} from '../../services/utlis';
import theme from '../../themes/theme';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

type NavigationItem = {
  icon: string;
  svgIcon: JSX.Element;
  label: string;
  navigateTo: keyof RootStackParamList;
  onPress?: () => void;
};

const navigationItems: NavigationItem[] = [
  {
    icon: 'person',
    svgIcon: <ProfileIcon />,
    label: 'About me',
    navigateTo: 'AboutMeScreen',
  },
  {
    icon: 'shopping-cart',
    svgIcon: <OrderIcon />,
    label: 'My Orders',
    navigateTo: 'OrdersScreen',
  },
  {
    icon: 'favorite',
    svgIcon: <FavoriteIcon />,
    label: 'My Favorites',
    navigateTo: 'FavoritesScreen',
  },
  {
    icon: 'place',
    svgIcon: <LocationIcon />,
    label: 'My Address',
    navigateTo: 'AddressScreen',
  },
  {
    icon: 'notifications',
    svgIcon: <NotificationGreenIcon />,
    label: 'Notifications',
    navigateTo: 'NotificationSettings',
  },
  {
    icon: 'exit-to-app',
    svgIcon: <SignOutIcon />,
    label: 'Sign out',
    onPress: () => {
      AsyncStorage.setItem('userToken', '');
    },
    navigateTo: 'Login',
  },
];

const defaultState = {
  email: '',
  firstname: '',
  lastname: '',
  suffix: '',
  addresses: [],
};

function ProfileScreen({navigation}: Props) {
  const {signOut} = useAuth();
  const [customer, setCustomer] = useState<Customer>(defaultState);

  const handleNavigation = (screen: any) => {
    if (screen === 'Login') {
      signOut();
    } else {
      navigation.navigate(screen);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const userData = await AsyncStorage.getItem('userDetails');
      if (userData) {
        setCustomer(JSON.parse(userData));
      }
    };
    initialize();
  });

  return (
    <>
      <Center style={{height: Dimensions.get('window').height * 0.2}}>
        <Box
          style={{
            position: 'absolute',
            bottom: -Dimensions.get('window').height * 0.2 * 0.5,
            zIndex: 1,
          }}>
          <Avatar
            _text={{fontSize: 25, lineHeight: 27, textTransform: 'uppercase'}}
            size="2xl"
            bg="gray.700">
            {GetInitialLetterOfString(
              [customer.firstname, customer.lastname].join(' '),
            )}
          </Avatar>
          <CustomIconButton
            iconName="photo-camera"
            size={14}
            BtnStyles={{
              position: 'relative',
              bottom: 30,
              right: -80,
            }}
          />
        </Box>
      </Center>
      <Box flex={1} px={10} style={{backgroundColor: theme.colors.gray[300]}}>
        <VStack mt={20} space={2}>
          <VStack alignItems={'center'}>
            <Text variant={'title1'} style={{textTransform: 'capitalize'}}>
              {customer?.firstname ?? 'Guest'} {customer?.lastname ?? ''}
            </Text>
            <Text variant={'label1'}>{customer?.email ?? '--'}</Text>
          </VStack>
          <FlatList
            data={navigationItems}
            keyExtractor={item => item.label}
            renderItem={({item}) => (
              <NavigationItem
                iconName={item.icon}
                svgIcon={item?.svgIcon}
                label={item.label}
                onPress={() => {
                  handleNavigation(item.navigateTo);
                }}
              />
            )}
          />
        </VStack>
      </Box>
    </>
  );
}

export default ProfileScreen;
