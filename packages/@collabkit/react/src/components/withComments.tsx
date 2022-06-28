import { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { styled } from './UIKit';
import { WorkspaceIDContext } from './Workspace';
import { WorkspaceContext } from './WorkspaceLoader';

const StyledWithComments = styled('div', {
  variants: {
    hasComments: {
      true: {
        border: '1px solid red',
      },
    },
    newComments: {
      true: {
        border: '1px solid green',
      },
    },
  },
});

export function withComments<T>(
  Component: React.ComponentType<T>,
  commentProps: { threadId: string }
) {
  return (props: T) => {
    const { workspaceId } = useContext(WorkspaceIDContext);
    const { workspaces } = useSnapshot(store);
    const workspace = workspaceId ? workspaces[workspaceId] : null;

    const hasComments = true;
    const newComments = true;

    return (
      <StyledWithComments hasComments={hasComments} newComments={newComments}>
        <Component {...props} />
      </StyledWithComments>
    );
  };
}
