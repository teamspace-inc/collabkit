import { Profile } from '../constants';
import { Avatar } from './Avatar';
import { sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';

export const StyledComment = styled('div', {
  padding: '6px 10px',
  display: 'flex',
  gap: '6px',
  fontSize: 16,
  lineHeight: '24px',
  overflowWrap: 'break-word',

  '&:hover': {
    background: sand.sand3,
  },
});

export const StyledMessage = styled('div', {
  width: 'calc(100% - 36px)',
  color: sand.sand12,
});

export function Comment(props: { body: string; profile: Profile }) {
  return props.profile ? (
    <StyledComment>
      <Avatar profile={props.profile} />
      <StyledMessage>{props.body}</StyledMessage>
    </StyledComment>
  ) : null;
}
