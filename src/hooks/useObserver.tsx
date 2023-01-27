import { MutableRefObject, useEffect, useRef } from "react";


export const useObserver = (ref: MutableRefObject<HTMLElement | null>, canLoad: boolean, isLoading: boolean, callback: ()=>void) => {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    var cb = (entries: IntersectionObserverEntry[],) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    if(ref.current){
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(ref.current);
    }
  }, [isLoading]);
}