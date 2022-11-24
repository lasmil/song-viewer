import { useState, useEffect, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key, initialValue) => {
  const getValue = useCallback(async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      return JSON.parse(item) || initialValue;
    } catch (error) {
      console.log(error);
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    getValue().then(value => setStoredValue(value));
  }, [getValue]);

  const setValue = async value => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
