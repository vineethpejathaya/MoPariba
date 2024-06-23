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
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import {RootStackParamList} from '../../navigations/types';
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
      <VStack flex={1} px="3" style={{justifyContent: 'space-between'}}>
        <LoginForm navigation={navigation} />
        <Stack direction={'row'} style={{alignItems: 'center', margin: 'auto'}}>
          <Text variant={'title2'}>Don't have an account?</Text>
          <Button
            variant={'ghost'}
            _text={{
              color: theme.colors.orange[500],
            }}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Button>
        </Stack>
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
  const [isLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    checked: false,
  });
  return (
    <>
      <VStack space={7} w="100%">
        <TextField
          label={'Email'}
          name={'email'}
          value={formData.email}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              email: e,
            }));
          }}
        />
        <TextField
          label={'Password'}
          name={'password'}
          value={formData.password}
          type={show ? 'text' : 'password'}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              password: e,
            }));
          }}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                style={{marginRight: 5}}
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
          <Checkbox value={'rememberMe'} isChecked={formData.checked}>
            Remember me
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

        <Button onPress={() => navigation.navigate('Home')}>Log In</Button>
      </VStack>
    </>
  );
};

export const SocialMediaList = () => {
  return (
    <>
      <VStack space={4} style={{alignItems: 'center'}}>
        <Text variant={'title2'}>Or</Text>

        <Stack direction={'row'} space={4}>
          <IconButton
            icon={<Icon name="facebook" size={35} color="white" />}
            style={[iconStyle.style, {backgroundColor: '#395998'}]}
          />
          <IconButton
            icon={<Icon name="twitter" size={35} color="white" />}
            style={[iconStyle.style, {backgroundColor: '#169CE8'}]}
          />
          <IconButton
            icon={<Icon name="apple" size={35} color="white" />}
            style={[iconStyle.style, {backgroundColor: '#1B1F2F'}]}
          />
        </Stack>
      </VStack>
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
