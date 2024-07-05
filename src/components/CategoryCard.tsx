import {Box, Image, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {baseUrl} from '../constants/main';
import theme from '../themes/theme';

const CategoryCard = ({
  title,
  imageUrl,
  onPress,
}: {
  title: string;
  imageUrl: string;
  onPress: () => void;
}) => {
  return (
    <VStack style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Box style={styles.imageContainer}>
          <Image
            source={{uri: `${baseUrl}/${imageUrl}`}}
            style={{width: '80%', height: '80%'}}
            resizeMode="contain"
            alt={''}
          />
        </Box>
      </TouchableOpacity>
      <Text style={{textAlign: 'center'}}>{title}</Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 80,
  },
  card: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
    margin: 5,
  },
  imageContainer: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryCard;
