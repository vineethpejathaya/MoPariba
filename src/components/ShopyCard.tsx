import {Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from './ResponsiveImage';
const ShopCard = () => {
  return (
    <Box style={styles.card}>
      <ResponsiveImage styles={styles.image} alt={'image'} />
      <VStack p="4" space={2}>
        <Text variant={'header2'}>Grocery Shop</Text>
        <Text variant={'subTitle2'} style={styles.subtitle}>
          Fruit, Vegetable
        </Text>
        <HStack alignItems="center" mt="2" space={3}>
          <HStack alignItems="center">
            <Icon name="star" color="orange.500" size={4} />
            <Text fontSize="md" ml="1">
              4.7
            </Text>
          </HStack>
          <HStack alignItems="center">
            <FontAwesomeIcon name="truck" color="orange.500" size={4} />
            <Text fontSize="md" ml="1">
              Free
            </Text>
          </HStack>
          <HStack alignItems="center">
            <FontAwesomeIcon name="clock-o" color="orange.500" size={4} />
            <Text fontSize="md" ml="1">
              20 min
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ShopCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 137,
  },
  subtitle: {
    lineHeight: 16.84,
    color: '#A0A5BA',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
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
