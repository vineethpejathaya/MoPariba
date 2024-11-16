import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Button, HStack, Input, Text, VStack} from 'native-base';
import {useEffect, useRef, useState} from 'react';
import PressableText from '../../components/Pressable/PressableText';
import {useAuth} from '../../hooks/UseAuth';
import useValidation from '../../hooks/UseValidation';
import {
  GENERATE_LOGIN_TOKEN_WITH_OTP,
  GENERATE_OTP_FOR_LOGIN,
} from '../../services/GGL-Queries/LoginAndRegistration/LoginAndRegistration.queries';
import {otpSchema} from '../../services/form-validations/ValidationSchema';
import theme from '../../themes/theme';
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
      subTitle={`Enter 4 digit code sent  to +91 ${mobileNumber} `}
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
  const [state, setState] = useState({
    otp: ['', '', '', ''],
    timer: 60,
    canResend: false,
  });

  const [generateOtpForLogin, {data: otpData, loading: loadingOtp}] =
    useMutation(GENERATE_OTP_FOR_LOGIN, {
      onCompleted: async res => {
        setState(prev => ({
          ...prev,
          timer: 60,
          canResend: false,
        }));
      },
      onError: err => {
        console.log(err, 'err');
      },
    });

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
    const otpValue = state.otp.join('');
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
    const newOtp = [...state.otp];
    newOtp[index] = text;
    setState(prev => ({
      ...prev,
      otp: newOtp,
    }));

    // Move focus to the next input or submit if complete
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      state.otp[index] === '' &&
      index > 0
    ) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResendOtp = () => {
    generateOtpForLogin({
      variables: {
        mobile_number: mobileNumber,
      },
    });
  };

  useEffect(() => {
    if (state.timer > 0) {
      const countdown = setInterval(
        () =>
          setState(prev => ({
            ...prev,
            timer: prev.timer - 1,
          })),
        1000,
      );
      return () => clearInterval(countdown);
    } else {
      setState(prev => ({
        ...prev,
        canResend: true,
      }));
    }
  }, [state.timer]);

  return (
    <>
      <VStack space={4} w="100%" paddingTop={10}>
        <HStack justifyContent={'space-between'}>
          <Text variant={'label2'}>Code</Text>
          {state.canResend ? (
            <PressableText
              onPress={handleResendOtp}
              text={'Resend'}
              styles={{color: theme.colors.black}}
            />
          ) : (
            <Text>{`Resend in ${state.timer}s`}</Text>
          )}
        </HStack>
        <HStack space={4} justifyContent={'center'}>
          {state.otp.map((digit: string, index: number) => (
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
              w={16}
              h={16}
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
