import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  IconButton,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  CreditCardIcon,
  FavoriteIcon,
  HomeIcon,
  LocationIcon,
  NotificationGreenIcon,
  OrderIcon,
  ProfileIcon,
  SignOutIcon,
  TransactionIcon,
} from '../../assets/icons/Icons';
import CustomIconButton from '../../components/Buttons/IconButton';
import {RootStackParamList} from '../../navigations/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

const navigationItems = [
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
    icon: 'credit-card',
    svgIcon: <CreditCardIcon />,
    label: 'Credit Cards',
    navigateTo: 'CreditCardScreen',
  },
  {
    icon: 'attach-money',
    svgIcon: <TransactionIcon />,
    label: 'Transactions',
    navigateTo: 'TransactionsScreen',
  },
  {
    icon: 'notifications',
    svgIcon: <NotificationGreenIcon />,
    label: 'Notifications',
    navigateTo: 'NotificationsScreen',
  },
  {
    icon: 'exit-to-app',
    svgIcon: <SignOutIcon />,
    label: 'Sign out',
    navigateTo: 'Login',
  },
];

function ProfileScreen({navigation}: Props) {
  const theme = useTheme();
  const handleNavigation = (screen: any) => {
    navigation.navigate(screen);
  };
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
            size="2xl"
            source={require('../../assets/images/pngs/ProfileImage.png')}
          />
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
            <Text variant={'title1'}>Olivia Austin</Text>
            <Text variant={'label1'}>oliviaaustin@gmail.com</Text>
          </VStack>
          <FlatList
            data={navigationItems}
            keyExtractor={item => item.label}
            renderItem={({item}) => (
              <NavigationItem
                icon={item.icon}
                svgIcon={item?.svgIcon}
                label={item.label}
                onPress={() => handleNavigation(item.navigateTo)}
              />
            )}
          />
        </VStack>
      </Box>
      <BottomTabs navigation={navigation} />
    </>
  );
}

export default ProfileScreen;

const NavigationItem = ({
  icon,
  svgIcon,
  label,
  onPress,
}: {
  icon: string;
  svgIcon?: React.ReactElement;

  label: String;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" paddingY={4} paddingX={2}>
        {svgIcon ? svgIcon : <Icon name={icon} size={25} color="green.500" />}

        <Text variant={'subTitle1'} style={{marginLeft: 10}}>
          {label}
        </Text>
        <Icon
          name="chevron-right"
          size={25}
          color="gray.500"
          style={{marginLeft: 'auto'}}
        />
      </Box>
    </TouchableOpacity>
  );
};

const BottomTabs = ({navigation}: any) => {
  return (
    <Box
      style={{elevation: 1, backgroundColor: 'white', padding: 4}}
      justifyContent="center"
      alignItems="center">
      <HStack>
        <IconButton
          icon={<HomeIcon />}
          onPress={() => navigation.navigate('Home')}
        />
      </HStack>
    </Box>
  );
};
