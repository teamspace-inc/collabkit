import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const paddingLeft = fallbackVar(vars.comment.paddingLeft, vars.space[4]);
export const paddingRight = fallbackVar(vars.comment.paddingRight, vars.space[4]);
export const headerGap = fallbackVar(vars.comment.header.gap, vars.space[2]);
export const actionsGap = fallbackVar(vars.comment.actions.gap, vars.space[2]);

const verticalPadding = calc.multiply(vars.space[1], 2).toString();

export const root = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: `${vars.avatar.size} 1fr`,
    columnGap: fallbackVar(vars.comment.gap, vars.space[3]),
    position: 'relative',
    paddingLeft: fallbackVar(vars.comment.paddingLeft, vars.space[4]),
    paddingRight: fallbackVar(vars.comment.paddingRight, vars.space[4]),
    paddingTop: fallbackVar(vars.comment.paddingTop, verticalPadding),
    paddingBottom: fallbackVar(vars.comment.paddingBottom, verticalPadding),
    fontFamily: vars.fontFamily,
  },
  variants: {
    indent: {
      true: {
        paddingLeft: fallbackVar(vars.comment.paddingLeft, calc.multiply(vars.space[4], 3.25)),
      },
      false: {},
    },
  },
});

export const header = style({
  display: 'grid',
  gridTemplateColumns: 'auto auto 1fr',
  alignItems: 'baseline',
  gap: fallbackVar(vars.comment.header.nameAndTimestamp.gap, `${calc(vars.space[2])}`),
  fontFamily: vars.fontFamily,
  marginBottom: vars.space[1],
});

export const inlineModal = style({
  background: vars.color.surface,
  borderRadius: '6px',
});

export const emojiCountButton = recipe({
  base: {
    marginTop: vars.space[2],
    border: `1px solid ${vars.color.border}`,
    borderRadius: '6px',
    padding: `${vars.space[0]} ${vars.space[1]}`,
    display: 'flex',
    gap: vars.space[1],
    alignItems: 'center',
    marginRight: vars.space[1],
    cursor: 'pointer',
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&:hover': {
            border: `1px solid ${vars.color.surface}`,
            background: vars.color.surfaceOverlay,
          },
        },
      },
      true: {
        border: '1px solid transparent',
        background: vars.color.surface,
        selectors: {
          '&:hover': {},
        },
      },
    },
  },
});

export const emojiCountNumber = style({
  color: vars.color.textPrimary,
  fontSize: vars.text.small.fontSize,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: vars.text.small.letterSpacing,
  lineHeight: vars.text.small.lineHeight,
  fontFamily: vars.fontFamily,
});

export const emojiCountIcon = style({
  color: 'red',
  fontSize: vars.text.base.fontSize,
  lineHeight: vars.text.base.lineHeight,
});

export const emojiCountTooltip = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
  padding: `${vars.space[1]} ${vars.space[1]}`,
  fontSize: vars.text.small.fontSize,
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.text.small.letterSpacing,
  background: vars.color.surface,
  borderRadius: '6px',
  color: vars.color.textPrimary,
  boxShadow: vars.shadow.standard,
  border: `1px solid ${vars.color.border}`,
});

export const reactions = style({
  display: 'flex',
  alignSelf: 'flex-start',
  alignItems: 'flex-end',
});

export const indent = style({
  marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[2])),
});

export const body = style({
  fontSize: fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight),
  fontFamily: vars.fontFamily,
  gap: vars.space[1],
  textAlign: 'left',
  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  minHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight), // prevents flicker
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),

  // todo @nc: this should be adjusted automatically based on the space
  // available on the right
  paddingRight: `${calc(vars.space[3]).multiply(3)}`,
});

export const unreadDot = style({
  width: fallbackVar(vars.inbox.item.unreadDot.width, vars.space[2]),
  height: fallbackVar(vars.inbox.item.unreadDot.height, vars.space[2]),
  borderRadius: fallbackVar(vars.inbox.item.unreadDot.borderRadius, '50%'),
  fontFamily: vars.fontFamily,
  position: 'inherit',
  left: 'inherit',
  background: fallbackVar(vars.sidebar.unreadDot.background, vars.color.attentionBlue),
});

export const replyCountButton = style({
  marginTop: vars.space[1],
  padding: fallbackVar(vars.comment.replyCountButton.padding, `${vars.space[1]} ${vars.space[0]}`),
  background: fallbackVar(vars.comment.replyCountButton.background, 'transparent'),
  display: 'flex',
  borderRadius: '6px',
  alignItems: 'flex-end',
  gap: vars.space[1],
  cursor: 'pointer',
});

export const replyCountButtonText = style({
  fontSize: fallbackVar(vars.comment.replyCountButton.text.fontSize, vars.text.small.fontSize),
  lineHeight: fallbackVar(
    vars.comment.replyCountButton.text.lineHeight,
    vars.text.small.lineHeight
  ),
  fontWeight: fallbackVar(vars.comment.replyCountButton.text.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(
    vars.comment.replyCountButton.text.letterSpacing,
    vars.text.small.letterSpacing
  ),
  color: fallbackVar(vars.comment.replyCountButton.text.color, vars.color.textSecondary),
  fontFamily: vars.fontFamily,
});

export const replyCountButtonIcon = style({
  color: fallbackVar(vars.comment.replyCountButton.icon.color, vars.color.textSecondary),
  selectors: {
    '&:hover': {
      color: fallbackVar(vars.comment.replyCountButton.icon.color, vars.color.textPrimary),
    },
  },
});

export const editor = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  marginRight: `${calc(paddingRight).negate()}`,
  fontFamily: vars.fontFamily,
  padding: `0 ${vars.space[4]} 0 0`,
});

export const timestamp = style({
  fontSize: fallbackVar(vars.comment.timestamp.fontSize, vars.text.small.fontSize),
  fontWeight: fallbackVar(vars.comment.timestamp.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.timestamp.letterSpacing, vars.text.small.letterSpacing),
  lineHeight: fallbackVar(vars.comment.timestamp.lineHeight, vars.text.small.lineHeight),
  fontFamily: vars.fontFamily,
  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: fallbackVar(vars.comment.timestamp.color, vars.color.textSecondary),
});

export const actions = style({
  display: 'flex',
  flexDirection: 'row',
  fontFamily: vars.fontFamily,
  position: 'absolute',
  right: vars.space[4],
  top: vars.space[2],
  transform: 'translateY(0%)',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: '6px',
  opacity: 1,

  selectors: {
    '&:empty': {
      display: 'none',
    },
  },
});

export const markdown = style({});
export const markdownLinksNotClickable = style({});

// since we are using a globalStyle we need to override any
// app specific styles
globalStyle(`${markdown} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)}`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)}`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${markdown} a`, {
  textDecoration: 'none !important',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)} !important`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}!important`,
  fontFamily: `${vars.fontFamily} !important`,
});

globalStyle(`${markdownLinksNotClickable} p`, {
  margin: '0 !important',
  padding: '0 !important',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)} !important`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)} !important`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)}!important`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)} !important`,
  letterSpacing: `${fallbackVar(
    vars.comment.body.letterSpacing,
    vars.text.base.letterSpacing
  )} !important`,
  fontFamily: `${vars.fontFamily} !important`,
});

globalStyle(`${markdownLinksNotClickable} a`, {
  textDecoration: 'none !important',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)} !important`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}!important`,
  cursor: 'default !important',
  fontFamily: `${vars.fontFamily} !important`,
});
