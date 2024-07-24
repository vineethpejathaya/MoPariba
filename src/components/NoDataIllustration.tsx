import {Box, Text} from 'native-base';
import {ReactNode} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {bottomNavigatorHeight} from '../constants/config';

function NoDataIllustration({message}: {message: string | ReactNode}) {
  return (
    <>
      <Box style={styles.container}>
        {typeof message == 'string' ? <Text>{message}</Text> : <>{message}</>}
      </Box>
    </>
  );
}

export default NoDataIllustration;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height - (bottomNavigatorHeight + 200),
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
