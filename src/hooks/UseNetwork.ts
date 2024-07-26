import {create} from 'zustand';

interface NetworkState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useNetworkStore = create<NetworkState>(set => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({isLoading: loading}),
}));
