import { styled, theme } from './UIKit';
import { X, Check, CheckCircle } from 'phosphor-react';
import React from 'react';
import { useApp } from './Provider';
import { ThreadTarget } from '../constants';
import { IconButton } from './PopoverThread';

const StyledThreadHeader = styled('div', {
  height: 30,
  display: 'flex',
  gap: 0,
  padding: '2px 0px',
  alignItems: 'center',
  pointerEvents: 'none',
  borderBottom: '1px solid $borderColor',
  variants: {
    type: {
      popout: {
        // borderTopRightRadius: 11,
        // borderTopLeftRadius: 11,
        // position: 'absolute',
        // left: 0,
        // top: 0,
        // right: 0,
        // zIndex: 99,
      },
    },
  },
});

const StyledHeaderLeftGroup = styled('div', {
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});

export function ThreadHeader(props: { isResolved: boolean; target: ThreadTarget }) {
  const { events } = useApp();
  const { isResolved, target } = props;

  return (
    <StyledThreadHeader type={'popout'}>
      <StyledHeaderLeftGroup />
      <IconButton
        tooltip={isResolved ? 'Re-open' : 'Resolve'}
        onPointerDown={(e) =>
          events.onPointerDown(e, {
            target: {
              ...target,
              type: isResolved ? 'reopenThreadButton' : 'resolveThreadButton',
            } as const,
          })
        }
      >
        {!isResolved ? (
          <Check size={16} weight={'light'} color={theme.colors.neutral12.toString()} />
        ) : (
          <CheckCircle size={18} weight={'fill'} color={theme.colors.accent10.toString()} />
        )}
      </IconButton>
      <IconButton
        tooltip="Close"
        onPointerDown={(e) => {
          events.onPointerDown(e, { target });
        }}
      >
        <X size="16" weight="light" color={theme.colors.neutral12.toString()} />
      </IconButton>
    </StyledThreadHeader>
  );
}
