import {Box, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import theme from '../../../themes/theme';

function AnimatedSkeleton() {
  const [shimmerAnim] = useState(new Animated.Value(0));
  const {height} = Dimensions.get('window');
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f0f0f0'],
  });
  const itemHeight = 100;
  const numberOfItems = Math.ceil(height / itemHeight);

  return (
    <>
      <View style={styles.mainContainer}>
        {[...Array(numberOfItems)].map((_, index) => (
          <HStack style={styles.container}>
            <HStack space={2} alignItems={'center'}>
              <Box style={styles.imageContainer} />
              <VStack space={2}>
                <Box style={[styles.linePlaceholder]} />
                <Box style={[styles.linePlaceholder]} />
              </VStack>
            </HStack>
          </HStack>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  headerPlaceholder: {
    width: '60%',
    height: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  linePlaceholder: {
    flex: 1,
    height: 15,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: theme.colors.gray[500],
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[500],
  },

  imageContainer: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedSkeleton;
