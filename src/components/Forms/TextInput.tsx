import {Box, IBoxProps, Input, Text, useTheme} from 'native-base';
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
  error?: string;
} & InterfaceInputProps;

const errorInputStyle: ViewStyle = {
  borderColor: 'red',
  borderWidth: 2,
  borderRadius: 10,
};

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
  error,
  ...rest
}: ITextFieldProps) {
  const theme = useTheme();
  const defaultStyles: ViewStyle = {
    backgroundColor: theme.colors.gray[200],
    borderRadius: 10,
  };
  const combinedStyles = StyleSheet.flatten([
    defaultStyles,
    error ? errorInputStyle : null,
    inputStyles,
  ]);
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

      {error && <Text style={{color: 'red', marginTop: 5}}>{error}</Text>}
    </Box>
  );
}
