import {Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type AlertStatus = 'success' | 'info' | 'warning' | 'error';

const statuses = Object.freeze({
  error: 'error',
  success: 'success',
  info: 'info',
  warning: 'warning',
});

const alertIcons = Object.freeze({
  error: 'error',
  success: 'check-circle',
  info: 'info',
  warning: 'warning',
});

const CustomToast = ({
  title,
  description,
  status,
}: {
  title?: string;
  description: string;
  status: AlertStatus;
}) => {
  const styles = createStyles(status);
  return (
    <Box flex={1} style={styles.container}>
      <HStack space={2}>
        <Icon name={alertIcons[status]} size={20} style={styles.icon} />
        <VStack flex={1} space={2}>
          {title && (
            <Text variant={'title1'} style={styles.title}>
              {title}
            </Text>
          )}
          <Text variant={'body1'}>{description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CustomToast;

const createStyles = (status: AlertStatus) => {
  const colorCodes = getColorsCodes(status);
  const toastStyles = StyleSheet.create({
    container: {
      width: 300,
      backgroundColor: colorCodes.bg,
      padding: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderLeftWidth: 5,
      borderColor: colorCodes.textColor,
    },
    title: {
      color: colorCodes.textColor,
    },
    icon: {
      color: colorCodes.textColor,
    },
  });

  return toastStyles;
};

const getColorsCodes = (status: AlertStatus) => {
  switch (status) {
    case statuses.error:
      return {
        bg: '#FEF5F6',
        textColor: '#FF5454',
      };
    case statuses.warning:
      return {
        bg: '#FEFBF2',
        textColor: '#F6B412',
      };
    case statuses.info:
      return {
        bg: '#EFF5FD',
        textColor: '#3A8AEB',
      };
    default:
      return {
        bg: '#F0F9F8',
        textColor: '#2CAD9A',
      };
  }
};
