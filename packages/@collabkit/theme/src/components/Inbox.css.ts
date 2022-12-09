import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: fallbackVar(vars.inbox.gap, vars.space[2]),
  boxSizing: 'border-box',
  height: '100%',
  width: fallbackVar(vars.inbox.width, '292px'),
  borderRadius: 0,
  background: fallbackVar(vars.inbox.background, vars.color.background),
  fontFamily: vars.fontFamily,
});

// export const emptyState = {
//   root: style({
//     display: 'flex',
//     flex: '1',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     gap: '11px',
//   }),
//   title: style({
//     fontStyle: 'normal',
//     fontWeight: 400,
//     fontSize: 24,
//     lineHeight: '135%',
//     textAlign: 'center',
//     letterSpacing: -0.1,
//     color: '#6A7278',
//   }),
//   body: style({
//     fontStyle: 'normal',
//     fontWeight: 400,
//     fontSize: 14,
//     lineHeight: '160%',
//     textAlign: 'center',
//     letterSpacing: -0.1,
//     color: '#6A7278',
//   }),
// };
