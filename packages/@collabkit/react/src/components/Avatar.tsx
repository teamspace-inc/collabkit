import { useState } from 'react';
import React from 'react';
import { getShade } from '../colors';
import { Profile } from '../constants';
import { css, styled } from '@stitches/react';

export const avatarStyles = css({
  width: 24,
  height: 24,
  flexShrink: 0,
  borderRadius: 28,
  fontSize: 13,
  fontWeight: 500,
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '24px',
  cursor: 'default',
  userSelect: 'none',
});

export const StyledAvatar = styled('img', avatarStyles);

export function Avatar(props: { profile: Profile; style?: React.CSSProperties }) {
  const [didError, setDidError] = useState(false);
  const noImage = didError || !props.profile.avatar;
  const styles = {
    backgroundColor: getShade(props.profile.color, 9),
    color: getShade(props.profile.color, 3),
    ...(props.style || {}),
  };

  return noImage ? (
    <div className={avatarStyles().className} style={styles}>
      {props.profile.name?.charAt(0)}
    </div>
  ) : (
    <StyledAvatar src={props.profile.avatar!} onError={() => setDidError(true)} style={styles} />
  );
}
