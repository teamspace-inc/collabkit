import { actions } from '@collabkit/client';
import { watchEffect } from 'vue';
import { useStore } from './useStore';

export function useThreadSubscription(props: { threadId: string }) {
  const store = useStore();
  watchEffect(async () => {
    if (store.workspaceId) {
      actions.subscribeThread(store, {
        workspaceId: store.workspaceId,
        threadId: props.threadId,
      });
    }
  });
}
