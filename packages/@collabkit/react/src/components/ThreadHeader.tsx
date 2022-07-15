import { styled } from './UIKit';
import { X, Check, CheckCircle } from 'phosphor-react';
import React from 'react';
import { useApp } from './useApp';
import { ThreadTarget } from '../constants';
import { IconButton } from './PopoverThread';
import * as Tooltip from '@radix-ui/react-tooltip';

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
  const { events, theme } = useApp();
  const { isResolved, target } = props;

  return (
    <StyledThreadHeader type={'popout'}>
      <Tooltip.Provider delayDuration={0}>
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
            <CheckCircle size={19} weight={'thin'} color={theme.colors.neutral12.toString()} />
          ) : (
            <CheckCircle size={18} weight={'fill'} color={theme.colors.accent10.toString()} />
          )}
        </IconButton>
        <IconButton
          tooltip="Close"
          onPointerDown={(e) => {
            events.onPointerDown(e, { target: { ...target, type: 'closeThreadButton' } });
          }}
        >
          <X size="16" weight="light" color={theme.colors.neutral12.toString()} />
        </IconButton>
      </Tooltip.Provider>
    </StyledThreadHeader>
  );
}
