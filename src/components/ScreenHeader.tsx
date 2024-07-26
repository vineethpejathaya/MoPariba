import {useNavigation} from '@react-navigation/native';
import {Box, HStack, IconButton, Text} from 'native-base';
import {InterfaceHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import React, {ReactElement, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

function ScreenHeader({
  title,
  leftActions,
  rightActions,
  disableNavigateBack = false,
  hStackProps,
}: {
  title?: string | ReactNode;
  leftActions?: ReactElement[];
  rightActions?: ReactElement[];
  disableNavigateBack?: boolean;
  hStackProps?: InterfaceHStackProps;
}) {
  const navigation = useNavigation();
  return (
    <HStack shadow={3} style={styles.container} {...hStackProps}>
      <HStack space={2} alignItems="center" style={{flex: 1}}>
        {!disableNavigateBack && (
          <IconButton
            icon={
              <Icon name="arrow-back" size={25} color={theme.colors.black} />
            }
            onPress={() => navigation.goBack()}
          />
        )}
        {leftActions &&
          leftActions?.map((component, index) => (
            <Box key={index}>{component}</Box>
          ))}
      </HStack>
      {title && (
        <Box style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </Box>
      )}
      <HStack
        space={2}
        alignItems="center"
        style={{flex: 1, justifyContent: 'flex-end'}}>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },

  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 700,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});
