import {Box, ChevronDownIcon, HStack, IBoxProps, Select} from 'native-base';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import FieldLabel from './FormLabel';

interface Option {
  label: string;
  value: any;
}

interface SingleSelectProps {
  containerProps?: IBoxProps;
  name: string;
  label: string;
  onValueChange: (itemValue: any) => void;
  value: any;
  options: Option[];
  leftElement?: ReactNode;
  placeholder?: string;
  isRequired?: boolean;
  labelProps?: InterfaceTextProps;
  labelStyles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<ViewStyle>;
}
function SingleSelect({
  name,
  label,
  onValueChange,
  options,
  value,
  leftElement,
  placeholder,
  isRequired = false,
  labelProps,
  labelStyles,
  containerProps,
  inputStyles,
}: SingleSelectProps) {
  return (
    <>
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
        <HStack
          alignItems="center"
          height={45}
          bg="#F4F5F9"
          borderWidth={0}
          style={{flex: 1}}
          borderRadius="md">
          {leftElement && leftElement}

          <Box style={{flex: 1}}>
            <Select
              height={45}
              size={'md'}
              selectedValue={value}
              placeholder={placeholder}
              onValueChange={onValueChange}
              dropdownIcon={
                <ChevronDownIcon size={3} style={{marginRight: 20}} />
              }
              _light={{
                bg: '#F4F5F9',
                borderWidth: 0,
              }}
              _dark={{
                bg: '#F4F5F9',
              }}>
              {options.map((option: Option, index: number) => (
                <Select.Item
                  key={index}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Select>
          </Box>
        </HStack>
      </Box>
    </>
  );
}

export default SingleSelect;
