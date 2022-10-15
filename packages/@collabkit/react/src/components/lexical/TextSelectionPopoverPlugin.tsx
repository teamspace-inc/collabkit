import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  GridSelection,
  NodeKey,
  NodeSelection,
  RangeSelection,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingNode,
  offset,
  size,
  inline,
  useFloating,
  useFloatingNodeId,
  Placement,
} from '@floating-ui/react-dom-interactions';

// wraps lexical and browser native text selection
export type CompositeTextSelection = {
  nativeSelection: Selection;
  selection: RangeSelection | NodeSelection | GridSelection;
  nodeKey: NodeKey;
};

export function TextSelectionPopoverPlugin(props: {
  children: React.ReactNode;
  onSelectionChange?: (selection: CompositeTextSelection | null) => void;
  padding?: number; // default is 12
  placement?: Placement; // default is top-start
}) {
  const nodeId = useFloatingNodeId();
  const [editor] = useLexicalComposerContext();

  const [compositeSelection, setCompositeSelection] = useState<CompositeTextSelection | null>(null);

  const selectionRef = useRef<any>();

  const { reference, context } = useFloating({
    nodeId,
    strategy: 'fixed',
    placement: props.placement ?? 'top-start',
    open: !!compositeSelection?.nodeKey,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(),
      flip(),
      // autoPlacement(),
      // inline(),
      size({
        padding: props.padding ?? 12,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  });

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          setCompositeSelection(null);
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const { length } = selection.getTextContent();

        if (!anchorNode) {
          setCompositeSelection(null);
          return;
        }

        if (!$isTextNode(anchorNode)) {
          setCompositeSelection(null);
          return;
        }

        if (length === 0) {
          setCompositeSelection(null);
          return;
        }

        const nativeSelection = window.getSelection();

        if (!nativeSelection) {
          setCompositeSelection(null);
          return;
        }

        const newCompositeSelection = { nativeSelection, nodeKey: anchorNode.getKey(), selection };
        console.log('newCompositeSelection', newCompositeSelection);
        setCompositeSelection(newCompositeSelection);
        const clientRects = nativeSelection.getRangeAt(0).getClientRects();
        const boundingClientRect = nativeSelection.getRangeAt(0).getBoundingClientRect();
        selectionRef.current = {
          // record original scroll and window size,
          // and recompoute the below when it changes

          getClientRects() {
            return clientRects;
          },
          getBoundingClientRect() {
            return boundingClientRect;
          },
        };
      });
    });

    return unregisterListener;
  }, [editor]);

  console.log(compositeSelection);

  useEffect(() => {
    props.onSelectionChange?.(compositeSelection);
  }, [compositeSelection]);

  useLayoutEffect(() => {
    if (compositeSelection) {
      reference(selectionRef.current);
    }
  }, [compositeSelection]);

  return createPortal(
    compositeSelection ? (
      <FloatingNode id={nodeId}>
        <FloatingFocusManager context={context} preventTabbing={true} initialFocus={false}>
          <div
            ref={context.floating}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
            }}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingNode>
    ) : null,
    document.body
  );
}
