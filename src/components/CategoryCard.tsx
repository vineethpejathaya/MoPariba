import {Box, Image, Text, VStack} from 'native-base';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {baseUrl} from '../constants/main';
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
    <Box>
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
        <Text>{title}</Text>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 80,
  },
  card: {
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 150,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryCard;
