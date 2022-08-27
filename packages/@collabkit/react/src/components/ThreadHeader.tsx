import { styled } from '@stitches/react';
import { X, CheckCircle } from './icons';
import React from 'react';
import { useApp } from '../hooks/useApp';
import { ThreadTarget } from '../constants';
import { IconButton } from './IconButton';
import * as Tooltip from '@radix-ui/react-tooltip';
import { threadHeaderStyles } from '@collabkit/theme';

const StyledThreadHeader = styled('div', threadHeaderStyles.root);
const StyledHeaderLeftGroup = styled('div', threadHeaderStyles.leftGroup);

export function ThreadHeader(props: { isResolved: boolean; target: ThreadTarget }) {
  const { events, theme } = useApp();
  const { isResolved, target } = props;

  return (
    <StyledThreadHeader>
      <Tooltip.Provider delayDuration={0}>
        <StyledHeaderLeftGroup></StyledHeaderLeftGroup>
        <IconButton
          tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
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
            <CheckCircle size={18} weight={'fill'} color={theme.colors.neutral12.toString()} />
          )}
        </IconButton>
        <IconButton
          tooltip="Close"
          onPointerDown={(e) => {
            events.onPointerDown(e, { target: { ...target, type: 'closeThreadButton' } });
          }}
        >
          <X size="16" weight="regular" color={theme.colors.neutral12.toString()} />
        </IconButton>
      </Tooltip.Provider>
    </StyledThreadHeader>
  );
}
