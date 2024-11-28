import {Box} from 'native-base';
import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';

function Card({children}: {children: ReactNode}) {
  return (
    <>
      <Box style={styles.container}>{children}</Box>
    </>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
