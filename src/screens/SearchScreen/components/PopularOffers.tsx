import {Box, HStack, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ImageComponent from '../../../components/ImageComponent';
import {PopularOffer} from '../../../constants/main';
import searchScreenStyles from '../SearchScreen.styles';
import {SearchScreenNavigationProp} from '../SearchScreen.type';

function PopularOffersSection({
  navigation,
  popularOffers,
}: {
  navigation: SearchScreenNavigationProp;
  popularOffers: PopularOffer[];
}) {
  return (
    <>
      <VStack space={2}>
        <Text variant={'header2'}>Popular Offers</Text>
        <Box style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
          {popularOffers?.map((offer: any, index: number) => (
            <Box key={index} style={searchScreenStyles?.categoryContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <VStack space={2}>
                  <ImageComponent
                    styles={searchScreenStyles?.categoryImage}
                    source={offer?.image ?? undefined}
                    alt={offer?.name}
                    height={120}
                    width={122}
                  />
                  <Text variant={'subheader2'}>{offer?.name}</Text>
                  <HStack space={3}>
                    <Text>{offer?.discount}</Text>
                  </HStack>
                </VStack>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </VStack>
    </>
  );
}

export default PopularOffersSection;
