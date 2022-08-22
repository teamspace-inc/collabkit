import React, { useState } from 'react';
import { getShade } from '@collabkit/colors';
import type { Profile } from '../constants';
import { avatarStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

export function Avatar({
  profile,
  size = 24,
  style,
}: {
  profile: Profile;
  size?: 24 | 28 | 32;
  style?: React.CSSProperties;
}) {
  const [didError, setDidError] = useState(false);

  return didError || !profile.avatar ? (
    <StyledDefaultAvatar
      size={size}
      style={{
        ...style,
        ...(profile.color
          ? {
              backgroundColor: getShade(profile.color, 9),
            }
          : {}),
      }}
    >
      {profile.name?.charAt(0)}
    </StyledDefaultAvatar>
  ) : (
    <StyledAvatar
      size={size}
      src={profile.avatar!}
      onError={() => setDidError(true)}
      style={style}
    />
  );
}
