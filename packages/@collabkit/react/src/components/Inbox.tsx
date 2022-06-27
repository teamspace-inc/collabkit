import { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { WorkspaceIDContext } from './Workspace';

export function Inbox() {
  const { workspaceId } = useContext(WorkspaceIDContext);
  const { workspaces } = useSnapshot(store);

  if (workspaceId == null) {
    return null;
  }

  const workspace = workspaces[workspaceId];

  if (workspace == null) {
    return null;
  }

  const timelines = Object.keys(workspace.timeline);

  return (
    <div>
      {timelines.map((timeline) => {
        return <div key={timeline}>{timeline}</div>;
      })}
    </div>
  );
}
