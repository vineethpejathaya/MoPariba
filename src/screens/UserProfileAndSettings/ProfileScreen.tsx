import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, Box, Center, FlatList, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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
import {Customer} from '../../services/GGL-Queries/HomeScreen/Home.type';
import {GetInitialLetterOfString} from '../../services/utils';
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
      <Center style={styles.topSection}>
        <Box style={styles.avatarContainer}>
          <Avatar _text={styles.avatarText} style={styles.avatar} size="2xl">
            {GetInitialLetterOfString(
              [customer.firstname, customer.lastname].join(' '),
            )}
          </Avatar>
          <CustomIconButton
            iconName="photo-camera"
            size={14}
            BtnStyles={styles.cameraIcon}
          />
        </Box>
      </Center>
      <Box style={styles.container}>
        <VStack space={2}>
          <VStack alignItems={'center'}>
            <Text style={styles.userName}>
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

const styles = StyleSheet.create({
  topSection: {
    height: Dimensions.get('window').height * 0.2,
    backgroundColor: theme.colors.white,
    zIndex: 1,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -Dimensions.get('window').height * 0.2 * 0.5,
    zIndex: 10,
  },
  avatar: {
    backgroundColor: theme.colors.gray[700],
  },
  avatarText: {
    fontSize: 25,
    lineHeight: 27,
    textTransform: 'uppercase',
  },

  cameraIcon: {
    position: 'relative',
    bottom: 30,
    right: -80,
    zIndex: 1,
  },

  container: {
    paddingTop: 60,
    flex: 1,
    paddingHorizontal: 34,
    backgroundColor: theme.colors.gray[300],
  },
  userName: {
    fontSize: 15,
    fontWeight: 700,
    fontFamily: 'Poppins-Bold',
    textTransform: 'capitalize',
  },
});
