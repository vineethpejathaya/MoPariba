import {Box, theme} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {bottomNavigatorHeight} from '../constants/config';

export type ScreenContentProps = {
  containerStyles?: StyleProp<ViewStyle>;
} & InterfaceBoxProps;

function ScreenContent({containerStyles, ...rest}: ScreenContentProps) {
  const defaultStyles: ViewStyle = {
    paddingHorizontal: 10,
    paddingTop: 5,
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: bottomNavigatorHeight + 5,
  };

  const combinedStyles = StyleSheet.flatten([defaultStyles, containerStyles]);
  return (
    <Box style={combinedStyles}>
      <ScrollView>
        <Box {...rest}>{rest.children}</Box>
      </ScrollView>
    </Box>
  );
}

export default ScreenContent;
