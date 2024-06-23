import {Box, theme} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {StyleSheet} from 'react-native';

function ScreenContent(props: InterfaceBoxProps) {
  return (
    <Box {...props} style={Styles.container}>
      {props.children}
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
