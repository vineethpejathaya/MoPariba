import {useMutation} from '@apollo/client';
import {Box, Button, VStack, theme} from 'native-base';
import React, {useEffect, useState} from 'react';
import {KeyboardType, StyleSheet} from 'react-native';
import SingleSelect from '../../../components/Forms/SingleSelect';
import TextField from '../../../components/Forms/TextInput';
import ScreenContent from '../../../components/ScreenContent';
import ScreenHeader from '../../../components/ScreenHeader';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import useToast from '../../../hooks/UseToast';
import useValidation from '../../../hooks/UseValidation';
import {UPDATE_CUSTOMER_DETAILS} from '../../../services/GGL-Queries/Profile/Profile.queries';
import {myProfileSchema} from '../../../services/form-validations/ValidationSchema';

interface FormDataType {
  firstName: string;
  lastName: string;
  gender: number | null;
  date_of_birth: string;
}
export type FieldName = keyof FormDataType;

export interface ProfileFormField {
  name: FieldName;
  label: string;
  placeholder: string;
  type?: 'password' | 'text';
  isPassword?: boolean;
  keyboardType: KeyboardType;
}

const fields: ProfileFormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    keyboardType: 'default',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
    keyboardType: 'default',
  },
];

function MyProfile() {
  const {showSuccessToast} = useToast();
  const {validate} = useValidation(myProfileSchema);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const {customer, setCustomer} = useCustomerStore();
  const [formData, setFormData] = useState<FormDataType>({
    firstName: customer?.firstname ?? '',
    lastName: customer?.lastname ?? '',
    gender: customer?.gender ?? null,
    date_of_birth: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      firstName: customer?.firstname ?? '',
      lastName: customer?.lastname ?? '',
      gender: customer?.gender ?? null,
    }));
  }, [customer]);

  const [updateCustomer, {loading: updating}] = useMutation(
    UPDATE_CUSTOMER_DETAILS,
    {
      onCompleted: res => {
        showSuccessToast('User Profile', 'Profile updated successfully');
        setCustomer(res?.updateCustomerV2?.customer);
      },
    },
  );

  const handleSaveChanges = async () => {
    const result = await validate(formData, false);

    updateCustomer({
      variables: {
        input: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          gender: formData.gender,
        },
      },
    });
  };

  return (
    <>
      <ScreenHeader title={'My Profile'} />
      <VStack style={styles.container}>
        <ScreenContent containerStyles={styles.content}>
          <VStack space={5} padding={2}>
            {fields.map(field => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]?.toString() || ''}
                height={45}
                keyboardType={field.keyboardType}
                inputStyles={{backgroundColor: '#F5F8FA'}}
                onChangeText={e =>
                  setFormData(s => ({
                    ...s,
                    [field.name]: e,
                  }))
                }
                placeholder={field.placeholder}
                error={errors[field.name]}
                type={field.type}
              />
            ))}
            <SingleSelect
              name={'gender'}
              label={'Gender'}
              onValueChange={e =>
                setFormData(s => ({
                  ...s,
                  gender: e,
                }))
              }
              value={formData.gender}
              options={[
                {label: 'Male', value: 1},
                {label: 'Female', value: 2},
              ]}
            />
          </VStack>
        </ScreenContent>

        <Box style={styles.buttonContainer}>
          <Button
            onPress={handleSaveChanges}
            isLoading={updating}
            spinnerPlacement="end">
            Update profile
          </Button>
        </Box>
      </VStack>
    </>
  );
}

export default MyProfile;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    marginTop: 3,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
