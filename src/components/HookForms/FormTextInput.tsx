import {Text} from 'native-base';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '../Forms/TextInput';

type MyTextFieldProps = InterfaceInputProps & {
  control: any;
  label: string;
  name: string;
  required?: boolean;
};

export default function FormTextInput({
  name,
  control,
  label,
  required = false,
  onChange,
  value,
  ...rest
}: MyTextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        return (
          <>
            <TextField
              name={name}
              label={label}
              onChangeText={onChange}
              value={value}
              isRequired={required}
              {...rest}
            />
            {error && (
              <Text color={'red.400'} style={{textAlign: 'right'}}>
                {error.message}
              </Text>
            )}
          </>
        );
      }}
    />
  );
}
