import {Box, Button, Radio} from 'native-base';
import React from 'react';
import AddressForm from '../../../../components/AddressForm';
import ModalButton from '../../../../components/ModalButton';
import UserAddress from '../../../../components/UserAddress';
import {CustomerAddress} from '../../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import AddressSelectionStyles from '../AddressSelection.styles';

type AddressCardProps = {
  address: CustomerAddress;
  isSelected: boolean;
  onDeliver: (address: CustomerAddress) => void;
};

function AddressCard({
  address,
  isSelected,
  onDeliver,
}: AddressCardProps): JSX.Element {
  return (
    <>
      <Box style={AddressSelectionStyles.addressCardContainer}>
        <Box style={isSelected ? AddressSelectionStyles.addressSelected : {}}>
          <Radio colorScheme="emerald" value={address.id.toString()}>
            <UserAddress address={address} />
          </Radio>
        </Box>
        {isSelected && (
          <>
            <Button
              style={AddressSelectionStyles.Btn}
              _text={AddressSelectionStyles.btnTxt}
              onPress={() => onDeliver(address)}>
              Deliver to this address
            </Button>
            <ModalButton
              anchor={({open}) => (
                <Button
                  style={AddressSelectionStyles.secBtn}
                  _text={AddressSelectionStyles.secBtnTxt}
                  onPress={open}>
                  Edit Address
                </Button>
              )}
              title="Edit Address"
              content={({close}) => (
                <AddressForm address={address} countries={[]} />
              )}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default AddressCard;
