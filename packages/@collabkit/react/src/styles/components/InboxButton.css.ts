import { style } from '@vanilla-extract/css';
// import { vars } from '../theme';
import { button } from './Button.css';

export const inboxButton = style([
  button({ type: 'primary' }),
  {
    gap: '8px',
    // fontSize: '14px',
    // border: `1px solid ${vars.color.border}`,
    // borderRadius: '6px',
    // fontWeight: 600,
    // lineHeight: '160%',
    // letterSpacing: -0.1,
    // color: '#6A7278',
    // background: vars.button.primary.background,
    // padding: '8px 16px',
    // boxSizing: 'border-box',
    // height: 40,
    // display: 'flex',
    // gap: '8px',
    // alignItems: 'center',
    // justifyContent: 'center',
    // cursor: 'pointer',
  },
]);
