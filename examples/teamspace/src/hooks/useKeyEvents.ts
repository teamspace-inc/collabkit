import { useEffect } from 'react';
import { inputs } from '@tldraw/core';

import { useAppEvents } from '../events';
import { useEditorContext } from './useEditorContext';

export function useKeyEvents() {
  const events = useAppEvents();
  const editorContext = useEditorContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      events.onKeyDown?.(e.key, inputs.keydown(e), e, editorContext);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      inputs.keyup(e);
      events.onKeyUp?.(e.key, inputs.keyup(e), e);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [events]);
}
