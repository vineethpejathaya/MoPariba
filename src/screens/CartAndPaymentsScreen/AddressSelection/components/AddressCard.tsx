import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {AddressIcon} from '../../../../assets/icons/Icons';
import {CustomerAddress} from '../../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

type AddressCardProps = {
  address: CustomerAddress;
  isSelected: boolean;
  handleAddressSelect: () => void;
};

function AddressCard({
  address,
  isSelected = false,
  handleAddressSelect,
}: AddressCardProps): JSX.Element {
  return (
    <>
      <Pressable
        onPress={handleAddressSelect}
        p="4"
        mb="2"
        borderRadius="md"
        bg="white"
        shadow="1">
        <VStack space={2}>
          <Text>DELIVER TO </Text>
          <HStack space={4} alignItems="center">
            <AddressIcon />
            <VStack>
              <Text
                fontWeight={
                  'bold'
                }>{`${address?.firstname} ${address?.lastname}`}</Text>
              <Text mt="1" fontSize="sm">
                {`${address?.street?.join(', ')}\n ${address?.city}`}
              </Text>
              <Text mt="1" fontSize="xs">
                Phone: {address.telephone}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Pressable>
    </>
  );
}

export default AddressCard;
