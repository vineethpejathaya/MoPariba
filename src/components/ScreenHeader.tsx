import {useNavigation} from '@react-navigation/native';
import {Box, HStack, IconButton, Text} from 'native-base';
import React, {ReactElement, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

function ScreenHeader({
  title,
  leftActions,
  rightActions,
  disableNavigateBack = false,
}: {
  title?: string | ReactNode;
  leftActions?: ReactElement[];
  rightActions?: ReactElement[];
  disableNavigateBack?: boolean;
}) {
  const navigation = useNavigation();
  return (
    <HStack style={styles.container}>
      <HStack space={2} alignItems="center">
        {!disableNavigateBack && (
          <IconButton
            icon={
              <Icon
                name="arrow-back"
                size={25}
                color={theme.colors.gray[900]}
              />
            }
            onPress={() => navigation.goBack()}
          />
        )}
        {leftActions &&
          leftActions?.map((component, index) => (
            <Box key={index}>{component}</Box>
          ))}
      </HStack>
      {title && <Text variant={'subheader1'}>{title}</Text>}
      <HStack space={2} alignItems="center">
        {rightActions &&
          rightActions?.map((component, index) => (
            <Box key={index}>{component}</Box>
          ))}
      </HStack>
    </HStack>
  );
}

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: theme.colors.white,
    elevation: 1,
  },
});
