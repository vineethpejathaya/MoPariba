import {Box, theme} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

export type ScreenContentProps = {
  containerStyles?: StyleProp<ViewStyle>;
} & InterfaceBoxProps;

function ScreenContent({containerStyles, ...rest}: ScreenContentProps) {
  const defaultStyles: ViewStyle = {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: theme.colors.white,
  };

  const combinedStyles = StyleSheet.flatten([defaultStyles, containerStyles]);
  return (
    <Box {...rest} style={combinedStyles}>
      {rest.children}
    </Box>
  );
}

export default ScreenContent;

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white,
  },
});
