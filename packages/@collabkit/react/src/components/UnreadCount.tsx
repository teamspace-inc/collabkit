import React from 'react';
import { useSnapshot } from 'valtio';
import { Workspace } from '../constants';
import { useThreadContext } from '../hooks/useThreadContext';
import { countUnread } from '../utils/countUnread';
import { useWorkspaceStore } from './useWorkspaceStore';

function UnreadCount(props: React.ComponentPropsWithoutRef<'span'>) {
  const { threadId } = useThreadContext();
  const workspace = useSnapshot(useWorkspaceStore());
  const count = countUnread({ workspace: workspace as Workspace, threadId });
  return <span {...props}>{count}</span>;
}
