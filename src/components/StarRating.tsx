import {HStack, Text, useTheme} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function StarRating({
  rating,
  maxRating,
  hideNumber = false,
}: {
  rating: number;
  maxRating: number;
  hideNumber?: boolean;
}) {
  const theme = useTheme();
  const renderStar = (index: number) => {
    let iconName = 'star-o';
    if (index < rating) {
      if (rating - index === 0.5) {
        iconName = 'star-half-o';
      } else {
        iconName = 'star';
      }
    }
    return iconName;
  };

  return (
    <HStack space={2} alignItems={'center'}>
      {!hideNumber && (
        <Text variant={'body2'} style={{fontSize: 12}}>
          {rating}
        </Text>
      )}

      <HStack space={1}>
        {Array.from({length: maxRating}, (_, index) => (
          <Icon
            name={renderStar(index)}
            color={
              index < rating ? theme.colors.orange[200] : theme.colors.white
            }
            size={15}
          />
        ))}
      </HStack>
    </HStack>
  );
}

export default StarRating;
