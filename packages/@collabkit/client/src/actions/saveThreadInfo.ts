import { getConfig } from './getConfig';
import type { Store, ThreadInfo } from '@collabkit/core';

export function saveThreadInfo(
  store: Store,
  props: {
    info: ThreadInfo;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
  }
) {
  const { threadId, workspaceId } = props;
  const { appId } = getConfig(store);
  const { threadInfo, openThreads } = store.workspaces[workspaceId];
  threadInfo[threadId] = props.info;
  if (props.isOpen && props.info.meta) {
    openThreads[threadId] = { meta: props.info.meta };
  } else {
    delete openThreads[threadId];
  }
  try {
    return store.sync.saveThreadInfo({ ...props, appId });
  } catch (e) {
    console.error('failed to set thread info', e);
  }
}
