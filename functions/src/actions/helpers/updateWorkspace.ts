import { deleteUndefinedProps } from './deleteUndefinedProps';
import { WorkspaceProps } from '../../types';
import { isValidWorkspace } from './isValidWorkspace';
import { ref } from '../data/refs';

export async function updateWorkspace(props: {
  appId: string;
  workspaceId: string;
  workspace: WorkspaceProps;
}) {
  const { appId, workspaceId, workspace } = props;
  if (workspaceId !== 'default' && isValidWorkspace(workspace)) {
    await ref`/workspaces/${appId}/${workspaceId}/`.update(deleteUndefinedProps(workspace));
  }
}
