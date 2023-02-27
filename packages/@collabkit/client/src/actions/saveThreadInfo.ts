import { getConfig } from './getConfig';
import type { Store, ThreadInfo } from '@collabkit/core';

export function saveThreadInfo(
  store: Store,
  props: {
    info: ThreadInfo;
    workspaceId: string;
    threadId: string;
  }
) {
  const { threadId, workspaceId } = props;
  const { appId } = getConfig(store);
  const { threadInfo } = store.workspaces[workspaceId];
  threadInfo[threadId] = props.info;
  try {
    return store.sync.saveThreadInfo({ ...props, appId });
  } catch (e) {
    console.error('failed to set thread info', e);
  }
}
