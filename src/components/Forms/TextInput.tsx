import {Box, IBoxProps, Input, Text} from 'native-base';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import FieldLabel from './FormLabel';

export type ITextFieldProps = {
  containerProps?: IBoxProps;

  name: string;
  label?: string;
  labelProps?: InterfaceTextProps;
  labelStyles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<ViewStyle>;
  error?: string;
} & InterfaceInputProps;

const errorInputStyle: ViewStyle = {
  borderColor: 'red',
  borderWidth: 1,
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
  const defaultStyles: ViewStyle = {
    backgroundColor: '#F4F5F9',
    borderRadius: 10,
  };
  const combinedStyles = StyleSheet.flatten([
    defaultStyles,
    error ? errorInputStyle : null,
    inputStyles,
  ]);
  return (
    <Box width="100%" {...containerProps}>
      {label && (
        <FieldLabel
          label={label}
          required={isRequired}
          name={name}
          labelStyles={labelStyles}
          {...labelProps}
        />
      )}

      <Input
        variant={'filled'}
        id={name}
        value={value}
        onChangeText={onChangeText}
        style={combinedStyles}
        {...rest}
      />

      {error && <Text style={{color: 'red', marginTop: 5}}>{error}</Text>}
    </Box>
  );
}
