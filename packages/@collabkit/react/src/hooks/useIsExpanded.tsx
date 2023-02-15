import { useState, useEffect } from 'react';
import { useThreadContext } from '../hooks/useThreadContext';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';

export function useIsExpanded() {
  const threadId = useThreadContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const store = useStore();
  const { expandedThreadIds } = useSnapshot(store);
  useEffect(() => {
    setIsExpanded(expandedThreadIds.includes(threadId));
  }, [store, expandedThreadIds, threadId]);
  return isExpanded;
}
