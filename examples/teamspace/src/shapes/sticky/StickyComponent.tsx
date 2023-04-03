import { TLShapeUtil, HTMLContainer, useTLContext } from '@tldraw/core';
import { css } from '@stitches/react';
import { YTextEditor } from 'editor';
import { useCallback } from 'react';
import { sandA } from '@radix-ui/colors';
import equal from 'fast-deep-equal';

import { StickyShape } from '..';
import { useRealtime } from 'hooks/useRealtime';
import React from 'react';
import {
  baseTextStyles,
  editorListStyles,
  editorHeadingStyles,
  editorPStyles,
} from 'styles/editorStyles';
import { cardShadowStyles } from 'styles/cardStyles';
import { useTextFragment } from 'hooks/useTextFragment';
import { AutosizeableShape } from 'shapes/textcard/AutosizeableShape';
import { useSpaceContext } from 'hooks/useSpaceContext';
import { useSnapshot } from 'valtio';
import { COLUMN_WIDTH, ShapeTarget } from 'state/constants';
import { cardThemes } from 'styles/stitches.config';

export const STICKY_NOTE_WIDTH = COLUMN_WIDTH * 7;
export const STICKY_NOTE_HEIGHT = STICKY_NOTE_WIDTH;

// @todo extract this out
const editorCss = css(
  {
    resize: 'none',
    width: '100%',
    minWidth: STICKY_NOTE_WIDTH,
    minHeight: STICKY_NOTE_HEIGHT,
    height: '100%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    backgroundColor: '$colors$cardBackground',
    padding: '0px',
    lineBreak: 'after-white-space',
    caretColor: '$colors$text',
    color: '$colors$text',
    fontKerning: 'none',
    borderRadius: '$radii$0',
    userSelect: 'none',

    variants: {
      state: {
        isEditing: {
          true: {
            userSelect: 'unset',
            cursor: 'text',
          },
        },
      },
    },

    '& > div': {
      padding: '11px',
    },

    '&.isEmpty > div p:first-of-type:before': {
      content: 'Type here...',
      position: 'absolute',
      color: sandA.sandA8,
    },
  },
  cardShadowStyles,
  baseTextStyles,
  editorListStyles,
  editorHeadingStyles,
  editorPStyles,
  editorListStyles,
  {
    '& ol, & ul': {
      marginLeft: '-5.5px',
    },
  }
);

export const StickyDefaultSize = [STICKY_NOTE_WIDTH, STICKY_NOTE_HEIGHT];

export const StickyComponent = React.memo(
  TLShapeUtil.Component<StickyShape, HTMLDivElement>(function StickyComponent(
    { shape, events, isEditing, isDragging, hasSize },
    ref
  ) {
    const id = shape.id;

    if (!id) throw new Error(`[StickyComponent] No id. (shape: ${JSON.stringify(shape)})`);
    const target: ShapeTarget = { type: 'shape', id: shape.id };
    const fragment = useTextFragment(target);
    const { undoManager } = useSnapshot(useSpaceContext().store);

    const { inputs, callbacks } = useTLContext();

    const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        e.stopPropagation();
        const info = inputs.keydown(e);
        callbacks.onKeyDown?.(e.key, info, e);
        return true;
      },
      [inputs, callbacks, id]
    );

    const realtime = useRealtime(id);

    const { className } = editorCss({ isEditing, isDragging });

    return (
      <HTMLContainer data-testid="StickyComponent" ref={ref} {...events}>
        <AutosizeableShape
          hasSize={hasSize}
          isDragging={isDragging}
          isEditing={isEditing}
          isResizing={false}
          width={STICKY_NOTE_WIDTH}
          shape={shape}
          shouldFillWidth={false}
          shouldFillHeight={false}
          constraints={['shrinkHeight', 'growHeight']}
        >
          <div className={cardThemes.yellow}>
            {fragment ? (
              <YTextEditor
                editable={isEditing}
                style={{ minHeight: STICKY_NOTE_HEIGHT }}
                isEditing={isEditing}
                onKeyDown={onKeyDown}
                fragment={fragment}
                undoManager={undoManager}
                schema="markdown"
                realtime={realtime}
                className={className}
              />
            ) : null}
          </div>
        </AutosizeableShape>
      </HTMLContainer>
    );
  }),
  equal
);
