import {Box, ChevronDownIcon, HStack, Select} from 'native-base';
import {ReactNode} from 'react';

interface Option {
  label: string;
  value: any;
}

interface SingleSelectProps {
  label: string;
  onValueChange: (itemValue: any) => void;
  value: any;
  options: Option[];
  leftElement?: ReactNode;
}
function SingleSelect({
  label,
  onValueChange,
  options,
  value,
  leftElement,
}: SingleSelectProps) {
  return (
    <>
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
            placeholder={label}
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
    </>
  );
}

export default SingleSelect;
