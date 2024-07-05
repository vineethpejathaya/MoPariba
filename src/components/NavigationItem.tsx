import {Box, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

interface NavigationItemProps {
  iconName?: string;
  svgIcon?: React.ReactElement;
  label: string;
  onPress: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  iconName,
  svgIcon,
  label,
  onPress,
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

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" paddingY={4} paddingX={2}>
        {renderIcon()}
        <Text variant="subTitle1" style={{marginLeft: 10}}>
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
