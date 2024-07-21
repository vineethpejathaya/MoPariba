import {Pressable, Text, theme} from 'native-base';
import {StyleProp, TextStyle} from 'react-native';

function PressableText({
  onPress,
  text,
  styles,
}: {
  text: string;
  onPress: () => void;
  styles?: StyleProp<TextStyle>;
}) {
  return (
    <>
      <Pressable onPress={onPress}>
        {({isPressed}) => (
          <Text
            variant={'label2'}
            style={[
              {
                color: theme.colors.orange[500],
                fontFamily: 'Sen-Medium',
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              },
              styles,
            ]}>
            {text}
          </Text>
        )}
      </Pressable>
    </>
  );
}

export default PressableText;
