import {ChevronDownIcon, Select} from 'native-base';

interface Option {
  label: string;
  value: any;
}

interface SingleSelectProps {
  label: string;
  onValueChange: (itemValue: any) => void;
  value: any;
  options: Option[];
}
function SingleSelect({
  label,
  onValueChange,
  options,
  value,
}: SingleSelectProps) {
  return (
    <>
      <Select
        height={45}
        size={'md'}
        selectedValue={value}
        placeholder={label}
        onValueChange={onValueChange}
        dropdownIcon={<ChevronDownIcon size={3} style={{marginRight: 20}} />}
        _light={{
          bg: '#F4F5F9',
          borderWidth: 0,
        }}
        _dark={{
          bg: '#F4F5F9',
        }}
        mt={1}>
        {options.map((option: Option, index: number) => (
          <Select.Item key={index} label={option.label} value={option.value} />
        ))}
      </Select>
    </>
  );
}

export default SingleSelect;
