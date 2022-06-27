import { Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled } from '@stitches/react';
import { mauve } from '@radix-ui/colors';
import { Smiley } from 'phosphor-react';

export const StyledComment = styled('div', {
  display: 'flex',
  gap: '5px',
  position: 'relative',
  overflowWrap: 'break-word',
  variants: {
    threadType: {
      inline: {},
      popout: {
        maxWidth: '230px',
      },
    },
    type: {
      default: {
        padding: '5px 10px 5px',
      },
      'inline-start': {
        padding: '5px 10px 1px',
      },
      inline: {
        padding: '1px 10px',
      },
      'inline-end': {
        padding: '1px 10px 5px',
      },
    },
  },
});

const StyledMessageTimestamp = styled('span', {
  fontSize: 12,
  color: mauve.mauve11,
  textDecoration: 'none',
  fontWeight: '400',
});

const StyledMessageAction = styled('a', {
  fontSize: 12,
  color: mauve.mauve11,
  textDecoration: 'none',
  fontWeight: '600',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const StyledMessageActions = styled('div', {
  padding: '4px 10px 0px',
  display: 'flex',
  gap: '16px',
});

export const StyledMessage = styled('div', {
  padding: '5px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  borderRadius: 11,
  color: mauve.mauve12,
  background: mauve.mauve3,
  wordBreak: 'break-word',
  variants: {
    type: {
      default: {},
      'inline-start': {
        borderBottomLeftRadius: 3,
      },
      inline: {
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
      },
      'inline-end': {
        borderTopLeftRadius: 3,
      },
    },
  },
  '&:hover': {
    background: mauve.mauve5,
  },
});

const StyledName = styled('div', {
  fontSize: 14,
  fontWeight: '600',
  lineHeight: '20px',
  display: 'flex',
  gap: 5,
});

function timeDifference(current: number, previous: number) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (Math.round(elapsed / 1000) < 60) {
      return 'just now';
    } else {
      return Math.round(elapsed / 1000) + ' secs ago';
    }
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' mins ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}

const MessageButton = styled('button', {
  padding: '0',
  width: '24px',
  height: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: 24,
  alignItems: 'center',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
  },
});

function AddReactionButton() {
  return (
    <MessageButton>
      <Smiley weight="regular" size={20} color="rgba(0,0,0,0.3)" />
    </MessageButton>
  );
}

function MessageToolbar() {
  return (
    <div
      style={{
        position: 'absolute',
        right: 16,
        top: -6,
        zIndex: 99,
      }}
    >
      <AddReactionButton />
    </div>
  );
}

export function Comment(props: {
  timestamp: number | object;
  body: string;
  profile: Profile;
  type: 'default' | 'inline' | 'inline-start' | 'inline-end';
  threadType: 'inline' | 'popout';
}) {
  return props.profile ? (
    props.type === 'default' || props.type === 'inline-start' ? (
      <StyledComment type={props.type}>
        <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledMessage type={props.type}>
            <StyledName>
              {props.profile.name || props.profile.email}{' '}
              <StyledMessageTimestamp>
                {typeof props.timestamp === 'number'
                  ? timeDifference(+new Date(), props.timestamp)
                  : null}
              </StyledMessageTimestamp>
            </StyledName>
            {props.body}
          </StyledMessage>
          {/* <MessageToolbar /> */}
          {/* <StyledMessageActions> */}
          {/* <StyledMessageAction href="">Like</StyledMessageAction> */}
          {/* <StyledMessageAction href="">Reply</StyledMessageAction> */}
          {/* </StyledMessageActions> */}
        </div>
      </StyledComment>
    ) : (
      <StyledComment type={props.type}>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
          <StyledMessage type={props.type}>{props.body}</StyledMessage>
        </div>
      </StyledComment>
    )
  ) : null;
}
