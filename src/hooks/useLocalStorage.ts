import {useState} from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T): [value: T, setValue: (value: T) => void] => {
  const [value, setStateValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  })

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.log(e);
    }
    setStateValue(value);
  }

  return [value, setValue];
}