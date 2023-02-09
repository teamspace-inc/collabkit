import { useSnapshot } from 'valtio';
import { ThreadProps } from '../../types';
import { useSaveThreadInfo } from '../useSaveThreadInfo';
import { useStore } from '../useStore';
import { useThreadSubscription } from '../useThread';

export function useThread(props: ThreadProps) {
  const { threadId, info, defaultSubscribers } = props;
  const store = useStore();
  const { userId, workspaceId } = useSnapshot(store);

  useThreadSubscription({ store, threadId, workspaceId });
  useSaveThreadInfo({ threadId, workspaceId, info, defaultSubscribers });

  return { userId, workspaceId };
}
