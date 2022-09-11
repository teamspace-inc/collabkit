import { styled } from '@stitches/react';
import React from 'react';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { X } from './icons';

const StyledSidePane = styled(SidePane, {
  boxSizing: 'border-box',
  height: '100%',
  background: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
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
  const { store } = useApp();
  const userContext = useOptionalUserContext();

  return (
    <IconButton
      onPointerDown={() =>
        userContext ? store.callbacks?.onInboxCloseButtonClick?.(userContext) : null
      }
    >
      <X />
    </IconButton>
  );
}

export function SidePane(props: { children: React.ReactNode }) {
  return (
    <StyledSidePane>
      <StyledSidePaneTitle>
        <div style={{ flex: 1 }}>All Comments</div>
        <CloseSidePaneButton />
      </StyledSidePaneTitle>
      {props.children}
    </StyledSidePane>
  );
}
