import {Box, Text} from 'native-base';
import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';

function NoDataIllustration({message}: {message: string | ReactNode}) {
  return (
    <>
      <Box style={styles.container}>
        <Text>{message}</Text>
      </Box>
    </>
  );
}

export default NoDataIllustration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
