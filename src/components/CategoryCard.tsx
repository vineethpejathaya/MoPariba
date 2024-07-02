import {Box, Image, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const CategoryCard = ({
  title,
  price,
  imageUrl,
}: {
  title: string;
  price: number;
  imageUrl: string;
}) => {
  return (
    <Box style={styles.cardContainer}>
      <Image
        source={
          imageUrl
            ? {uri: imageUrl}
            : require('../assets/images/pngs/altImage.png')
        }
        style={styles.image}
      />
      <Box style={styles.card}>
        <VStack space={2} alignItems="center">
          <Text variant={'subheader2'} style={{textAlign: 'center'}}>
            {title}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    margin: 4,
  },

  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: -20,
    zIndex: 1,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 150,
    height: 144,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CategoryCard;
