import { MentionWithColor } from '@collabkit/core';
import React, { useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { WithID, Event } from '../constants';
import { useApp } from './useApp';
import { useThreadContext } from './useThreadContext';

// calls onTimestampClick and onMentionClick when a
// user clicks on a timestamp or mention
// event is null if the user clicks on a
// link in the composer, where we don't have an
// event yet.
export function useOnMarkdownLinkClick(props: {
  threadId: string;
  workspaceId: string;
  userId: string;
  event: WithID<Event> | null;
}) {
  const { threadId } = useThreadContext();
  const { event } = props;
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  if (!workspaceId || !userId) {
    throw new Error('CollabKit: workspaceId and userId are required');
  }

  const triggerTimestampClick = useCallback(
    (timestamp: string) => {
      store.callbacks?.onTimestampClick?.({
        timestamp,
        threadId,
        workspaceId,
        userId,
        event,
      });
    },
    [threadId, workspaceId, userId]
  );

  const triggerMentionClick = useCallback(
    (mention: MentionWithColor) => {
      store.callbacks?.onMentionClick?.({
        threadId,
        workspaceId,
        userId,
        event,
        mention,
      });
    },
    [threadId, workspaceId, userId]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const { target } = e;
      if (target instanceof HTMLElement) {
        // from composer
        if (target.classList.contains('data-lexical-timestamp')) {
          e.stopPropagation();
          e.preventDefault();
          triggerTimestampClick(target.innerText);
        } else if (target.classList.contains('data-lexical-mention')) {
          e.stopPropagation();
          e.preventDefault();
          const mentionJSON = target.getAttribute('data-lexical-mention');
          if (mentionJSON) {
            const mention = JSON.parse(mentionJSON);
            triggerMentionClick(mention);
          }

          // from comment
        } else if (target instanceof HTMLAnchorElement) {
          const { href } = target;

          if (href.match(/#T(.*)/)) {
            triggerTimestampClick(target.innerText);
          } else if (href.match(/#@(.*)/)) {
            const [_, userId] = href.match(/#@(.*)/) || [];
            if (!userId) {
              return;
            }
            // this will need reworking for cross workspace communication
            if (store.profiles[userId]) {
              triggerMentionClick({ ...store.profiles[userId], workspaceId });
            }
          }
        }
      }
    },
    [store]
  );

  return { onClick };
}
