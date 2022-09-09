import { useEffect, useState } from 'react';

export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState(() => (window ? window.document.hasFocus() : false));

  useEffect(() => {
    if (!window) {
      return;
    }

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return isFocused;
}
