import { useEffect, useRef, useState } from 'react';

function useIsInputFocused(): [boolean, React.RefObject<HTMLInputElement>] {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputEl = inputRef.current;

    if (inputEl) {
      inputEl.addEventListener('focus', handleFocus);
      inputEl.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputEl) {
        inputEl.removeEventListener('focus', handleFocus);
        inputEl.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return [isFocused, inputRef];
}

export { useIsInputFocused };
