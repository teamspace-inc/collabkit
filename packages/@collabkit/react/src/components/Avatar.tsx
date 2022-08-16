import { useState } from 'react';
import React from 'react';
import { getShade } from '@collabkit/colors';
import { Profile } from '../constants';
import { styled } from '@stitches/react';
import { avatarStyles } from '@collabkit/theme';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

export function Avatar(props: {
  profile: Profile;
  style?: React.CSSProperties;
  size?: 24 | 28 | 32;
  children?: React.ReactNode;
}) {
  const [didError, setDidError] = useState(false);
  const noImage = didError || !props.profile.avatar;
  const styles = props.profile.color
    ? {
        backgroundColor: getShade(props.profile.color, 9),
        ...(props.style || {}),
      }
    : props.style;

  const size = props.size ?? 24;

  return noImage ? (
    <StyledDefaultAvatar size={size} style={styles}>
      {props.profile.name?.charAt(0)}
    </StyledDefaultAvatar>
  ) : (
    <StyledAvatar
      size={size}
      src={props.profile.avatar!}
      onError={() => setDidError(true)}
      style={styles}
    />
  );
}
