import { fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';

export const typeahead = style({
  position: 'absolute',
  background: fallbackVar(vars.mentions.typeahead.background, vars.color.surface),
  borderRadius: vars.mentions.typeahead.borderRadius,
  zIndex: 9999,
  padding: vars.mentions.typeahead.padding,
  boxShadow: fallbackVar(vars.mentions.typeahead.boxShadow, vars.shadow.standard),
  border: fallbackVar(vars.mentions.typeahead.border, `1px solid ${vars.color.border}`),
});

export const mark = style({
  background: vars.mentions.typeahead.item.mark.background,
  borderRadius: vars.mentions.typeahead.item.mark.borderRadius,
  color: vars.mentions.typeahead.item.mark.color,
  fontWeight: fallbackVar(vars.mentions.typeahead.item.mark.fontWeight, vars.fontWeight.bold),
});

export const list = style({
  padding: 0,
  listStyle: 'none',
  margin: 0,
  borderRadius: vars.mentions.typeahead.borderRadius,
  zIndex: 9999,
  width: '100%',
});

export const nameAndEmailWrapper = style({
  gap: fallbackVar(vars.mentions.typeahead.item.nameAndEmailWrapper.gap, vars.space[1]),
  flexDirection: vars.mentions.typeahead.item.nameAndEmailWrapper.flexDirection,
  display: 'flex',
});

export const item = recipe({
  base: {
    padding: fallbackVar(vars.mentions.typeahead.item.padding, vars.space[2]),
    margin: 0,
    boxSizing: 'border-box',
    minWidth: '10ch',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'left',
    alignItems: 'center',
    gap: fallbackVar(vars.mentions.typeahead.item.gap, vars.space[2]),
    outline: 'none',
    cursor: 'pointer',
    color: fallbackVar(vars.mentions.typeahead.item.color, vars.color.textPrimary),
    fontWeight: fallbackVar(vars.mentions.typeahead.item.fontWeight, vars.fontWeight.regular),
    fontSize: fallbackVar(vars.mentions.typeahead.item.fontSize, vars.text.base.fontSize),
    lineHeight: fallbackVar(vars.mentions.typeahead.item.lineHeight, vars.text.base.lineHeight),
    letterSpacing: fallbackVar(
      vars.mentions.typeahead.item.letterSpacing,
      vars.text.base.letterSpacing
    ),

    selectors: {
      '&:first-of-type': {
        borderTopLeftRadius: vars.mentions.typeahead.borderRadius,
        borderTopRightRadius: vars.mentions.typeahead.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: vars.mentions.typeahead.borderRadius,
        borderBottomRightRadius: vars.mentions.typeahead.borderRadius,
      },
    },
  },

  variants: {
    active: {
      true: {
        background: fallbackVar(
          vars.mentions.typeahead.item.active.background,
          vars.color.surfaceOverlay
        ),
        color: fallbackVar(vars.mentions.typeahead.item.active.color, vars.color.textPrimary),
      },
    },
  },
});

export const name = style({
  color: fallbackVar(
    vars.mentions.typeahead.item.name.color,
    vars.mentions.typeahead.item.color,
    vars.color.textPrimary
  ),
  fontWeight: fallbackVar(
    vars.mentions.typeahead.item.name.fontWeight,
    vars.mentions.typeahead.item.fontWeight,
    vars.fontWeight.bold
  ),
  fontSize: fallbackVar(
    vars.mentions.typeahead.item.name.fontSize,
    vars.mentions.typeahead.item.fontSize,
    vars.text.base.fontSize
  ),
  lineHeight: fallbackVar(
    vars.mentions.typeahead.item.name.lineHeight,
    vars.mentions.typeahead.item.lineHeight,
    vars.text.base.lineHeight
  ),
  letterSpacing: fallbackVar(
    vars.mentions.typeahead.item.name.letterSpacing,
    vars.mentions.typeahead.item.letterSpacing,
    vars.text.base.letterSpacing
  ),
});

export const email = style({
  color: fallbackVar(
    vars.mentions.typeahead.item.email.color,
    vars.mentions.typeahead.item.color,
    vars.color.textSecondary
  ),
  fontWeight: fallbackVar(
    vars.mentions.typeahead.item.email.fontWeight,
    vars.mentions.typeahead.item.fontWeight,
    vars.fontWeight.regular
  ),
  fontSize: fallbackVar(
    vars.mentions.typeahead.item.email.fontSize,
    vars.mentions.typeahead.item.fontSize,
    vars.text.small.fontSize
  ),
  lineHeight: fallbackVar(
    vars.mentions.typeahead.item.email.lineHeight,
    vars.mentions.typeahead.item.lineHeight,
    vars.text.small.lineHeight
  ),
  letterSpacing: fallbackVar(
    vars.mentions.typeahead.item.email.letterSpacing,
    vars.mentions.typeahead.item.letterSpacing,
    vars.text.small.letterSpacing
  ),
});

export const mentionStyle = style({
  fontWeight: fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold),
  color: fallbackVar(vars.mentions.pill.color, vars.color.textPrimary),
  background: vars.mentions.pill.background,
  borderRadius: vars.mentions.pill.borderRadius,
  padding: vars.mentions.pill.padding,
  fontSize: fallbackVar(vars.mentions.pill.fontSize, vars.text.base.fontSize),
  lineHeight: fallbackVar(vars.mentions.pill.lineHeight, vars.text.base.lineHeight),
  letterSpacing: fallbackVar(vars.mentions.pill.letterSpacing, vars.text.base.letterSpacing),
});
