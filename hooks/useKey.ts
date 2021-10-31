import { useEffect, useRef } from "react";

function useKey(key: any, cb: any) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if(event.code === key) {
        cb(event)
      }
    }
    document.addEventListener('keypress', handle);
    return () => document.removeEventListener('keypress', handle);
  }, [key]);
}

export { useKey };