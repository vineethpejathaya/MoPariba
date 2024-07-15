import {Box, Pressable} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

function FavoriteCheckbox({iconSize = 25}: {iconSize?: number}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box>
      <Pressable onPress={toggleFavorite}>
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={iconSize}
          style={{borderColor: 'black'}}
          color={isFavorite ? theme.colors.red[600] : theme.colors.gray[500]}
        />
      </Pressable>
    </Box>
  );
}

export default FavoriteCheckbox;
