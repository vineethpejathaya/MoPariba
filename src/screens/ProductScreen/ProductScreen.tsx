import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Center,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
  Theme,
  VStack,
  useTheme,
} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ShoppingBagIcon} from '../../assets/icons/Icons';
import FavoriteCheckbox from '../../components/FavoriteCheckBox';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import StarRating from '../../components/StarRating';
import {RootStackParamList} from '../../navigations/types';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;
type Props = {
  navigation: ProductScreenNavigationProp;
};

function ProductScreen({navigation}: Props) {
  const theme = useTheme();
  const styles = createStyle(theme);
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
          <Text variant={'body1'} style={styles.text}>
            Organic Mountain works as a seller for many organic growers of
            organic lemons. Organic lemons are easy to spot in your produce
            aisle. They are just like regular lemons, but they will usually have
            a few more scars on the outside of the lemon skin. Organic lemons
            are considered to be the world's finest lemon for juicing.
          </Text>

          <VStack space={2} alignItems="center" justifyContent="space-between">
            <HStack style={styles.quantityContainer}>
              <Text style={[styles.text, {fontSize: 16}]} variant={'body1'}>
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
            <Button style={styles.btn} rightIcon={<ShoppingBagIcon />}>
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
  const theme = useTheme();
  const styles = createStyle(theme);
  return (
    <>
      <VStack>
        <Text variant={'subTitle1'} style={styles.prize}>
          $2.22
        </Text>
        <Text variant={'header1'}>Organic Lemons</Text>
        <Text variant={''} style={styles.text}>
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

export const createStyle = (theme: Theme) => {
  const style = StyleSheet.create({
    prize: {
      color: theme.colors.primary[500],
      fontSize: 18,
      lineHeight: 30,
    },
    text: {
      color: 'gray.500',
    },

    quantityContainer: {
      width: '100%',
      padding: 5,
      backgroundColor: theme.colors.white,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btn: {
      fontSize: 18,
      height: 60,
      width: '100%',
    },
  });

  return style;
};
