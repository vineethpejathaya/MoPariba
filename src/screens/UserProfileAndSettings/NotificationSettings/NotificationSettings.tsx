import {Box, Button, HStack, Switch, Text, VStack, theme} from 'native-base';
import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import {NotificationsList} from '../../../constants/NotificationsList';
import {
  NotificationItem,
  NotificationSettingsType,
} from './NotificationSettings.type';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState<NotificationSettingsType>({
    allowNotification: false,
    emailNotification: false,
    orderNotification: false,
    generalNotification: false,
  });

  return (
    <>
      <ScreenHeader title={'Notifications'} />
      <VStack flex={1} justifyContent={'space-between'} p={4}>
        <VStack space={3} alignItems={'center'}>
          {NotificationsList.map((item: NotificationItem, index: number) => (
            <NotificationItem
              key={index}
              title={item.title}
              description={item.description}
              notificationKey={item.key}
              isNotificationOn={notifications[item.key]}
              setNotifications={setNotifications}
            />
          ))}
        </VStack>
        <Button mt={4}>Save settings</Button>
      </VStack>
    </>
  );
};

export default NotificationSettings;

const NotificationItem = ({
  notificationKey,
  title,
  description,
  isNotificationOn,
  setNotifications,
}: {
  notificationKey: keyof NotificationSettingsType;
  title: string;
  description: string;
  isNotificationOn: boolean;
  setNotifications: React.Dispatch<
    React.SetStateAction<NotificationSettingsType>
  >;
}) => {
  return (
    <Box style={NotificationCard.card}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text variant={'title1'}>{title}</Text>
          <Text variant={'body2'}>{description}</Text>
        </VStack>
        <Switch
          isChecked={isNotificationOn}
          onToggle={() =>
            setNotifications((prev: any) => ({
              ...prev,
              [notificationKey]: !isNotificationOn,
            }))
          }
        />
      </HStack>
    </Box>
  );
};

const NotificationCard = StyleSheet.create({
  card: {
    gap: 10,
    width: Dimensions.get('window').width * 0.9,
    height: 103,
    borderBlockColor: 'black',
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});
