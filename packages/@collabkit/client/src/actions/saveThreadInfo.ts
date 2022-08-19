import { ref, update } from '@firebase/database';
import { getConfig } from '.';
import type { Store, ThreadInfo } from '@collabkit/core';
import { DB } from '../sync/firebase/setup';

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
      ref(DB, `/threadInfo/${appId}/${props.workspaceId}/${props.threadId}`),
      props.info
    );
  } catch (e) {
    console.error('failed to set thread info', e);
  }
}
