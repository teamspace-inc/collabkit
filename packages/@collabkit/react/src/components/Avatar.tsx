import React, { useState } from 'react';
import { getShade } from '@collabkit/colors';
import { avatarStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { useApp } from '../hooks/useApp';
import { AvatarProps } from '../types';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledFallbackAvatar = styled('div', avatarStyles.avatar);

function DefaultAvatar({ profile, size }: AvatarProps) {
  const [didError, setDidError] = useState(false);

  return didError || !profile.avatar ? (
    <StyledFallbackAvatar
      style={{
        ...(size ? { width: size, height: size, lineHeight: `${size}px` } : {}),
        ...(profile.color
          ? {
              backgroundColor: getShade(profile.color, 9),
            }
          : null),
      }}
    >
      {profile.name?.charAt(0)}
    </StyledFallbackAvatar>
  ) : (
    <StyledAvatar
      style={{ ...(size ? { width: size, height: size, lineHeight: `${size}px` } : {}) }}
      src={profile.avatar!}
      onError={() => setDidError(true)}
    />
  );
}

export function Avatar(props: AvatarProps) {
  const { renderAvatar } = useApp();
  if (renderAvatar != null) {
    return <>{renderAvatar(props)}</>;
  }
  return <DefaultAvatar {...props} />;
}
