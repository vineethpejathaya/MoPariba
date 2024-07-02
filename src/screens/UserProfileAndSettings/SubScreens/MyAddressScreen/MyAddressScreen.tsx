import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from 'native-base';
import {RootStackParamList} from '../../../../navigations/types';

type MyAddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyAddress'
>;

type Props = {
  navigation: MyAddressScreenNavigationProp;
};

function MyAddressScreen({navigation}: Props) {
  return (
    <>
      <Text>My Address</Text>
    </>
  );
}

export default MyAddressScreen;
