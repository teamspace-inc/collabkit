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
  lineHeight: '$lineHeights$0',
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
  outline: 0,
  padding: '$padding$1 $padding$1',
  caretColor: '$colors$caretColor',
});

export const outer = css({
  display: 'flex',
  flexDirection: 'column',
});

export const typingOffset = css({
  marginLeft: 'calc($padding$1 + $sizes$avatar + 16px)',
});

export const container = css({
  position: 'relative',
  display: 'flex',
  flex: '0 1 auto',
  borderBottomLeftRadius: '$radii$1',
  borderBottomRightRadius: '$radii$1',
  padding: '$padding$0 $padding$1 0',
  background: '$colors$backgroundColor',
});

export const editorContainer = css({
  borderRadius: '$radii$0',
  width: 'calc(100% - $padding$composer - $sizes$avatar - 12px)', // take into account send button
  color: '$colors$primaryText',
  marginLeft: 8,
  padding: '0px 0',
  position: 'relative',
  verticalAlign: 'top',
  background: '$colors$composerBackground',
  border: '$borders$composer',

  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',

  '::placeholder': {
    color: '$colors$composerPlaceholder',
  },
});

// affects the text rendered inside the composer, so
// there is room for the send
export const visibleComposerArea = css({
  borderRadius: '$radii$0',
  width: 'calc(100% - $sizes$sendButton - 8px)', // take into account send button
  color: '$colors$primaryText',
  // marginLeft: 8,
  padding: '0px 0',
  position: 'relative',
  verticalAlign: 'top',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',
});
