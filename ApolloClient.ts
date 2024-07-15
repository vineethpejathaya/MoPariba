// ApolloClient.ts
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dispatch, SetStateAction} from 'react';
import {RootStackParamList} from './src/navigations/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type SetIsAuthenticatedType = Dispatch<SetStateAction<boolean>>;
const createApolloClient = (
  showErrorToast: (description: string, title?: string) => void,
  navigation: NavigationProp,
  setIsAuthenticated: SetIsAuthenticatedType,
) => {
  const httpLink = new HttpLink({
    uri: 'https://dev.mopariba.com/graphql',
  });

  const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('userToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({message}) => {
        if (message === "The current customer isn't authorized.") {
          AsyncStorage.removeItem('userToken');
          showErrorToast(
            'Session expired. Please login again.',
            'Authorization Error',
          );

          navigation.navigate('AuthStack');
        }
      });
    }

    if (networkError) {
      navigation.navigate('NoNetwork');
    }
  });

  const link = ApolloLink.from([errorLink, authLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
};

export default createApolloClient;