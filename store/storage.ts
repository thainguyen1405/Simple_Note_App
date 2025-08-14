import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

// Note: This object now perfectly matches the StateStorage type expected by Zustand's persist middleware
export const zustandStorage: StateStorage = {
  setItem: async (name: string, value: string) => {
    return await AsyncStorage.setItem(name, value);
  },
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    return await AsyncStorage.removeItem(name);
  },
};