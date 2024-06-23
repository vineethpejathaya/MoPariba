import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Pressable, VStack} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/Forms/TextInput';
import {RootStackParamList} from '../../navigations/types';
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
        <SignUpForm />
      </VStack>
    </LoginScreenTemplate>
  );
};

export default SignUpScreen;

export const SignUpForm = () => {
  const [isLoading] = useState(false);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <>
      <VStack space={7} w="100%">
        <TextField
          label={'Name'}
          name={'name'}
          value={formData.name}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              name: e,
            }));
          }}
        />
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
                style={{marginRight: 5}}
                name={show ? 'visibility' : 'visibility-off'}
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
          value={formData.confirmPassword}
          type={show.confirmPassword ? 'text' : 'password'}
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
                style={{marginRight: 5}}
                name={show.confirmPassword ? 'visibility' : 'visibility-off'}
                size={25}
                color="muted.500"
              />
            </Pressable>
          }
          placeholder="Password"
        />
        <Button onPress={() => {}}>SIGN UP</Button>
      </VStack>
    </>
  );
};
