import {Box, IBoxProps, Input, theme} from 'native-base';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {StyleProp, TextStyle} from 'react-native';
import FieldLabel from './FormLabel';

export type ITextFieldProps = {
  containerProps?: IBoxProps;
  label: string;
  name: string;
  labelProps?: InterfaceTextProps;
  labelStyles?: StyleProp<TextStyle>;
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
  ...rest
}: ITextFieldProps) {
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
        id={name}
        value={value}
        onChangeText={onChangeText}
        {...rest}
        style={{
          backgroundColor: theme.colors.gray[200],
          borderColor: theme.colors.white,
          borderRadius: 10,
        }}
      />
    </Box>
  );
}
