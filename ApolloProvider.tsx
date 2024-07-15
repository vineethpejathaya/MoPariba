import {ApolloProvider} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import createApolloClient from './ApolloClient';
import {useAuth} from './src/hooks/UseAuth';
import useToast from './src/hooks/UseToast';
import {RootStackParamList} from './src/navigations/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ApolloWrapper = ({children}: any) => {
  const {showErrorToast} = useToast();
  const navigation = useNavigation<NavigationProp>();
  const {setIsAuthenticated} = useAuth();
  const client = createApolloClient(
    showErrorToast,
    navigation,
    setIsAuthenticated,
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
