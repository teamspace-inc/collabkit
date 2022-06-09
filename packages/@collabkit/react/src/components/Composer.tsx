import { useState } from 'react';
import { ArrowUp } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import { Profile } from '../constants';
import { Avatar } from './Avatar';
import { blue, sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';

import TextareaAutosize from 'react-textarea-autosize';

const ACCENT = blue.blue10;

const StyledComposerTextarea = styled(TextareaAutosize, {
  padding: '12px 36px 12px 40px',
  fontSize: 16,
  lineHeight: '24px',
  borderRadius: '0px 0px 11px 11px',
  border: 'none',
  background: '$input',
  width: 'calc(100%)',
  fontFamily: 'inherit',
  resize: 'none',
  height: '96px',
  boxSizing: 'border-box',
  borderTop: '1px solid $gray200',

  '&:focus': {
    outline: 'none',
  },

  variants: {
    fullyRounded: {
      true: {
        borderRadius: '11px',
        borderTop: 'none',
      },
    },
  },
});

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: ACCENT,

  width: 28,
  height: 28,
  position: 'absolute',
  right: 10,
  top: 10,
  borderRadius: 28,
  border: 'none',

  variants: {
    disabled: {
      true: {
        backgroundColor: sand.sand8,
      },
    },
  },
});

export function Composer(props: {
  profile?: Profile;
  threadId: string;
  onSend: (threadId: string, body: string) => void;
  isFloating: boolean;
}) {
  const [body, setBody] = useState('');

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {props.profile ? (
        <Avatar profile={props.profile} style={{ position: 'absolute', left: 10, top: 12 }} />
      ) : null}
      <StyledComposerTextarea
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type here..."
        fullyRounded={props.isFloating}
      />
      <Tooltip.Root>
        <StyledComposerSendButton
          disabled={body.trim().length === 0}
          onClick={(e) => {
            if (body.trim().length > 0) {
              props.onSend(props.threadId, body);
            }
          }}
        >
          <ArrowUp
            size={14}
            color={'white'}
            weight={'bold'}
            style={{ position: 'relative', cursor: 'pointer' }}
          />
        </StyledComposerSendButton>
        <Tooltip.Content>
          Send
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
