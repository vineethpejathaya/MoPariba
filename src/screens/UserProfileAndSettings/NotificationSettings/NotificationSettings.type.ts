export type NotificationSettingsType = {
  allowNotification: boolean;
  emailNotification: boolean;
  orderNotification: boolean;
  generalNotification: boolean;
};

export interface NotificationItem {
  key: keyof NotificationSettingsType;
  title: string;
  description: string;
}
