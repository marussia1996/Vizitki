import {useState} from "react";

export type TUseFetching = {
  isLoading: boolean,
  error?: string,
  fetching: (...args: any[]) => void;
}

export const useFetching = (callback: (...args: any[]) => void): [boolean, string, (...args: any[]) => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async (...args: any[]) => {
    setError('');
    setIsLoading(true);
    try {
      await callback(args);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, error, fetching];
};