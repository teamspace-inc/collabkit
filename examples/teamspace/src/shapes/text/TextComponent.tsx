import {
  TLShapeUtil,
  HTMLContainer,
  useTLContext,
  TLForwardedRef,
  TLComponentProps,
} from '@tldraw/core';
import { css } from '@stitches/react';

import { TextShape, shapeUtils } from '../';
import { YTextEditor } from 'editor';
import { useSnapshot } from 'valtio';
import { forwardRef, useCallback, useRef } from 'react';
import { sand, sandA } from '@radix-ui/colors';
import { useAutoResizeObserver } from '../../hooks/useAutoResizeObserver';
import { useRealtime } from '../../hooks/useRealtime';
import React from 'react';

import {
  editorListStyles,
  editorHeadingStyles,
  editorPStyles,
  baseTextStyles,
} from 'styles/editorStyles';

import { ShapeErrorBoundary } from 'shapes/ShapeErrorBoundary';
import equal from 'fast-deep-equal';
import { useSpaceContext } from '../../hooks/useSpaceContext';
import { useSpaceEvents } from '../../events';
import { useTextFragment } from '../../hooks/useTextFragment';
import { ShapeTarget } from 'state/constants';

const editorCss = css(
  {
    resize: 'none',
    width: '100%',
    height: '100%',
    backgroundColor: 'none',
    padding: '0px',
    border: 'none',
    lineBreak: 'after-white-space',
    caretColor: sand.sand12,
    fontKerning: 'none',
    borderRadius: '$radii$shape',
    userSelect: 'none',

    overflow: 'hidden',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',

    '&.isEmpty > div p:first-of-type:before': {
      content: 'Text',
      position: 'absolute',
      color: sandA.sandA8,
    },

    '& > div': {
      padding: '8px 4px',
    },

    variants: {
      state: {
        editing: {
          userSelect: 'unset',
          cursor: 'text',
        },
      },
    },
  },
  baseTextStyles,
  editorHeadingStyles,
  editorPStyles,
  editorListStyles
);

export const TextDefaultSize = [140, 40];

const Text = forwardRef(function Text(
  { shape, events, isEditing }: TLComponentProps<TextShape, HTMLDivElement>,
  ref: TLForwardedRef<HTMLDivElement>
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { store: spaceStore } = useSpaceContext();
  // const spaceData = useSnapshot(store);
  const id = shape.id;

  const { undoManager } = useSnapshot(spaceStore);
  const target: ShapeTarget = { id, type: 'shape' };

  if (!id) throw new Error(`[TextComponent] No id. (shape: ${JSON.stringify(shape)})`);

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

  const { onAutoResizeShape } = useSpaceEvents(spaceStore);

  useAutoResizeObserver({
    target,
    ref: wrapRef,
    shouldObserve: isEditing,
    onResize: onAutoResizeShape,
    constraints: ['growWidth', 'shrinkWidth'],
  });

  const realtime = useRealtime(id);

  const bounds = shapeUtils.text.getBounds(shape);

  const fragment = useTextFragment(target);

  const { className } = editorCss({ state: isEditing ? 'editing' : undefined });

  return (
    <HTMLContainer data-testid="TextComponent" ref={ref} {...events}>
      <div
        style={{
          // setting height enables overflow: hidden
          // this means we can hide text if the user
          // resizes the textbox to be smaller than
          // the height of the text.
          height: isEditing ? 'unset' : bounds.height,
          display: 'flex',

          // setting minHeight, enables the textbox to
          // automatically grow in height as the user
          // enters text. this is required for the auto
          // resize observer to work.
          minHeight: bounds.height,
          minWidth: bounds.width,
          pointerEvents: 'all',
        }}
        ref={wrapRef}
      >
        {fragment ? (
          <YTextEditor
            key={fragment.doc?.guid}
            style={{ minWidth: Math.round(bounds.width), minHeight: Math.round(bounds.height) }}
            editable={isEditing}
            isEditing={isEditing}
            onKeyDown={onKeyDown}
            fragment={fragment}
            schema="markdown"
            undoManager={undoManager}
            realtime={realtime}
            className={className}
          />
        ) : (
          <div className={className} />
        )}
      </div>
    </HTMLContainer>
  );
});

export const TextComponent = React.memo(
  TLShapeUtil.Component<TextShape, HTMLDivElement>(function TextComponent(props, ref) {
    return (
      <ShapeErrorBoundary description="Something went wrong and this text could not be shown.">
        <Text {...props} ref={ref} />
      </ShapeErrorBoundary>
    );
  }),
  equal
);
