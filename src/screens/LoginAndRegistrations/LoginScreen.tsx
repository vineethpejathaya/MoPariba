import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import {useCart} from '../../hooks/UseCart';
import useValidation from '../../hooks/UseValidation';
import {RootStackParamList} from '../../navigations/types';
import {loginSchema} from '../../services/form-validations/ValidationSchema';
import {CREATE_CART_MUTATION} from '../../services/ggl-queries/cart';
import {LOGIN_MUTATION} from '../../services/ggl-queries/loginAndRegistartion';
import {LoginFormData} from '../../services/interfaces/LoginAndRegistartions.interface';
import theme from '../../themes/theme';
import LoginScreenTemplate from './components/ScreenTemplate';
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// type Props = {
//   navigation: LoginScreenNavigationProp;
// };

function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <LoginScreenTemplate
      title={'Log In'}
      subTitle={'Please sign in to your existing account'}
      disableBackBtn={true}>
      <VStack flex={1} px="3" style={{justifyContent: 'space-between'}}>
        <LoginForm />

        <HStack
          direction={'row'}
          style={{alignItems: 'center', margin: 'auto'}}>
          <Text variant={'subTitle2'} fontSize={'xl'}>
            Don't have an account?
          </Text>
          <Button
            variant={'ghost'}
            _text={{
              color: theme.colors.orange[500],
            }}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Button>
        </HStack>
        <Text
          variant={'subTitle2'}
          fontSize={'xl'}
          style={{textAlign: 'center'}}>
          Or
        </Text>

        <SocialMediaList />
      </VStack>
    </LoginScreenTemplate>
  );
}

export default LoginScreen;

export const LoginForm = () => {
  const toast = useToast();
  const {setCartId} = useCart();
  const navigation = useNavigation<any>();
  const {validate} = useValidation(loginSchema);
  const [show, setShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [generateCustomerToken, {data, loading, error}] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: async res => {
        await AsyncStorage.setItem(
          'userToken',
          res?.generateCustomerToken?.token ?? '',
        );
        await createCustomerCart();
        navigation.navigate('MainTabs', {screen: 'Home'});
      },
      onError: err => {
        console.log(err, 'err');
      },
    },
  );

  const [createCustomerCart] = useMutation(CREATE_CART_MUTATION, {
    onCompleted: async res => {
      setCartId(res?.createEmptyCart);
      await AsyncStorage.setItem('cartId', res?.createEmptyCart);
    },
    onError: err => {
      console.log(err, 'err from login create customer cart');
    },
  });

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
                color={theme.colors.gray[900]}
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
        LOG IN
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
