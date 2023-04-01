import { EditorView } from 'prosemirror-view';
import { useEffect } from 'react';
import { subscribe } from 'valtio';
import { setMeta, yCursorPluginKey } from 'y-prosemirror';
import { yCursorPlugin } from '../plugins/cursor-plugin';
import { YCursor } from '../types';

export type RealtimeProps = {
  clientId: string;
  docId: string;
  store: {
    yCursors: Record<string, Record<string, YCursor> | null>;
    localYCursors: Record<string, YCursor | null>; // docId -> cursor
  };
  renderCursor: (clientId: string) => HTMLElement;
  getSelectionStyle: (clientId: string) => string;
};

type UseRealtimeProps = {
  realtime: RealtimeProps | undefined;
  view: EditorView | null;
};

export function useRealtime({ realtime, view }: UseRealtimeProps) {
  const hasTextCursors = realtime && realtime.store.yCursors && realtime?.docId;
  useEffect(() => {
    if (hasTextCursors) {
      return subscribe(realtime.store.yCursors!, (ops) => {
        if (ops[0][1][0] === realtime.docId && view) {
          setMeta(view, yCursorPluginKey, true);
        }
      });
    }
    return () => {};
  }, [hasTextCursors, view]);
}

export const realtimePlugin = (realtime: RealtimeProps) =>
  yCursorPlugin(
    realtime.clientId,
    realtime.docId,
    realtime.store,
    realtime.renderCursor,
    realtime.getSelectionStyle
  );
