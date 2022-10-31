import React from 'react';
import { useApp } from '../hooks/useApp';

export function useNextThread(incr: number = 1) {
  const { events } = useApp();
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      events.onPointerDown(e, {
        target: { type: incr === 1 ? 'nextThreadButton' : 'previousThreadButton' },
      });
    },
    [events]
  );
  return { onPointerDown };
}
