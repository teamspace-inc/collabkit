import React, { useState } from 'react';
import { getShade } from '@collabkit/colors';
import { avatarStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { useApp } from '../hooks/useApp';
import { AvatarProps } from '../types';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

function DefaultAvatar({ profile }: AvatarProps) {
  const [didError, setDidError] = useState(false);

  return didError || !profile.avatar ? (
    <StyledDefaultAvatar
      style={
        profile.color
          ? {
              backgroundColor: getShade(profile.color, 9),
            }
          : undefined
      }
    >
      {profile.name?.charAt(0)}
    </StyledDefaultAvatar>
  ) : (
    <StyledAvatar src={profile.avatar!} onError={() => setDidError(true)} />
  );
}

export function Avatar(props: AvatarProps) {
  const { renderAvatar } = useApp();
  if (renderAvatar != null) {
    return renderAvatar(props);
  }
  return <DefaultAvatar {...props} />;
}
