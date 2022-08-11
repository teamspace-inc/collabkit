import { ref, update } from '@firebase/database';
import { getConfig } from '.';
import { DB, Store } from '../constants';
import { ThreadInfo } from '../hooks/useThread';

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
