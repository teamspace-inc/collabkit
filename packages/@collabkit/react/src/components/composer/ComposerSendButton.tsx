import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { useThreadContext } from '../../hooks/useThreadContext';

export function ComposerSendButton(props: {
  renderButton: (props: {
    disabled: boolean;
    onPointerDown: (e: React.PointerEvent) => void;
  }) => JSX.Element;
}) {
  const { store, events } = useApp();
  const { workspaceId, threadId } = useThreadContext();
  const { workspaces } = useSnapshot(store);
  const bodyLength = workspaces[workspaceId]?.composers[threadId]?.$$body.trim().length ?? 0;

  return props.renderButton({
    disabled: bodyLength === 0,
    onPointerDown: (e) => events.onSend(workspaceId, threadId),
  });
}
