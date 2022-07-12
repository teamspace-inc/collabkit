import { styled } from '../UIKit';
import * as Tooltip from '../Tooltip';
import React from 'react';
import { ArrowUp } from 'phosphor-react';
import { useApp } from '../App';

export function SendButton(props: {
  bodyLength: number;
  hasComments: boolean;
  type?: 'popout';
  workspaceId: string;
  threadId: string;
}) {
  const { events } = useApp();
  const { bodyLength, hasComments, type, workspaceId, threadId } = props;
  return (
    <Tooltip.Root>
      <StyledComposerSendButton
        type={type}
        hasComments={hasComments}
        disabled={bodyLength === 0}
        onClick={(e) => {
          if (bodyLength > 0) {
            events.onSend(workspaceId, threadId);
          }
        }}
      >
        {type === 'popout' && !hasComments ? '' : ''}
        <ArrowUp
          size={13}
          color={'white'}
          weight={'bold'}
          style={{ position: 'relative', cursor: 'pointer' }}
        />
      </StyledComposerSendButton>
      <Tooltip.Content>
        Post
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$sizes$sendButton',
  height: '$sizes$sendButton',
  position: 'absolute',
  right: '$space$2',
  top: '$space$2',
  borderRadius: '$sizes$sendButton',
  border: 'none',

  variants: {
    type: {
      popout: {},
    },
    hasComments: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        opacity: 0,
        // backgroundColor: '$neutral8',
      },
      false: {
        backgroundColor: '$colors$composerButtonBackground',
      },
    },
  },
  compoundVariants: [
    {
      type: 'popout',
      hasComments: false,
      css: {
        // position: 'unset',
        // top: 'unset',
        // right: 'unset',
        // width: 'auto',
        // color: '$neutral1',
        // fontWeight: 500,
        // fontFamily: 'Inter',
        // gap: '2px',
        // padding: '0px 10px',
        // lineHeight: '24px',
      },
    },
  ],
});
