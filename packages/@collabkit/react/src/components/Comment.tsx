import { Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled } from '@stitches/react';
import { mauve } from '@radix-ui/colors';

export const StyledComment = styled('div', {
  display: 'flex',
  gap: '2px',

  overflowWrap: 'break-word',
  variants: {
    type: {
      default: {
        padding: '4px 10px',
      },
      inline: {
        padding: '4px 10px',
      },
    },
  },

  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
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
  padding: '0px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  borderRadius: 14,
  color: mauve.mauve12,
  wordBreak: 'break-word',
});

const StyledName = styled('div', {
  fontSize: 14,
  fontWeight: '600',
  lineHeight: '20px',
  display: 'flex',
  gap: 8,
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

export function Comment(props: {
  timestamp: number | object;
  body: string;
  profile: Profile;
  type: 'default' | 'inline';
}) {
  return props.profile ? (
    props.type === 'default' ? (
      <StyledComment type={props.type}>
        <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledMessage>
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
          {/* <StyledMessageActions> */}
          {/* <StyledMessageAction href="">Like</StyledMessageAction> */}
          {/* <StyledMessageAction href="">Reply</StyledMessageAction> */}
          {/* </StyledMessageActions> */}
        </div>
      </StyledComment>
    ) : (
      <StyledComment type={props.type}>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '34px' }}>
          <StyledMessage>{props.body}</StyledMessage>
        </div>
      </StyledComment>
    )
  ) : null;
}
