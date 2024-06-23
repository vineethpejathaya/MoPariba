import {IconButton, useTheme} from 'native-base';
import {InterfaceIconButtonProps} from 'native-base/lib/typescript/components/composites/IconButton/types';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type Props = {
  iconName?: string;
  iconSize?: number;
  SvgIcon?: React.ReactElement;
  onPress?: () => void;
  BtnStyles?: StyleProp<ViewStyle>;
} & InterfaceIconButtonProps;

function CustomIconButton({
  iconName,
  SvgIcon,
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
    },
  });

  return (
    <IconButton
      style={[Styles.bth, BtnStyles]}
      icon={
        SvgIcon ? SvgIcon : <Icon name={iconName ?? 'check'} size={iconSize} />
      }
      {...rest}
      onPress={onPress}
    />
  );
}

export default CustomIconButton;
