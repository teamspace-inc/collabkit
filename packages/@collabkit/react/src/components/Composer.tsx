import { ArrowUp } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import { Profile, Target } from '../constants';
import { Avatar } from './Avatar';
import { blue, sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { events } from '../events';

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
  borderTop: `1px solid ${sand.sand4}`,

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

export function Composer(props: { profile?: Profile; threadId: string; isFloating: boolean }) {
  const { composers } = useSnapshot(store);
  const target = { type: 'composer', threadId: props.threadId } as Target;
  const bodyLength = composers[props.threadId]?.body.trim().length;

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {props.profile ? (
        <Avatar profile={props.profile} style={{ position: 'absolute', left: 10, top: 12 }} />
      ) : null}
      <StyledComposerTextarea
        onFocus={(e) => events.onFocus(e, { target })}
        onBlur={(e) => events.onBlur(e, { target })}
        onChange={(e) => events.onChange(e, { target })}
        value={composers[props.threadId]?.body}
        placeholder="Type here..."
        fullyRounded={props.isFloating}
      />
      <Tooltip.Root>
        <StyledComposerSendButton
          disabled={bodyLength === 0}
          onClick={(e) => {
            if (bodyLength > 0) {
              events.onSend(props.threadId);
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
