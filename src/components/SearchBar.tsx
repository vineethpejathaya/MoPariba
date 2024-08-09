import {Box, IInputProps, Input} from 'native-base';
import {useMemo, useState} from 'react';
import {SearchIcon} from '../assets/icons/Icons';
import theme from '../themes/theme';

export const debounce = (func: any, delay: any) => {
  let timeoutId: any;
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface SearchBarProps {
  onSearch: (v: string) => void;
  placeholder?: string;
  value?: string;
  inputProps?: IInputProps;
  iconSize?: number;
  iconColor?: string;
  iconPadding?: number;
}

function SearchBar({
  onSearch,
  placeholder = 'What are you looking for?',
  ...restProps
}: SearchBarProps) {
  const [, setSearch] = useState('');

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        onSearch(value);
      }, 300),
    [],
  );

  return (
    <>
      <Input
        InputLeftElement={
          <Box style={{paddingLeft: 10}}>
            <SearchIcon width={20} height={20} />
          </Box>
        }
        _focus={{
          bg: 'transparent',
        }}
        height={10}
        placeholder={placeholder}
        backgroundColor={theme.colors.white}
        onChangeText={debouncedChangeHandler}
        borderRadius={35}
        borderColor={'#DEDEDE'}
        borderWidth={1}
        {...restProps.inputProps}
      />
    </>
  );
}

export default SearchBar;
