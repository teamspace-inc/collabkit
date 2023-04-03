import { XmlFragment, UndoManager } from 'yjs';
import type { MultiDocUndoManager } from 'y-utility/y-multidoc-undomanager';
import { yUndoPlugin } from './plugins/undo-plugin';

import { schema as markdown } from './schemas/markdownSchema';

import { EditorState, TextSelection } from 'prosemirror-state';

import React, { useCallback, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

import './styles/prosemirror.css';
import './styles/cursor.css';
import { buildInputRules } from './schemas/markdownRules';

import { realtimePlugin, RealtimeProps, useRealtime } from './hooks/useRealtime';

import { SchemaOptions, schemas } from './schemas';

import { placeholderPlugin } from './plugins/placeholder-plugin';
import { useAutofocus } from './hooks/useAutofocus';
import { yCursorPluginKey, ySyncPlugin, ySyncPluginKey } from 'y-prosemirror';
import { Plugin } from 'prosemirror-state';

interface EditorProps {
  fragment: XmlFragment;
  editable: boolean;

  // Optional
  style?: React.CSSProperties;
  className?: string;
  placeholderClassName?: string;
  isEditing?: boolean;
  realtime?: RealtimeProps;
  schema?: SchemaOptions;
  undoManager?: UndoManager | MultiDocUndoManager;
  onViewInstantiated?: (view: EditorView) => void;
  onViewDestroyed?: () => void;
  onReady?: (view: EditorView, isLocalClient: boolean) => void;
  onUpdate?: (view: EditorView, isLocalClient: boolean) => void;
  onFocus?: (e: FocusEvent, view: EditorView) => void;
  onBlur?: (e: FocusEvent, view: EditorView) => void;
  onKeyDown?: (e: KeyboardEvent, view: EditorView) => boolean;
  onEmpty?: (isEmpty: boolean) => void;
  onPointerDown?: (e: PointerEvent, view: EditorView) => void;
  onPointerUp?: (e: PointerEvent, view: EditorView) => void;
}

interface EditorConfig {
  fragment: XmlFragment;
  schemaOption: SchemaOptions;
  realtime?: RealtimeProps;
  undoManager?: UndoManager | MultiDocUndoManager;
  placeholderClassName?: string;
}

function config({
  fragment,
  schemaOption,
  realtime,
  undoManager,
  placeholderClassName,
}: EditorConfig) {
  const schema = schemas[schemaOption];
  const plugins: Plugin[] = [ySyncPlugin(fragment)];

  if (placeholderClassName) {
    plugins.push(placeholderPlugin(placeholderClassName));
  }

  if (undoManager) {
    plugins.push(yUndoPlugin({ undoManager }));
  }

  if (schemaOption === 'markdown') {
    plugins.push(buildInputRules(markdown));
  }

  if (realtime) {
    plugins.push(realtimePlugin(realtime));
  }

  return {
    schema,
    plugins,
  };
}

export const YTextEditor = function YTextEditor({
  onPointerDown,
  onPointerUp,
  onBlur,
  onKeyDown,
  onFocus,
  onViewInstantiated,
  onViewDestroyed,
  onReady,
  onUpdate,
  isEditing,
  undoManager,
  editable,
  fragment,
  schema,
  realtime,
  style,
  className,
  placeholderClassName,
  onEmpty,
}: EditorProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<EditorView | null>(null);
  const [isEmpty, setIsEmpty] = React.useState<boolean>(true);

  const cutCopyPaste = useCallback(
    (view: EditorView, e: ClipboardEvent) => {
      if (editable) {
        e.stopPropagation();
      }
      return true;
    },
    [editable]
  );

  useEffect(() => {
    if (ref.current) {
      let isSyncPluginReady = false;
      viewRef.current = new EditorView(ref.current, {
        state: EditorState.create(
          config({
            fragment,
            schemaOption: schema || 'basic',
            realtime,
            undoManager,
            placeholderClassName,
          })
        ),

        editable: () => editable,

        dispatchTransaction: (tr) => {
          const view = viewRef.current;
          if (!view) {
            return;
          }

          const isLocalClient = !tr.getMeta(ySyncPluginKey) && !tr.getMeta(yCursorPluginKey);

          const state = view.state.apply(tr);

          view.updateState(state);

          if (!isSyncPluginReady && tr.getMeta(ySyncPluginKey).isChangeOrigin) {
            // Sync plugin has now reset the editor content.
            isSyncPluginReady = true;
            onReady?.(view, isLocalClient);

            // Move cursor to the beginning of the document to avoid it remaining in the first <p> element.
            view.dispatch(state.tr.setSelection(new TextSelection(state.doc.resolve(0))));
          }

          const isEmpty = view.state.doc.textContent.length === 0;
          setIsEmpty(isEmpty);
          if (onEmpty) {
            onEmpty(isEmpty);
          }

          onUpdate?.(view, isLocalClient);
        },

        handleDOMEvents: {
          pointerdown: (view, e) => {
            onPointerDown?.(e, view);
            return true;
          },
          pointerup: (view, e) => {
            onPointerUp?.(e, view);
            return true;
          },
          paste: cutCopyPaste,
          cut: cutCopyPaste,
          copy: cutCopyPaste,
          focus: (view, e) => {
            onFocus?.(e, view);
            return true;
          },
          blur: (view, e) => {
            onBlur?.(e, view);
            if (realtime) {
              realtime.store.localYCursors[realtime.docId] = null;
            }
            return true;
          },
          keydown: (view, e) => {
            // pass the event to the app for handling
            // app-level shortcuts
            if (onKeyDown) {
              return onKeyDown(e, view);
            }
            return true;
          },
        },
      });

      onViewInstantiated?.(viewRef.current);

      return () => {
        viewRef.current?.destroy();
        viewRef.current = null;
        onViewDestroyed?.();
      };
    }
    return () => {};
  }, [
    fragment,
    undoManager,
    placeholderClassName,
    onFocus,
    onKeyDown,
    onBlur,
    onEmpty,
    onViewInstantiated,
    onPointerDown,
    onPointerUp,
  ]);

  useRealtime({ view: viewRef.current, realtime: realtime });

  useAutofocus({ view: viewRef.current, isEditable: editable, isEditing: !!isEditing });

  return (
    <div
      data-testid="YTextEditor"
      // disable grammarly as it inteferes with crisp editor rendering
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
      data-test-is-editing={isEditing}
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flex: 1,
        ...style,
      }}
      className={`${className} ${isEmpty ? 'isEmpty' : ''}`}
    />
  );
};
