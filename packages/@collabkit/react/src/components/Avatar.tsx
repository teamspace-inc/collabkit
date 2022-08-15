import { useState } from 'react';
import React from 'react';
import { getShade } from '@collabkit/colors';
import { Profile } from '../constants';
import { css, styled } from '@stitches/react';
//import { avatarStyles } from '@collabkit/theme';

// TODO: import from `@collabkit/theme`
export const avatarStyles = css({
  width: '24px',
  height: '24px',
  flexShrink: 0,
  aspectRatio: 1,
  borderRadius: '2000px',
  fontSize: '$fontSize$0',
  fontWeight: '700',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '24px',
  cursor: 'inherit',
  userSelect: 'none',
  backgroundColor: '$accent10',
  color: '$neutral1',
  variants: {
    size: {
      32: {
        width: '32px',
        height: '32px',
        lineHeight: '32px',
      },

      28: {
        width: '28px',
        height: '28px',
        lineHeight: '28px',
        fontSize: '$fontSize$2',
      },

      24: {
        width: '24px',
        height: '24px',
        lineHeight: '24px',
      },
    },
  },
});

export const StyledAvatar = styled('img', avatarStyles);

export const StyledDefaultAvatar = styled('div', avatarStyles);

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
      {props.children ? props.children : props.profile.name?.charAt(0)}
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
