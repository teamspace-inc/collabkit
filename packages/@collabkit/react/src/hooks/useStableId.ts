import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

export function useStableId(): [string, () => void] {
  const [id, setId] = useState<string>(() => nanoid());
  const resetId = useCallback(() => {
    setId(nanoid());
  }, []);
  return [id, resetId];
}
