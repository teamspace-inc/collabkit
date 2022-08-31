import { getConfig } from '.';
import type { Store, ThreadInfo } from '@collabkit/core';

export function saveThreadInfo(
  store: Store,
  props: {
    info: ThreadInfo;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
    meta?: unknown;
  }
) {
  const { appId } = getConfig(store);
  try {
    return store.sync.saveThreadInfo({ ...props, appId });
  } catch (e) {
    console.error('failed to set thread info', e);
  }
}
