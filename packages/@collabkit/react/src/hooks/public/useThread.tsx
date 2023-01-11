import { useSnapshot } from 'valtio';
import { ThreadProps } from '../../types';
import { useApp } from '../useApp';
import { useSaveThreadInfo } from '../useSaveThreadInfo';
import { useThreadSubscription } from '../useThread';

export function useThread(props: ThreadProps) {
  const { threadId, info, defaultSubscribers } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);

  useThreadSubscription({ store, threadId, workspaceId });
  useSaveThreadInfo({ threadId, workspaceId, info, defaultSubscribers });

  return { userId, workspaceId };
}
