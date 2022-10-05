import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useComposer(props: {
  workspaceId: string | undefined | null;
  threadId: string | undefined | null;
  eventId?: string | undefined | null;
}) {
  const { store, events } = useApp();
  const { workspaceId, threadId } = props;
  const { workspaces } = useSnapshot(store);
  const eventId = props.eventId ?? 'default';
  const isEnabled =
    workspaceId && threadId ? workspaces[workspaceId]?.composers[threadId]?.enabled[eventId] : true;

  return {
    isEnabled,
    onFocus: (e: React.FocusEvent) => {
      if (!workspaceId) {
        return;
      }

      if (!threadId) {
        return;
      }

      events.onFocus(e, { target: { type: 'composer', workspaceId, threadId, eventId } });
    },
    onBlur: (e: React.FocusEvent) => {
      if (!workspaceId) {
        return;
      }

      if (!threadId) {
        return;
      }

      events.onBlur(e, { target: { type: 'composer', workspaceId, threadId, eventId } });
    },
    onPointerDown: (e: React.PointerEvent) => {
      if (!workspaceId) {
        return;
      }

      if (!threadId) {
        return;
      }

      if (e.button !== 0) {
        return;
      }

      if (eventId === 'default') {
        events.onSend(workspaceId, threadId);

        // if we pass an eventId, it's an edit
      } else {
        events.onEdit();
      }
    },
  };
}
