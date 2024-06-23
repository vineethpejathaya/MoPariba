import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  Heading,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  CreditCardIcon,
  FavoriteIcon,
  LocationIcon,
  NotificationGreenIcon,
  OrderIcon,
  ProfileIcon,
  SignOutIcon,
  TransactionIcon,
} from '../../assets/icons/Icons';
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
    navigateTo: 'SignOutScreen',
  },
];

function ProfileScreen({navigation}: Props) {
  const handleNavigation = (screen: any) => {
    navigation.navigate(screen);
  };
  return (
    <>
      <Center mt={10}>
        <Avatar
          size="2xl"
          source={require('../../assets/images/pngs/ProfileImage.png')}>
          <IconButton
            icon={<Icon name="photo-camera" size={20} color="#fff" />}
            borderRadius="full"
            position="absolute"
            bottom={0}
            right={0}
            size="sm"
            bg="green.500"
          />
        </Avatar>
        <Heading mt={3}>Olivia Austin</Heading>
        <Text color="gray.500">oliviaaustin@gmail.com</Text>
      </Center>

      <Box flex={1} px={10} bg="gray.100">
        <VStack marginTop={20}>
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
