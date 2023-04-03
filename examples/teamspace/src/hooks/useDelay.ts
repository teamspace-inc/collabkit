import { DependencyList, useEffect, useState } from 'react';

export function useDelay(ms: number, deps: DependencyList = []) {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setValue(true);
    }, ms);
    return () => {
      setValue(false);
      clearTimeout(timeoutID);
    };
  }, deps);

  return value;
}
