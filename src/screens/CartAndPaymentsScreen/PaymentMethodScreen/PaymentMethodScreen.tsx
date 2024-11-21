import {Box, HStack, ScrollView, Text, VStack} from 'native-base';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../../components/ScreenHeader';
import {NavigationProp} from '../../../navigations/types';
import theme from '../../../themes/theme';

const PaymentMethodSelection = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <>
      <ScreenHeader title={'Payment method'} />
      <ScrollView>
        <VStack padding={2} paddingTop={10} space={2}>
          <Text
            color="black.400"
            fontSize="md"
            fontWeight="bold"
            textAlign={'center'}>
            RECOMMENDED
          </Text>
          <Pressable onPress={() => navigation.navigate('Cart')}>
            <Box bg="white" p={4} borderRadius="md" shadow={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center">
                  <Icon name="account-balance-wallet" color="purple.400" />
                  <Text ml={3} fontSize="md" fontWeight="bold">
                    Razorpay
                  </Text>
                </HStack>
                <Icon
                  name="chevron-right"
                  size={25}
                  color={theme.colors.gray[900]}
                  style={{marginLeft: 'auto'}}
                  onPress={() => navigation.navigate('Cart')}
                />
              </HStack>
            </Box>
          </Pressable>

          <Box bg="white" p={4} borderRadius="md" shadow={1}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center">
                <Icon name="account-balance-wallet" color="purple.400" />
                <Text ml={3} color="gray.700" fontSize="md" fontWeight="bold">
                  Pay Later
                </Text>
              </HStack>
              <Icon
                name="chevron-right"
                size={25}
                color={theme.colors.gray[900]}
                style={{marginLeft: 'auto'}}
                onPress={() => {}}
              />
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default PaymentMethodSelection;
