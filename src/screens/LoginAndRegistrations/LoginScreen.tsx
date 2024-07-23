import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Button, Checkbox, HStack, Pressable, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import PressableText from '../../components/Pressable/PressableText';
import {useAuth} from '../../hooks/UseAuth';
import useValidation from '../../hooks/UseValidation';
import {LOGIN_MUTATION} from '../../services/GGL-Queries/LoginAndRegistration/LoginAndRegistration.queries';
import {loginSchema} from '../../services/form-validations/ValidationSchema';
import theme from '../../themes/theme';
import {
  LoginFormData,
  LoginScreenNavigationProp,
  defaultLoginFormState,
} from './LoginAndRegistrations.types';
import LoginScreenTemplate from './components/ScreenTemplate';
import SocialMediaList from './components/SocialMediaList';

function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <LoginScreenTemplate
      title={'Log In'}
      subTitle={'Please sign in to your existing account'}
      disableBackBtn={true}>
      <VStack flex={1} px="3" justifyContent={'space-between'}>
        <LoginForm />

        <HStack space={2} style={{alignItems: 'center', margin: 'auto'}}>
          <Text variant={'label2'} fontSize={'xl'}>
            Don't have an account?
          </Text>
          <PressableText
            onPress={() => navigation.navigate('SignUp')}
            text={'SIGN UP'}
          />
        </HStack>
        <Text variant={'label2'} fontSize={'xl'} style={{textAlign: 'center'}}>
          Or
        </Text>
        <SocialMediaList />
      </VStack>
    </LoginScreenTemplate>
  );
}

export default LoginScreen;

export const LoginForm = () => {
  const {signIn} = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {validate} = useValidation(loginSchema);
  const [show, setShow] = useState<boolean>(false);
  const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>(
    defaultLoginFormState,
  );

  const [generateCustomerToken, {data, loading, error}] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: async res => {
        await AsyncStorage.setItem(
          'userToken',
          res?.generateCustomerToken?.token ?? '',
        );
        await signIn(res?.generateCustomerToken?.token);
      },
      onError: err => {
        console.log(err, 'err');
      },
    },
  );

  const handleLogin = async () => {
    const result = await validate(formData);
    if (result.isValid) {
      generateCustomerToken({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } else {
      console.log('Form has errors:', result.errors);
    }
  };

  useEffect(() => {
    const checkFields = () => {
      const {email, password} = formData;
      setAreFieldsFilled(email !== '' && password !== '');
    };

    checkFields();
  }, [formData]);

  return (
    <>
      <VStack space={7} w="100%">
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
          variant={'filled'}
          value={formData.password}
          type={show ? 'text' : 'password'}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              password: e,
            }));
          }}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <MaterialIcon
                style={{marginRight: 15}}
                name={show ? 'visibility' : 'visibility-off'}
                size={25}
                color={theme.colors.gray[900]}
              />
            </Pressable>
          }
          placeholder="Password"
        />

        <HStack style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <Checkbox
            value={'rememberMe'}
            isChecked={formData.rememberMe}
            onChange={e => {
              setFormData(s => ({
                ...s,
                rememberMe: !formData.rememberMe,
              }));
            }}>
            <Text style={{fontFamily: 'Sen-Regular'}}>Remember me</Text>
          </Checkbox>
          <PressableText
            onPress={() => navigation.navigate('ForgotPassword')}
            text={'Forgot Password'}
          />
        </HStack>
        <Button
          isDisabled={!areFieldsFilled}
          isLoading={loading}
          spinnerPlacement="end"
          isLoadingText="Submitting"
          onPress={handleLogin}>
          LOG IN
        </Button>
      </VStack>
    </>
  );
};
