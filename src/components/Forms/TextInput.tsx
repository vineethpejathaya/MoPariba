import {Box, IBoxProps, Input, useTheme} from 'native-base';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import FieldLabel from './FormLabel';

export type ITextFieldProps = {
  containerProps?: IBoxProps;
  label: string;
  name: string;
  labelProps?: InterfaceTextProps;
  labelStyles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<ViewStyle>;
} & InterfaceInputProps;

export default function TextField({
  name,
  label,
  value,
  onChangeText,
  isRequired = false,
  containerProps,
  labelProps,
  labelStyles,
  inputStyles,
  ...rest
}: ITextFieldProps) {
  const theme = useTheme();
  const defaultStyles: ViewStyle = {
    backgroundColor: theme.colors.gray[200],
    borderRadius: 10,
  };
  const combinedStyles = StyleSheet.flatten([defaultStyles, inputStyles]);
  return (
    <Box width="100%" {...containerProps}>
      <FieldLabel
        label={label}
        required={isRequired}
        name={name}
        labelStyles={labelStyles}
        {...labelProps}
      />
      <Input
        variant={'filled'}
        id={name}
        value={value}
        onChangeText={onChangeText}
        {...rest}
        style={combinedStyles}
      />
    </Box>
  );
}
