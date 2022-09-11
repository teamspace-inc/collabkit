import { HideInboxButtonTarget } from '@collabkit/core';
import { styled } from '@stitches/react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { X } from './icons';

const StyledSidePane = styled('div', {
  boxSizing: 'border-box',
  height: '100%',
  background: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  position: 'fixed',
  top: 0,
  width: 433,
  right: 0,
  bottom: 0,
});

const StyledSidePaneTitle = styled('h1', {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  lineHeight: '153%',
  letterSpacing: -0.25,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  padding: '22px 24px',
  borderBottom: '1px solid #E3E9ED',
});

function CloseSidePaneButton() {
  const { store, events } = useApp();
  const userContext = useOptionalUserContext();

  return (
    <IconButton
      onPointerDown={(e) => {
        if (!userContext) {
          return null;
        }
        store.callbacks?.onInboxCloseButtonClick?.(userContext);

        const target: HideInboxButtonTarget = {
          type: 'hideInboxButton',
          workspaceId: userContext.workspaceId,
        };

        events.onPointerDown(e, { target });
      }}
    >
      <X />
    </IconButton>
  );
}

export function SidePane(props: { children: React.ReactNode }) {
  const { store } = useApp();
  const { isInboxOpen } = useSnapshot(store);

  return isInboxOpen ? (
    <StyledSidePane>
      <StyledSidePaneTitle>
        <div style={{ flex: 1 }}>All Comments</div>
        <CloseSidePaneButton />
      </StyledSidePaneTitle>
      <div style={{ flex: 1, height: 'calc(100% - 77px)' }}>{props.children}</div>
    </StyledSidePane>
  ) : null;
}
