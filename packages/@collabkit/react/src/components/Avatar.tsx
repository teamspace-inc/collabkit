import React, { useState } from 'react';
import { getShade } from '@collabkit/colors';
import type { Profile } from '../constants';
import { avatarStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

export function Avatar({ profile, style }: { profile: Profile; style?: React.CSSProperties }) {
  const [didError, setDidError] = useState(false);

  return didError || !profile.avatar ? (
    <StyledDefaultAvatar
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
    <StyledAvatar src={profile.avatar!} onError={() => setDidError(true)} style={style} />
  );
}
