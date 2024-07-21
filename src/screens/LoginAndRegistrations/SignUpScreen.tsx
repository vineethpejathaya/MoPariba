import {useMutation} from '@apollo/client';
import {Button, Pressable, ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import useToast from '../../hooks/UseToast';
import useValidation from '../../hooks/UseValidation';
import {signUpSchema} from '../../services/form-validations/ValidationSchema';
import {CREATE_CUSTOMER_MUTATION} from '../../services/ggl-queries/LoginAndRegistration/LoginAndRegistration.queries';
import theme from '../../themes/theme';
import {
  Field,
  FormDataType,
  ShowPasswordState,
  SignUpNavigationProp,
  SignUpScreenProps,
} from './LoginAndRegistrations.types';
import LoginScreenTemplate from './components/ScreenTemplate';

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'John',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    isPassword: true,
  },
  {
    name: 'confirmPassword',
    label: 'Re-Type Password',
    placeholder: 'Password',
    type: 'password',
    isPassword: true,
  },
];

function SignUpScreen({navigation}: SignUpScreenProps) {
  return (
    <LoginScreenTemplate
      title={'Sign Up'}
      subTitle={'Please sign up to get started'}>
      <SignUpForm navigation={navigation} />
    </LoginScreenTemplate>
  );
}

export default SignUpScreen;

export const SignUpForm = ({
  navigation,
}: {
  navigation: SignUpNavigationProp;
}) => {
  const {showSuccessToast} = useToast();
  const {validate} = useValidation(signUpSchema);
  const [show, setShow] = useState<ShowPasswordState>({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    is_subscribed: 'false',
  });

  const [createCustomer, {data, loading, error}] = useMutation(
    CREATE_CUSTOMER_MUTATION,
    {
      onCompleted: res => {
        showSuccessToast('User Sign up', 'User created successfully');
        navigation.goBack();
      },
    },
  );

  const handleSignUp = async () => {
    const result = await validate(formData, false);
    if (result.isValid) {
      createCustomer({
        variables: {
          input: {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
            is_subscribed: true,
          },
        },
      });
    } else {
      console.log('Form has errors:', result.errors);
      setErrors(result.errors || {});
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack space={5} w="100%">
          {fields.map(field => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name] || ''}
              height={45}
              inputStyles={{backgroundColor: '#F5F8FA'}}
              onChangeText={e =>
                setFormData(s => ({
                  ...s,
                  [field.name]: e,
                }))
              }
              placeholder={field.placeholder}
              error={errors[field.name]}
              type={
                field.isPassword
                  ? show[field.name]
                    ? 'text'
                    : 'password'
                  : field.type
              }
              InputRightElement={
                field.isPassword ? (
                  <Pressable
                    onPress={() =>
                      setShow(s => ({
                        ...s,
                        [field.name]: !show[field.name],
                      }))
                    }>
                    <Icon
                      style={{marginRight: 15}}
                      name={show[field.name] ? 'visibility' : 'visibility-off'}
                      size={20}
                      color={theme.colors.gray[900]}
                    />
                  </Pressable>
                ) : undefined
              }
            />
          ))}

          <Button
            isLoading={loading}
            spinnerPlacement="end"
            isLoadingText="Submitting"
            onPress={handleSignUp}>
            SIGN UP
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
};