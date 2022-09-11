import React from 'react';
import { useSnapshot } from 'valtio';
import { Workspace } from '../constants';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { countUnread } from '../utils/countUnread';

function UnreadCount(props: React.ComponentPropsWithoutRef<'span'>) {
  const { threadId, userId } = useThreadContext();
  const workspace = useSnapshot(useWorkspaceStore());
  const count = countUnread({ workspace: workspace as Workspace, threadId, userId });
  return <span {...props}>{count}</span>;
}
