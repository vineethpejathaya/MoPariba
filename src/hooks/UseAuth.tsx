import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type SetIsAuthenticatedType = Dispatch<SetStateAction<boolean>>;
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: SetIsAuthenticatedType;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('useEffect is executing from authhook');
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('User Token:', userToken);
      setIsAuthenticated(userToken !== null);
      console.log('Is Authenticated:', userToken !== null);
    };

    checkAuthentication();
  }, []);

  const signIn = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
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
