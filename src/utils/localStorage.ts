import {LocalStorageKeys} from "../services/types/types";

export const getFromLocalStorage = <T>(key: LocalStorageKeys, defaultValue: T | null = null): T | null => {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) as T : defaultValue;
}