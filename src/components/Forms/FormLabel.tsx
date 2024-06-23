import {Text, theme} from 'native-base';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

export type ILabelProps = {
  label: string;
  required?: boolean;
  name: string;
  labelStyles?: StyleProp<TextStyle>;
} & InterfaceTextProps;

function FormLabel({label, required, name, labelStyles, ...rest}: ILabelProps) {
  if (typeof label !== 'string') return label;

  const defaultStyles: TextStyle = {
    fontWeight: '400',
    fontSize: 13,
    fontFamily: 'Sen-Regular',
    lineHeight: 15.64,
    marginBottom: 10,
  };

  const combinedStyles = StyleSheet.flatten([defaultStyles, labelStyles]);
  return (
    <Text style={combinedStyles} {...rest}>
      {label}{' '}
      {required && <span style={{color: theme.colors.error[400]}}>{' *'}</span>}
    </Text>
  );
}

export default FormLabel;
