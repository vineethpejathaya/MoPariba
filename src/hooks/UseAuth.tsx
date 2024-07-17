import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {RootStackParamList} from '../navigations/types';

type SetIsAuthenticatedType = Dispatch<SetStateAction<boolean>>;
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: SetIsAuthenticatedType;
  signIn: (token: string) => void;
  signOut: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken, 'token');
      setIsAuthenticated(!!userToken);
    };

    checkAuthentication();
  }, []);

  const signIn = async (token: string): Promise<void> => {
    await AsyncStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const signOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
    navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, setIsAuthenticated, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
