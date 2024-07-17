import {Box, Image, Text, VStack} from 'native-base';
import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {baseUrl} from '../constants/config';
import theme from '../themes/theme';

const CategoryCard = ({
  title,
  imageUrl,
  onPress,
  cardStyles,
}: {
  title: string;
  imageUrl: string;
  onPress: () => void;
  cardStyles?: StyleProp<ViewStyle>;
}) => {
  return (
    <VStack style={[styles.card, cardStyles]}>
      <TouchableOpacity onPress={onPress}>
        <Box style={styles.imageContainer}>
          {imageUrl && (
            <Image
              source={{uri: `${baseUrl}/${imageUrl}`}}
              style={{width: '80%', height: '80%'}}
              resizeMode="contain"
              alt={''}
            />
          )}
        </Box>
      </TouchableOpacity>
      <Text variant={'body1'} textAlign={'center'}>
        {title}
      </Text>
    </VStack>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    gap: 2,
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 80,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
