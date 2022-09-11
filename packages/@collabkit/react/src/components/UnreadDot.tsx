import React from 'react';
import { useSnapshot } from 'valtio';
import { Workspace } from '../constants';
import { useThreadContext } from '../hooks/useThreadContext';
import { countUnread } from '../utils/countUnread';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';

export function UnreadDot(props: React.ComponentPropsWithoutRef<'div'>) {
  const { threadId, userId } = useThreadContext();
  const workspace = useSnapshot(useWorkspaceStore());
  const count = countUnread({ workspace: workspace as Workspace, threadId, userId });
  return count > 0 ? <div {...props} /> : null;
}
