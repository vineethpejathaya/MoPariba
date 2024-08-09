import {Box} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, StyleSheet, ViewStyle} from 'react-native';

const LinearProgress = ({
  height = 1,
  containerStyles,
}: {
  height?: number;
  containerStyles?: StyleProp<ViewStyle>;
}) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      widthAnim.setValue(0);
      Animated.timing(widthAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => animate());
    };

    animate();
  }, [widthAnim]);

  const widthInterpolation = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Box
      style={[containerStyles]}
      height={height}
      width="full"
      backgroundColor="coolGray.200"
      overflow="hidden"
      borderRadius="md">
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#23AA49',
            width: widthInterpolation,
          },
        ]}
      />
    </Box>
  );
};

export default LinearProgress;
