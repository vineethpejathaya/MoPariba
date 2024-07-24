import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
  checkAuthentication: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  signIn: async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    set({isAuthenticated: true});
  },
  signOut: async () => {
    await AsyncStorage.removeItem('userToken');
    set({isAuthenticated: false});
  },
  checkAuthentication: async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    set({isAuthenticated: !!userToken});
  },
}));
