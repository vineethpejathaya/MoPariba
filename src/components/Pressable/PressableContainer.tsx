import {Pressable} from 'native-base';
import {Animated, StyleProp, ViewStyle} from 'react-native';

function PressableContainer({
  scaleValue = 1,
  onPress,
  children,
  styles,
  animatedStyles,
}: {
  onPress: () => void;
  children: any;
  scaleValue?: number;
  styles?: StyleProp<ViewStyle>;
  animatedStyles?: StyleProp<ViewStyle>;
}) {
  const scale = new Animated.Value(scaleValue);
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animaStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [{scale: scale}],
  };

  return (
    <>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles]}>
        <Animated.View style={[animaStyle, animatedStyles]}>
          {children}
        </Animated.View>
      </Pressable>
    </>
  );
}
export default PressableContainer;
