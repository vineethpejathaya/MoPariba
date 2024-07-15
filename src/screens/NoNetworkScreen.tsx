import {Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {NoNetworkIcon} from '../assets/icons/Icons';
import theme from '../themes/theme';

function NoNetworkScreen() {
  return (
    <>
      <VStack style={styles.container}>
        <NoNetworkIcon />
        <Text variant={'title1'} color={theme.colors.gray[800]}>
          Oops! No Internet Connection
        </Text>
      </VStack>
    </>
  );
}

export default NoNetworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
