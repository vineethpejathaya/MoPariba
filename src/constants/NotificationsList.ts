import {NotificationSettingsType} from '../services/interfaces/NotificationSettings.interface';

interface NotificationItem {
  key: keyof NotificationSettingsType;
  title: string;
  description: string;
}

export const NotificationsList: NotificationItem[] = [
  {
    key: 'allowNotification',
    title: 'Allow Notifications',
    description: 'Receive notifications from the app',
  },
  {
    key: 'emailNotification',
    title: 'Email Notifications',
    description: 'Receive notifications via email',
  },
  {
    key: 'orderNotification',
    title: 'Order Notifications',
    description: 'Receive notifications for orders',
  },
  {
    key: 'generalNotification',
    title: 'General Notifications',
    description: 'Receive general notifications',
  },
];
