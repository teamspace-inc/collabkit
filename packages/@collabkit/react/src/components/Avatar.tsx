import { useState } from 'react';
import React from 'react';
import { getShade } from '../colors';
import { Profile } from '../constants';
import { css, styled } from '@stitches/react';

export const AVATAR_SIZE = 25;

export const avatarStyles = css({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  flexShrink: 0,
  borderRadius: AVATAR_SIZE,
  fontSize: 14,
  fontWeight: 600,
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '25px',
  cursor: 'inherit',
  userSelect: 'none',
  backgroundColor: '$accent10',
  color: '$neutral1',
  variants: {
    neutralBackground: {
      true: {
        color: '$neutral12',
        fontWeight: 600,
        backgroundColor: '$neutral1',
      },
    },
  },
});

export const StyledAvatar = styled('img', avatarStyles);

export function Avatar(props: {
  profile: Profile;
  style?: React.CSSProperties;
  neutralBackground?: boolean;
}) {
  const [didError, setDidError] = useState(false);
  const noImage = didError || !props.profile.avatar;
  const styles = props.profile.color
    ? {
        backgroundColor: getShade(props.profile.color, 9),
        color: getShade(props.profile.color, 3),
        ...(props.style || {}),
      }
    : props.style;

  return noImage ? (
    <div
      className={avatarStyles({ neutralBackground: props.neutralBackground }).className}
      style={styles}
    >
      {props.profile.name?.charAt(0)}
    </div>
  ) : (
    <StyledAvatar src={props.profile.avatar!} onError={() => setDidError(true)} style={styles} />
  );
}
