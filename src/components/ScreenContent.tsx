import {Box, theme} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';

export type ScreenContentProps = {
  containerStyles?: StyleProp<ViewStyle>;
} & InterfaceBoxProps;

function ScreenContent({containerStyles, ...rest}: ScreenContentProps) {
  const defaultStyles: ViewStyle = {
    paddingHorizontal: 10,
    paddingTop: 5,
    flex: 1,
    backgroundColor: theme.colors.white,
  };

  const combinedStyles = StyleSheet.flatten([defaultStyles, containerStyles]);
  return (
    <ScrollView style={combinedStyles}>
      <Box {...rest}>{rest.children}</Box>
    </ScrollView>
  );
}

export default ScreenContent;
