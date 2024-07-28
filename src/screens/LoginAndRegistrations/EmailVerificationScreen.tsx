import {Button, HStack, Input, Text, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EmailVerificationScreenProps} from './LoginAndRegistrations.type';
import LoginScreenTemplate from './components/ScreenTemplate';

function EmailVerificationScreen({navigation}: EmailVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs: any = useRef([]);

  const handleChange = (text: string, index: number) => {
    if (isNaN(+text)) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to the next input box or submit if complete
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <LoginScreenTemplate
      title={'Verification'}
      subTitle={'We have sent a code to your email'}>
      <KeyboardAwareScrollView>
        <VStack space={4} w="100%">
          <HStack justifyContent={'space-between'}>
            <Text variant={'label2'}>Code</Text>
            <Text>Resend</Text>
          </HStack>

          <HStack space={4} justifyContent={'center'}>
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={el => (inputs.current[index] = el)}
                value={digit}
                onChangeText={text => handleChange(text, index)}
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

          <Button>VERIFY</Button>
        </VStack>
      </KeyboardAwareScrollView>
    </LoginScreenTemplate>
  );
}

export default EmailVerificationScreen;
