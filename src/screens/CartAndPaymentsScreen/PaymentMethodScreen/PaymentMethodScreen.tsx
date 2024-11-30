import {HStack, ScrollView, Text, VStack} from 'native-base';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../../components/Card';
import PressableContainer from '../../../components/Pressable/PressableContainer';
import {NavigationProp} from '../../../navigations/types';
import theme from '../../../themes/theme';

const PaymentMethodSelection = ({close}: {close: () => void}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <ScrollView>
        <VStack padding={2} space={2}>
          {/* <Text
            color={theme.colors.black[200]}
            fontSize="md"
            fontWeight="bold"
            textAlign={'center'}>
            RECOMMENDED
          </Text> */}
          <PressableContainer onPress={close}>
            <Card>
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
            </Card>
          </PressableContainer>

          <Card>
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
          </Card>
        </VStack>
      </ScrollView>
    </>
  );
};

export default PaymentMethodSelection;
