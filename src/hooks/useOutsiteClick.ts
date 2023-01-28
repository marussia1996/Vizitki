import {MutableRefObject, useEffect} from "react";

export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => {
      console.log('remove');
      document.removeEventListener('mousedown', onClick);
    }
  }, []);
}