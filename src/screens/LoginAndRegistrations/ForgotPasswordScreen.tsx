import {Button, VStack} from 'native-base';
import React, {useState} from 'react';
import TextField from '../../components/Forms/TextInput';
import {ForgotPasswordScreenProps} from './LoginAndRegistrations.types';
import LoginScreenTemplate from './components/ScreenTemplate';

function ForgotPasswordScreen({navigation}: ForgotPasswordScreenProps) {
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
