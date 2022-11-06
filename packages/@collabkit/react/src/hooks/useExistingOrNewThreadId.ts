import { useNewThreadId } from './useNewThreadId';
import { useExistingThreadId } from './useExistingThreadId';
import { ObjectProps } from '@collabkit/core';

export function useExistingOrNewThreadId(props: ObjectProps) {
  const threadId = useExistingThreadId(props);
  const newThreadId = useNewThreadId();
  return threadId ?? newThreadId;
}
