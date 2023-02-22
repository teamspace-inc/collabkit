import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';
import * as commentStyles from './Comment.css';
import * as composerStyles from './Composer.css';
import { calc } from '@vanilla-extract/css-utils';

export const comment = style([
  commentStyles.root(),
  {
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
  },
]);

export const root = style([
  {
    boxSizing: 'border-box',
    width: fallbackVar(vars.inbox.width, '320px'),
    fontFamily: vars.fontFamily,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
]);

export const rootComposerRoot = style([
  composerStyles.root,
  {
    padding: fallbackVar(
      vars.composer.padding,
      `${vars.space[2]} ${vars.space[6]} ${vars.space[4]}`
    ),
  },
]);

export const threadComposerRoot = style([
  composerStyles.root,
  {
    padding: fallbackVar(vars.composer.padding, `${vars.space[2]} ${vars.space[4]} 0px`),
  },
]);

export const commentEditorRoot = style([]);

export const composerEditor = style([
  composerStyles.editor(),
  {
    gap: 0,
    display: 'grid',
    gridTemplateColumns: '32px auto',
  },
]);

export const composerPlaceholder = style([
  composerStyles.placeholder,
  {
    left: 0,
  },
]);

export const composerContentEditable = style([
  composerStyles.contentEditable(),
  {
    paddingLeft: 0,
  },
]);

export const composerPinButton = style({
  padding: vars.space[2],
  display: 'inline-flex',
  flex: 1,
  border: 'none',
  height: '100%',
});

export const threadList = style({
  padding: `${vars.space[2]} 0 0`,
});

export const commentList = style({
  display: 'flex',
  flexDirection: 'column',
});

export const thread = recipe({
  base: {
    marginLeft: vars.space[2],
    marginRight: vars.space[3],
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${vars.color.attentionBlue}`,
        borderRadius: '8px',
      },
      false: {
        border: `1px solid transparent`,
      },
    },
  },
});

export const commentPin = style({
  paddingRight: calc.divide(vars.space[1], 2),
  float: 'left',
  cursor: 'pointer',
});

globalStyle('.collabkit-pin-node', {
  width: '16px',
  height: '16px',
  margin: '-4px 0px 0px',
});

globalStyle('.collabkit-composer-pin', {
  width: '16px',
  height: '16px',
  margin: '-4px 0px 0px',
});

globalStyle('.collabkit-composer-pin', {
  display: 'inline',
  margin: '-4px 0px 0px',
});
