import {Box, Text} from 'native-base';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

interface NavigationItemProps {
  iconName?: string;
  svgIcon?: React.ReactElement;
  label: string;
  onPress: () => void;
  containerStyles?: StyleProp<ViewStyle>;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  iconName,
  svgIcon,
  label,
  onPress,
  containerStyles,
}) => {
  const renderIcon = () => {
    if (svgIcon) {
      return svgIcon;
    }
    if (iconName) {
      return <Icon name={iconName} size={25} color="green.500" />;
    }
    return null;
  };

  const combinedStyles = StyleSheet.flatten([
    styles.container,
    containerStyles,
  ]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={combinedStyles}>
        {renderIcon()}
        <Text
          fontFamily={'Poppins-Bold'}
          fontWeight={700}
          fontSize={'md'}
          style={{marginLeft: 10}}>
          {label}
        </Text>
        <Icon
          name="chevron-right"
          size={25}
          color={theme.colors.gray[900]}
          style={{marginLeft: 'auto'}}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default NavigationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 2,
  },
});
