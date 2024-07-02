import {Spinner, Text, VStack} from 'native-base';
import theme from '../themes/theme';

function SpinnerComponent() {
  return (
    <>
      <VStack
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        space={3}
        px={6}>
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
        <Spinner size="lg" color={theme.colors.primary[900]} />
      </VStack>
    </>
  );
}
export default SpinnerComponent;

const quotes = [
  "We're gathering your favorite items—hang tight!",
  'Shopping made easy, just a moment away!',
  'Great deals loading... almost there!',
  'Just a second while we prepare the latest offers for you!',
  'The best bargains are worth the wait—loading...',
  'Bringing you the future of shopping, hold on tight!',
  'Your personalized shopping experience is on its way!',
  'Your shopping spree is about to begin!',
  'Organizing the best picks just for you—hold on!',
  'A world of products is coming your way—one moment!',
];
