import { useNewThreadId } from './useNewThreadId';
import { useExistingThreadId } from './useExistingThreadId';
import { ThreadLocator } from '@collabkit/core';

export function useExistingOrNewThreadId(props: ThreadLocator) {
  const threadId = useExistingThreadId(props);
  const newThreadId = useNewThreadId();
  return threadId ?? newThreadId;
}
