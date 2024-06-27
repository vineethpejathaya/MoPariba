import {useMutation} from '@apollo/client';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Pressable, VStack, useToast} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import ToastAlert from '../../components/ToastAlert';
import {RootStackParamList} from '../../navigations/types';
import {handleSignUpValidation} from '../../services/Form Validations/ValidationMethos';
import {CREATE_CUSTOMER_MUTATION} from '../../services/GGL-Queries/loginAndRegistartion';
import LoginScreenTemplate from './components/ScreenTemplate';

type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  return (
    <LoginScreenTemplate
      title={'Sign Up'}
      subTitle={'Please sign up to get started'}>
      <VStack space={4} w="100%">
        <SignUpForm navigation={navigation} />
      </VStack>
    </LoginScreenTemplate>
  );
};

export default SignUpScreen;

export const SignUpForm = ({
  navigation,
}: {
  navigation: SignUpNavigationProp;
}) => {
  const toast = useToast();
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
        toast.show({
          render: ({id}) => {
            return (
              <ToastAlert
                id={id}
                variant={'left-accent'}
                title={'Sign up successful'}
                status={'success'}
              />
            );
          },
          placement: 'top-right',
        });
        navigation.navigate('Login');
      },
      onError: err => {
        toast.show({title: err.message});
        console.log(err, 'err');
      },
    },
  );

  const handleSignUp = () => {
    const {isInValid, errorMessage} = handleSignUpValidation(formData);
    console.log('clicked', isInValid);
    if (isInValid) {
      toast.show({
        render: ({id}) => {
          return (
            <ToastAlert
              id={id}
              variant={'left-accent'}
              title={'Sign up form validation failed'}
              description={errorMessage}
              status={'error'}
              isClosable={true}
            />
          );
        },
        placement: 'top-right',
      });
      return;
    }

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
  };

  return (
    <>
      <VStack space={7} w="100%">
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
                style={{marginRight: 10}}
                name={show.password ? 'visibility' : 'visibility-off'}
                size={25}
                color="muted.500"
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
                style={{marginRight: 10}}
                name={show.confirmPassword ? 'visibility' : 'visibility-off'}
                size={25}
                color="muted.500"
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
