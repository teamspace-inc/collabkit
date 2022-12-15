import { useEffect } from 'react';
import type { ThreadInfo } from '@collabkit/core';
import { useStore } from './useStore';
import { watchEffect } from 'vue';

// we save this and then write it to firebase
// in sendMessage, to avoid constantly
// setting this in firebase
export function useSaveThreadInfo(props: {
  threadId: string;
  info?: ThreadInfo;
  defaultSubscribers?: string[];
}) {
  const store = useStore();
  watchEffect(() => {
    const { workspaceId } = store;
    const { threadId, info, defaultSubscribers } = props;
    if (!workspaceId) {
      return;
    }
    store.workspaces[workspaceId].pendingThreadInfo[threadId] = {
      url: info?.url ?? window.location.href.toString(),
      defaultSubscribers,
      ...(info?.name ? { name: info.name } : null),
      ...(info?.meta ? { meta: info.meta } : null),
    };
  });
}
