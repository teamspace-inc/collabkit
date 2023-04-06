import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';
import * as commentStyles from './Comment.css';
import * as composerStyles from './Composer.css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
  width: 320,
});

export const comment = style([
  commentStyles.root(),
  {
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
  },
]);

export const popover = style({
  background: 'white',
  borderRadius: '12px',
  width: 320,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
  padding: 0,
  zIndex: 999,
});

export const root = style([
  {
    boxSizing: 'border-box',
    fontFamily: vars.fontFamily,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
]);

export const filters = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderBottom: fallbackVar(vars.sidebar.title.borderBottom, '1px solid'),
  borderBottomColor: fallbackVar(vars.sidebar.title.borderBottomColor, vars.color.backgroundMedium),
});

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
    paddingLeft: 0,
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

export const resolvedIcon = style({
  color: vars.color.textPrimary,
  justifySelf: 'end',
  alignSelf: 'first center',
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
