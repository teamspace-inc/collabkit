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
  height: '100%',
  outline: 0,
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

export const lexicalEditorContainer = css({
  flex: 1,
  borderRadius: '$radii$0',
  color: '$colors$primaryText',
  width: '100%',
  padding: '0px',
  position: 'relative',
  verticalAlign: 'top',
  background: '$colors$composerBackground',
  border: '$borders$composer',

  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',

  variants: {
    floating: {
      true: {
        borderRadius: '',
      },
    },
    // insetSendButton: {
    //   true: {
    //     width: 'calc(100% - ($padding$composer*2) - $sizes$sendButton)', // take into account send button
    //   },
    // },
    // isFloating: {
    //   true: {
    //     border: '1px solid transparent',
    //   },
    // },
  },

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
  padding: '0px',
  position: 'relative',
  // verticalAlign: 'top',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',
});
