import {ApolloProvider} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import createApolloClient from './ApolloClient';
import {useAuth} from './src/hooks/UseAuth';
import {useNetworkStore} from './src/hooks/UseNetwork';
import useToast from './src/hooks/UseToast';
import {RootStackParamList} from './src/navigations/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ApolloWrapper = ({children}: any) => {
  const {setLoading} = useNetworkStore();
  const {showErrorToast} = useToast();
  const navigation = useNavigation<NavigationProp>();
  const {setIsAuthenticated} = useAuth();
  const client = createApolloClient(
    showErrorToast,
    navigation,
    setIsAuthenticated,
    setLoading,
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
