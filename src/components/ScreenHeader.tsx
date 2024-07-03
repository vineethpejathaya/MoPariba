import {useNavigation} from '@react-navigation/native';
import {Box, HStack, IconButton, Text, theme} from 'native-base';
import React, {ReactElement, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ScreenHeader({
  title,
  leftActions,
  rightActions,
}: {
  title?: string | ReactNode;
  leftActions?: ReactElement[];
  rightActions?: ReactElement[];
}) {
  const navigation = useNavigation();
  return (
    <HStack style={styles.container}>
      <HStack space={2} alignItems="center">
        {leftActions ? (
          leftActions?.map((component, index) => (
            <Box key={index}>{component}</Box>
          ))
        ) : (
          <IconButton
            icon={<Icon name="arrow-back" size={25} />}
            onPress={() => navigation.goBack()}
          />
        )}
      </HStack>
      {title && (
        <Text variant={'subheader1'} textAlign={'center'}>
          {title}
        </Text>
      )}
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
    padding: 20,
    backgroundColor: theme.colors.white,
  },
});
