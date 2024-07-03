import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, VStack} from 'native-base';
import React, {useState} from 'react';
import TextField from '../../components/Forms/TextInput';
import {RootStackParamList} from '../../navigations/types';
import LoginScreenTemplate from './components/ScreenTemplate';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: ForgotPasswordNavigationProp;
};

function ForgotPasswordScreen({navigation}: Props) {
  const [formData, setFormData] = useState({
    email: '',
  });

  return (
    <LoginScreenTemplate
      title={'Forgot Password'}
      subTitle={'Please sign in to your existing account'}>
      <VStack space={10} w="100%">
        <TextField
          label={'Email'}
          name={'email'}
          inputStyles={{backgroundColor: '#F5F8FA'}}
          value={formData.email}
          onChangeText={e => {
            setFormData(s => ({
              ...s,
              email: e,
            }));
          }}
        />

        <Button onPress={() => navigation.navigate('EmailVerification')}>
          SEND CODE
        </Button>
      </VStack>
    </LoginScreenTemplate>
  );
}

export default ForgotPasswordScreen;
