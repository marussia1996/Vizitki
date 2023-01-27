import {KeyboardEventHandler, useEffect} from "react";

export const useKeyUp = (key: string, callback: () => void) => {
  useEffect(() => {
    const keyUp = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback();
      }
    }
    document.addEventListener('keyup', keyUp);
    return () => {
      document.removeEventListener('keyup', keyUp);
    }
  }, [])
}