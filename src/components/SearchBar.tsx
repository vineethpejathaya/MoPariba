import {Box, Input} from 'native-base';
import theme from '../themes/theme';

import {IInputProps} from 'native-base';
import {SearchIcon} from '../assets/icons/Icons';

export interface SearchProps extends IInputProps {
  iconSize?: number;
  iconColor?: string;
  iconPadding?: number;
  placeholderText?: string;
}

function SearchBar({
  iconSize = 25,
  iconColor = theme.colors.gray[900],
  placeholderText = 'What are you looking for?',
  ...props
}) {
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
        placeholder={placeholderText}
        backgroundColor={theme.colors.white}
        borderRadius={35}
        borderColor={'#DEDEDE'}
        borderWidth={1}
        {...props}
      />
    </>
  );
}

export default SearchBar;
