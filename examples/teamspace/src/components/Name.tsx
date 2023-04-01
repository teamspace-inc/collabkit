import { YTextEditor } from 'editor';
import { css, styled } from '@stitches/react';
import { useCallback, useState } from 'react';
import { XmlFragment } from 'yjs';

import { useRealtime } from '../hooks/useRealtime';
import { useSpaceContext } from '../hooks/useSpaceContext';
import { Z } from 'state/constants';

import { useAppEvents } from '../events';
import { inputs } from '@tldraw/core';

const SpaceName = styled('div', {
  position: 'absolute',
  top: '$space$1',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  textAlign: 'center',
  alignSelf: 'center',
  justifySelf: 'center',
  zIndex: Z.CANVAS_TOOL,
});

const editorCss = css({
  resize: 'none',
  minWidth: 11 * 16,

  height: '100%',
  width: '100%',

  fontSize: 18,
  fontWeight: 600,
  lineHeight: '22px',
  wordWrap: 'break-word',
  border: '2px solid transparent',
  borderRadius: '$radii$1',
  userSelect: 'none',
  color: '$colors$text',
  cursor: 'text',

  '& [contenteditable="true"]': {
    padding: 5.5,
  },

  '& p': {
    margin: 0,
  },

  variants: {
    editing: {
      isEditing: {
        backgroundColor: '$colors$inputBackground',
        boxShadow: `$shadows$0`,
        borderColor: '$colors$inputBorderEditing',
        userSelect: 'unset',
      },
      idle: {},
    },
    empty: {
      isEmpty: {
        '&:after': {
          content: 'Untitled',
          position: 'absolute',
          left: '$space$2',
          right: '$space$1',
          pointerEvents: 'none',
          top: '$space$1',
          color: '$colors$inputPlaceholder',
        },
      },
      idle: {},
    },
  },
});

interface NameProps {
  fragment: XmlFragment;
  isEditing: boolean;
}

export function Name({ fragment, isEditing }: NameProps) {
  const { store: space } = useSpaceContext();
  const { onFocus, onBlur } = useAppEvents();

  const [isEmpty, setIsEmpty] = useState(true);

  const target = { type: 'spaceName', id: `${space.docId}-name`, docId: space.docId };

  const onKeyDown = useCallback((e) => {
    e.stopPropagation();
    // disable enter key
    return e.key !== 'Enter';
  }, []);

  const handleBlur = useCallback((e) => {
    e.stopPropagation();
    const info = inputs.focus(e, target);
    onBlur(info, e);
  }, []);

  const handleFocus = useCallback((e) => {
    e.stopPropagation();
    const info = inputs.focus(e, target);
    onFocus(info, e);
  }, []);

  const realtime = useRealtime(target.id);

  const { className } = editorCss({
    editing: isEditing ? 'isEditing' : 'idle',
    empty: isEmpty ? 'isEmpty' : 'idle',
  });

  return (
    <SpaceName data-test-id="space-name">
      <YTextEditor
        key={fragment.doc?.guid}
        editable={true}
        isEditing={isEditing}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}
        onEmpty={setIsEmpty}
        onFocus={handleFocus}
        schema="plainText"
        fragment={fragment}
        realtime={realtime}
        className={className}
      />
    </SpaceName>
  );
}
