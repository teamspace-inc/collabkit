import { isValidThreadInfo } from '../helpers/isValidThreadInfo';
import { ref } from './refs';
import * as FirebaseId from './FirebaseId';

export async function fetchThreadInfo(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  const { appId, workspaceId, threadId } = props;
  const threadInfo = (await ref`/threadInfo/${appId}/${workspaceId}/${threadId}`.get()).val();

  if (threadInfo?.defaultSubscribers) {
    threadInfo.defaultSubscribers = Object.keys(threadInfo.defaultSubscribers).map((id) =>
      FirebaseId.decode(id)
    );
  }

  if (!isValidThreadInfo(threadInfo)) {
    console.debug('invalid thread info, exiting', threadInfo);
    throw new Error('invalid thread info');
  }

  if (!threadInfo.url) {
    console.debug('no thread url, skipping', threadInfo);
    throw new Error('no thread url');
  }

  return threadInfo;
}
