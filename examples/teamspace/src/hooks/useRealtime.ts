import { useMemo } from 'react';
import { RealtimeProps } from 'editor';

import { getTextSelectionStyle, renderTextCursor } from '../components/TextCursor';
import { ClientColor, ClientColors } from '../utils/Colors';
import { useAppContext } from './useAppContext';
import { useSnapshot } from 'valtio';

export function useRealtime(docId: string) {
  const { store } = useAppContext();
  const { clientId } = useSnapshot(store);

  return useMemo<RealtimeProps | undefined>(() => {
    return {
      clientId,
      docId,
      store: store.editing,
      getSelectionStyle: (clientId: string) => {
        const color = (store.clients[clientId]?.color as ClientColor) || ClientColors.crimson;
        return getTextSelectionStyle(color);
      },
      renderCursor: (clientId: string) => {
        const color = (store.clients[clientId]?.color as ClientColor) || ClientColors.crimson;

        return renderTextCursor(color);
      },
    };
  }, [clientId, docId, store.editing]);
}
