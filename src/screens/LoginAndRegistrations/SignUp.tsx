import {useMutation} from '@apollo/client';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Pressable, ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import useValidation from '../../hooks/UseValidation';
import {RootStackParamList} from '../../navigations/types';
import {signUpSchema} from '../../services/form-validations/ValidationSchema';
import {CREATE_CUSTOMER_MUTATION} from '../../services/ggl-queries/loginAndRegistartion';
import theme from '../../themes/theme';
import LoginScreenTemplate from './components/ScreenTemplate';

type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpNavigationProp;
};

function SignUpScreen({navigation}: Props) {
  return (
    <LoginScreenTemplate
      title={'Sign Up'}
      subTitle={'Please sign up to get started'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack space={4} w="100%" px={4}>
          <SignUpForm navigation={navigation} />
        </VStack>
      </ScrollView>
    </LoginScreenTemplate>
  );
}

export default SignUpScreen;

export const SignUpForm = ({
  navigation,
}: {
  navigation: SignUpNavigationProp;
}) => {
  const {validate} = useValidation(signUpSchema);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    is_subscribed: false,
  });

  const [createCustomer, {data, loading, error}] = useMutation(
    CREATE_CUSTOMER_MUTATION,
    {
      onCompleted: res => {
        navigation.navigate('Login');
      },
      onError: err => {},
    },
  );

  const handleSignUp = async () => {
    const result = await validate(formData);
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
    }
  };

  return (
    <>
      <VStack space={5} w="100%">
        <TextField
          label={'First Name'}
          name={'firstName'}
          value={formData.firstName}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              firstName: e,
            }));
          }}
          placeholder="John"
        />

        <TextField
          label={'Last Name'}
          name={'lastName'}
          value={formData.lastName}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              lastName: e,
            }));
          }}
          placeholder="Doe"
        />

        <TextField
          label={'Email'}
          name={'email'}
          value={formData.email}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              email: e,
            }));
          }}
          placeholder="example@gmail.com"
        />

        <TextField
          label={'Password'}
          name={'password'}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          value={formData.password}
          type={show.password ? 'text' : 'password'}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              password: e,
            }));
          }}
          InputRightElement={
            <Pressable
              onPress={() => setShow(s => ({...s, password: !show.password}))}>
              <Icon
                style={{marginRight: 15}}
                name={show.password ? 'visibility' : 'visibility-off'}
                size={25}
                color={theme.colors.gray[900]}
              />
            </Pressable>
          }
          placeholder="Password"
        />

        <TextField
          label={'Re-Type Password'}
          name={'confirmPassword'}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          type={show.confirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              confirmPassword: e,
            }));
          }}
          InputRightElement={
            <Pressable
              onPress={() =>
                setShow(s => ({...s, confirmPassword: !show.confirmPassword}))
              }>
              <Icon
                style={{marginRight: 15}}
                name={show.confirmPassword ? 'visibility' : 'visibility-off'}
                size={25}
                color={theme.colors.gray[900]}
              />
            </Pressable>
          }
          placeholder="Password"
        />

        <Button
          isLoading={loading}
          spinnerPlacement="end"
          isLoadingText="Submitting"
          onPress={handleSignUp}>
          SIGN UP
        </Button>
      </VStack>
    </>
  );
};
