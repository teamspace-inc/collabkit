import { useStableId } from './useStableId';

export function useNewThreadId() {
  const [newThreadId, _resetNewThreadId] = useStableId();
  return newThreadId;
}
