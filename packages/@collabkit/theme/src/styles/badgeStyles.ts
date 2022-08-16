import { css } from '@stitches/react';

export const badge = css({
  backgroundColor: '$colors$badgeColor',
  width: 6,
  height: 6,
  borderRadius: 8,
  position: 'absolute',
  border: '$sizes$pinBorderWidth solid $colors$pinBorderColor',
  top: 'calc(-$sizes$pinBorderWidth)',
  right: 'calc(-$sizes$pinBorderWidth)',
  textAlign: 'center',
  fontSize: '9px',
  fontWeight: '700',
  display: 'flex',
  lineHeight: '6px',
  justifyContent: 'center',
  color: 'white',
});
