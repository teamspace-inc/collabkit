import { useState } from 'react';
import React from 'react';
import { getShade } from '../colors';
import { Profile } from '../constants';
import { css, styled } from '@stitches/react';

export const avatarStyles = css({
  width: '100%',
  height: '100%',
  flexShrink: 0,
  borderRadius: '2000px',
  fontSize: '$fontSize$0',
  fontWeight: '$fontWeights$1',
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
        fontWeight: '$fontWeights$1',
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
