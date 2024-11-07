import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Button, HStack, Input, VStack} from 'native-base';
import {useRef, useState} from 'react';
import {useAuth} from '../../hooks/UseAuth';
import useValidation from '../../hooks/UseValidation';
import {GENERATE_LOGIN_TOKEN_WITH_OTP} from '../../services/GGL-Queries/LoginAndRegistration/LoginAndRegistration.queries';
import {otpSchema} from '../../services/form-validations/ValidationSchema';
import {
  OtpScreenNavigationProp,
  OtpScreenRouteProp,
} from './LoginAndRegistrations.type';
import LoginScreenTemplate from './components/ScreenTemplate';

function OtpScreen({route}: {route: OtpScreenRouteProp}) {
  const {mobileNumber} = route.params;

  return (
    <LoginScreenTemplate
      title={'Enter OTP'}
      subTitle={`Please enter  4 digit code sent to +91${mobileNumber} `}
      disableBackBtn={true}>
      <VStack flex={1} px="3" justifyContent={'space-between'}>
        <OtpForm mobileNumber={mobileNumber} />
      </VStack>
    </LoginScreenTemplate>
  );
}

export default OtpScreen;

const OtpForm = ({mobileNumber}: {mobileNumber: string}) => {
  const inputs = useRef<Array<any>>([]);
  const {signIn} = useAuth();
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const {validate} = useValidation(otpSchema);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generateCustomerToken, {data, loading, error}] = useMutation(
    GENERATE_LOGIN_TOKEN_WITH_OTP,
    {
      onCompleted: async res => {
        await AsyncStorage.setItem(
          'userToken',
          res?.generateLoginTokenWithMobileOtp ?? '',
        );
        await signIn(res?.generateLoginTokenWithMobileOtp);
      },
      onError: err => {
        console.log(err, 'err');
      },
    },
  );

  const handleLogin = async () => {
    const otpValue = otp.join('');
    const result = await validate({otp: otpValue});
    if (result.isValid) {
      generateCustomerToken({
        variables: {
          mobile_number: mobileNumber,
          login_otp: otpValue,
        },
      });
    } else {
      console.log('Form has errors:', result.errors);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    if (isNaN(+text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next input or submit if complete
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <>
      <VStack space={4} w="100%">
        <HStack space={4} justifyContent={'center'}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={el => (inputs.current[index] = el)}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              maxLength={1}
              variant={'filled'}
              keyboardType="numeric"
              textAlign="center"
              w={12}
              h={12}
              fontSize="xl"
            />
          ))}
        </HStack>

        <Button isLoading={loading} onPress={handleLogin} mt={4}>
          CONTINUE
        </Button>
      </VStack>
    </>
  );
};
