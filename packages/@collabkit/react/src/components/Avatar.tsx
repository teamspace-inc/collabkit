import { useState } from 'react';
import React from 'react';
import { getShade } from '../colors';
import { Profile } from '../constants';
import { css, styled } from '@stitches/react';

export const avatarStyles = css({
  width: 25,
  height: 25,
  flexShrink: 0,
  borderRadius: 25,
  fontSize: 14,
  fontWeight: 500,
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '25px',
  cursor: 'inherit',
  userSelect: 'none',
  backgroundColor: '$accent10',
  color: '$accent12',
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
