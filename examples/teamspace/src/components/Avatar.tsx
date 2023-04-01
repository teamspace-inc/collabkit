import { ClientColorVariants } from '../utils/Colors';
import { styled } from 'styles/stitches.config';

export const AVATAR_SIZE = 28;

export const Avatar = styled('div', {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: AVATAR_SIZE,
  variants: { color: ClientColorVariants },
});
