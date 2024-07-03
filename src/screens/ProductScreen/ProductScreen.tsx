import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Center,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ShoppingBagIcon} from '../../assets/icons/Icons';
import FavoriteCheckbox from '../../components/FavoriteCheckBox';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import StarRating from '../../components/StarRating';
import {RootStackParamList} from '../../navigations/types';
import theme from '../../themes/theme';
import productStyles from './styles';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;
type Props = {
  navigation: ProductScreenNavigationProp;
};

function ProductScreen({navigation}: Props) {
  return (
    <>
      <ScreenHeader />
      <ScreenContent>
        <Center style={{height: Dimensions.get('window').height * 0.4}}>
          <Image
            source={require('../../assets/images/pngs/lime.png')}
            alt="Organic Lemons"
            resizeMethod={'resize'}
            resizeMode="contain"
            style={{width: 300, height: 300}}
          />
        </Center>
        <VStack
          space={2}
          px={5}
          style={{height: Dimensions.get('window').height * 0.6}}
          alignItems={'stretch'}>
          <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
            <ProductBrief navigation={navigation} />
            <FavoriteCheckbox />
          </HStack>
          <Text variant={'body1'} style={productStyles.text}>
            Organic Mountain works as a seller for many organic growers of
            organic lemons. Organic lemons are easy to spot in your produce
            aisle. They are just like regular lemons, but they will usually have
            a few more scars on the outside of the lemon skin. Organic lemons
            are considered to be the world's finest lemon for juicing.
          </Text>

          <VStack space={2} alignItems="center" justifyContent="space-between">
            <HStack style={productStyles.quantityContainer}>
              <Text
                style={[productStyles.text, {fontSize: 16}]}
                variant={'body1'}>
                Quantity
              </Text>
              <HStack space={2} alignItems="center">
                <IconButton
                  icon={
                    <FontAwesomeIcon name={'minus'} size={18} color={'green'} />
                  }
                  onPress={() => {}}
                />
                <Divider orientation="vertical" />
                <Text variant={'subheader1'}>3</Text>
                <IconButton
                  icon={
                    <FontAwesomeIcon name={'plus'} size={18} color={'green'} />
                  }
                  onPress={() => {}}
                />
                <Divider orientation="vertical" />
              </HStack>
            </HStack>
            <Button style={productStyles.btn} rightIcon={<ShoppingBagIcon />}>
              Add to cart
            </Button>
          </VStack>
        </VStack>
      </ScreenContent>
    </>
  );
}

export default ProductScreen;

export const ProductBrief = ({navigation}: any) => {
  return (
    <>
      <VStack>
        <Text variant={'subTitle1'} style={productStyles.prize}>
          $2.22
        </Text>
        <Text variant={'header1'}>Organic Lemons</Text>
        <Text variant={''} style={productStyles.text}>
          1.50 lbs
        </Text>
        <HStack alignItems={'center'}>
          <StarRating rating={4.5} maxRating={5} />
          <Button
            variant={'link'}
            _text={{
              color: theme.colors.gray[900],
            }}
            onPress={() => navigation.navigate('Reviews')}>
            (89 reviews)
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
