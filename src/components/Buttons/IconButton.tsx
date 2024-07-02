import {IconButton, useTheme} from 'native-base';
import {InterfaceIconButtonProps} from 'native-base/lib/typescript/components/composites/IconButton/types';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type Props = {
  iconName?: string;
  iconSize?: number;
  svgIcon?: React.ReactElement;
  onPress?: () => void;
  BtnStyles?: StyleProp<ViewStyle>;
} & InterfaceIconButtonProps;

function CustomIconButton({
  iconName,
  svgIcon,
  iconSize = 25,
  onPress,
  BtnStyles,
  ...rest
}: Props) {
  const theme = useTheme();
  const Styles = StyleSheet.create({
    bth: {
      width: 45,
      height: 45,
      borderRadius: 50,
      backgroundColor: theme.colors.gray[500],
      color: '#181C2E',
    },
  });

  const renderIcon = () => {
    if (svgIcon) {
      return svgIcon;
    }

    return (
      <Icon name={iconName ?? 'check'} size={iconSize} color={'#181C2E'} />
    );
  };

  return (
    <IconButton
      style={[Styles.bth, BtnStyles]}
      icon={renderIcon()}
      {...rest}
      onPress={onPress}
    />
  );
}

export default CustomIconButton;
