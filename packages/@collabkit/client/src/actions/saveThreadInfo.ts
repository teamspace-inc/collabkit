import { ref, update } from '@firebase/database';
import { getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getConfig } from '.';
import type { Store, ThreadInfo } from '@collabkit/core';

export function saveThreadInfo(
  store: Store,
  props: {
    info: ThreadInfo;
    workspaceId: string;
    threadId: string;
  }
) {
  const { appId } = getConfig(store);
  try {
    return update(
      ref(
        getDatabase(getApp('CollabKit')),
        `/threadInfo/${appId}/${props.workspaceId}/${props.threadId}`
      ),
      props.info
    );
  } catch (e) {
    console.error('failed to set thread info', e);
  }
}
