import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { ThreadInfo } from '@collabkit/core';

// we save this and then write it to firebase
// in sendMessage, to avoid constantly
// setting this in firebase
export function useSaveThreadInfo(props: {
  workspaceId: string | null;
  threadId: string;
  info?: ThreadInfo;
  defaultSubscribers?: string[];
}) {
  const { workspaceId, threadId, info, defaultSubscribers } = props;
  const { store } = useApp();
  useEffect(() => {
    if (!workspaceId) {
      return;
    }
    // only make this delete info if null is
    // explicitly provided as a value,
    // undefined should be a noop
    store.workspaces[workspaceId].pendingThreadInfo[threadId] = {
      url: info?.url ?? window.location.href.toString(),
      defaultSubscribers,
      ...(info?.name ? { name: info.name } : null),
      ...(info?.meta ? { meta: info.meta } : null),
    };
  }, [info?.name, info?.url, workspaceId, threadId, defaultSubscribers?.toString()]);
}
