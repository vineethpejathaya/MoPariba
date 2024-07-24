import {Spinner, Text, VStack} from 'native-base';
import {quotes} from '../constants/quotes';
import theme from '../themes/theme';

function SpinnerComponent({onlySpinner = false}: {onlySpinner?: boolean}) {
  return (
    <>
      <VStack
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        space={3}
        px={6}>
        {!onlySpinner && (
          <Text
            variant={'body2'}
            style={{
              textAlign: 'center',
              fontSize: 15,
              lineHeight: 25,
              color: theme.colors.gray[900],
            }}>
            {quotes[Math.floor(Math.random() * 10)]}
          </Text>
        )}

        <Spinner size="lg" color={theme.colors.primary[900]} />
      </VStack>
    </>
  );
}
export default SpinnerComponent;
