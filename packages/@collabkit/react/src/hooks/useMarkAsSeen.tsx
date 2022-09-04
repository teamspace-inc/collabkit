import { useEffect } from 'react';
import { useApp } from './useApp';
import { useInView } from 'react-intersection-observer';
import { useWindowFocus } from './useWindowFocus';
import { CommentTarget } from '@collabkit/core';

export function useMarkAsSeen(target: CommentTarget) {
  const { events } = useApp();
  const isWindowFocused = useWindowFocus();
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    const shouldMarkSeen = isWindowFocused && inView;
    if (shouldMarkSeen) {
      events.onSeen({ target });
    }
  }, [isWindowFocused, inView]);

  return { ref };
}
