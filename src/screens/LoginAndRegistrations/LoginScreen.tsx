import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Pressable,
  Stack,
  Text,
  VStack,
  theme,
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import ToastAlert from '../../components/ToastAlert';
import {RootStackParamList} from '../../navigations/types';
import {handleLoginValidation} from '../../services/Form Validations/ValidationMethos';
import {LOGIN_MUTATION} from '../../services/GGL-Queries/loginAndRegistartion';
import LoginScreenTemplate from './components/ScreenTemplate';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  return (
    <LoginScreenTemplate
      title={'Log In'}
      subTitle={'Please sign in to your existing account'}
      disableBackBtn={true}>
      <VStack flex={1} px="3" style={{justifyContent: 'space-evenly'}}>
        <LoginForm navigation={navigation} />

        <HStack
          direction={'row'}
          style={{alignItems: 'center', margin: 'auto'}}>
          <Text variant={'title2'}>Don't have an account?</Text>
          <Button
            variant={'ghost'}
            _text={{
              color: theme.colors.orange[500],
            }}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Button>
        </HStack>
        <Text variant={'title2'} style={{textAlign: 'center'}}>
          Or
        </Text>

        <SocialMediaList />
      </VStack>
    </LoginScreenTemplate>
  );
};

export default LoginScreen;

export const LoginForm = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [generateCustomerToken, {data, loading, error}] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: res => {
        AsyncStorage.setItem(
          'userToken',
          res?.generateCustomerToken?.token ?? '',
        );
        navigation.navigate('Home');
      },
      onError: err => {
        toast.show({title: err.message, color: 'red.400'});
      },
    },
  );

  const handleLogin = () => {
    const {isInValid, errorMessage} = handleLoginValidation(formData);
    if (isInValid) {
      toast.show({
        render: ({id}) => {
          return (
            <ToastAlert
              id={id}
              variant={'left-accent'}
              title={'Login form validation failed'}
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
    generateCustomerToken({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <>
      <VStack space={3} w="100%">
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
                color="muted.500"
              />
            </Pressable>
          }
          placeholder="Password"
        />

        <HStack
          direction={'row'}
          style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <Checkbox
            value={'rememberMe'}
            isChecked={formData.rememberMe}
            onChange={e => {
              setFormData(s => ({
                ...s,
                rememberMe: !formData.rememberMe,
              }));
            }}>
            <Text>Remember me</Text>
          </Checkbox>
          <Button
            variant={'ghost'}
            _text={{
              color: theme.colors.orange[400],
            }}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Button>
        </HStack>
      </VStack>
      <Button
        isLoading={loading}
        spinnerPlacement="end"
        isLoadingText="Submitting"
        onPress={handleLogin}>
        Log In
      </Button>
    </>
  );
};

export const SocialMediaList = () => {
  return (
    <>
      <Stack direction={'row'} space={4} style={{margin: 'auto'}}>
        <IconButton
          icon={<FontAwesomeIcon name="facebook" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#395998'}]}
        />
        <IconButton
          icon={<FontAwesomeIcon name="twitter" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#169CE8'}]}
        />
        <IconButton
          icon={<FontAwesomeIcon name="apple" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#1B1F2F'}]}
        />
      </Stack>
    </>
  );
};

const iconStyle = StyleSheet.create({
  style: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    borderRadius: 100,
  },
});
