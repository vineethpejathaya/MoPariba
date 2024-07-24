import {HStack, Icon, Text, VStack} from 'native-base';
import ImageComponent from '../../../components/ImageComponent';
import {SuggestedStore} from '../../../constants/main';
import theme from '../../../themes/theme';
import searchScreenStyles from '../SearchScreen.styles';

function SuggestedStore({
  suggestedStores,
}: {
  suggestedStores: SuggestedStore[];
}) {
  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Suggested Stores</Text>
        <VStack space={3}>
          {suggestedStores?.map((store: any, index: number) => (
            <HStack key={index} style={searchScreenStyles.suggestedStoreItem}>
              <ImageComponent
                styles={searchScreenStyles.suggestedStoreImage}
                source={store?.image ? store?.image : undefined}
                alt={store.name}
              />
              <VStack space={2}>
                <Text variant={'title2'}>{store?.name}</Text>
                <HStack space={1} alignItems="center">
                  <Icon
                    name="star"
                    size={15}
                    color={theme.colors.orange[700]}
                  />
                  <Text variant={'title2'}>{store?.rating}</Text>
                </HStack>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </>
  );
}
export default SuggestedStore;
