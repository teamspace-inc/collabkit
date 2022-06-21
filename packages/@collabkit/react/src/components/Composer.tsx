import { ArrowUp } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import { Profile, Target } from '../constants';
import { Avatar } from './Avatar';
import { blue, mauve } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { events } from '../events';

const ACCENT = blue.blue10;

const StyledComposerTextarea = styled(TextareaAutosize, {
  padding: '12px 36px 12px 40px',
  fontSize: '14px',
  lineHeight: '18px',
  borderRadius: '0px 0px 11px 11px',
  border: 'none',
  background: '$input',
  fontFamily: 'inherit',
  resize: 'none',
  height: '96px',
  display: 'flex',
  flex: 1,
  boxSizing: 'border-box',
  borderTop: `1px solid ${mauve.mauve4}`,

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

  width: 26,
  height: 26,
  position: 'absolute',
  right: 12,
  top: 12,
  borderRadius: 25,
  border: 'none',

  variants: {
    disabled: {
      true: {
        backgroundColor: mauve.mauve8,
      },
    },
  },
});

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  onHeightChange: (height: number) => void
}) {
  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[props.workspaceId];
  const target = {
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  } as Target;
  const composer = workspace && workspace.composers[props.threadId];
  const bodyLength = composer?.body.trim().length ?? 0;

  return (
    <div
      style={{
        minHeight: 48,
        position: 'relative',
        display: 'flex',
        flex: 0,
        alignItems: 'center',
      }}
    >
      {props.profile ? (
        <Avatar profile={props.profile} style={{ position: 'absolute', left: 10, top: 13 }} />
      ) : null}
      <StyledComposerTextarea
        onFocus={(e) => events.onFocus(e, { target })}
        onBlur={(e) => events.onBlur(e, { target })}
        onChange={(e) => events.onChange(e, { target })}
        value={composer?.body || ''}
        onHeightChange={props.onHeightChange}
        placeholder="Write a comment..."
        fullyRounded={props.isFloating}
      />
      <Tooltip.Root>
        <StyledComposerSendButton
          disabled={bodyLength === 0}
          onClick={(e) => {
            if (bodyLength > 0) {
              events.onSend(props.workspaceId, props.threadId);
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
