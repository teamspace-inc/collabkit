import { css } from '@stitches/react';

const ltr = css({
  textAlign: 'left',
});
const rtl = css({
  textAlign: 'right',
});

export const placeholder = css({
  color: '$colors$secondaryText',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '$padding$1',
  left: '$padding$1',
  fontSize: '$fontSize$2',
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});

const paragraphStyles = css({
  margin: '0 0 0px 0',
  position: 'relative',
});

export const lexicalTheme = {
  ltr: ltr.toString(),
  rtl: rtl.toString(),
  placeholder: placeholder.toString(),
  paragraph: paragraphStyles.toString(),
};

export const contentEditable = css({
  resize: 'none',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  position: 'relative',
  tabSize: 1,
  boxSizing: 'border-box',
  outline: 0,
  width: '100%',
  padding: '$padding$1 $padding$1',
  caretColor: '$colors$caretColor',
});

export const root = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  padding: '0 16px',
});

export const typingOffset = css({
  marginLeft: 'calc($padding$1 + $sizes$avatar + 16px)',
});

export const editorRoot = css({
  flex: 1,
  borderRadius: '$radii$0',
  color: '$colors$primaryText',
  width: '100%',
  position: 'relative',
  verticalAlign: 'top',
  background: '$colors$composerBackground',
  boxSizing: 'border-box',
  border: '$borders$composer',

  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',

  '::placeholder': {
    color: '$colors$composerPlaceholder',
  },
});

export const content = css({
  borderRadius: '$radii$0',
  color: '$colors$primaryText',
  padding: '0px',
  position: 'relative',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',
});
