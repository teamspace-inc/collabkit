import { Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled } from '@stitches/react';
import { mauve } from '@radix-ui/colors';

export const StyledComment = styled('div', {
  padding: '4px 10px',
  display: 'flex',
  gap: '6px',

  overflowWrap: 'break-word',
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
  padding: '6px 10px',
  display: 'flex',
  flexDirection: 'column',
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  borderRadius: 14,
  color: mauve.mauve12,
  wordBreak: 'break-word',
  background: mauve.mauve4,
});

const StyledName = styled('div', {
  fontSize: 12,
  fontWeight: '600',
  lineHeight: '12px',
  marginTop: 4,
  marginBottom: 2,
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

export function Comment(props: { timestamp: number | object; body: string; profile: Profile }) {
  return props.profile ? (
    <StyledComment>
      <Avatar profile={props.profile} style={{ position: 'relative', top: 0 }} />
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
        <StyledMessageActions>
          {/* <StyledMessageAction href="">Like</StyledMessageAction> */}
          {/* <StyledMessageAction href="">Reply</StyledMessageAction> */}
        </StyledMessageActions>
      </div>
    </StyledComment>
  ) : null;
}
