import {HStack, Text, useTheme} from 'native-base';
import React from 'react';
import {FilledStarIcon, HalfStarIcon, StarIcon} from '../assets/icons/Icons';

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
    if (index < rating) {
      if (rating - index === 0.5) {
        return <HalfStarIcon />;
      } else {
        return <FilledStarIcon />;
      }
    } else {
      return <StarIcon />;
    }
  };

  return (
    <HStack space={2} alignItems={'center'}>
      {!hideNumber && (
        <Text variant={'body2'} style={{fontSize: 12}}>
          {rating}
        </Text>
      )}

      <HStack space={1} alignItems={'center'}>
        {Array.from({length: maxRating}, (_, index) => renderStar(index))}
      </HStack>
    </HStack>
  );
}

export default StarRating;
