import {Box, Pressable} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FavoriteCheckbox() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Pressable onPress={toggleFavorite}>
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={25}
          color={isFavorite ? 'red.500' : 'black'}
        />
      </Pressable>
    </Box>
  );
}

export default FavoriteCheckbox;
