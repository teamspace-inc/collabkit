import { Store } from '../constants';
import { createEditor } from 'lexical';
import { createEditorConfig } from '../components/Composer';
import { ref as valtioRef } from 'valtio';
import { getConfig } from './index';
import { ThreadSeenEvent, TimelineChangeEvent, TypingEvent } from '../sync';
import { ThreadInfo } from '../hooks/useThread';

export function initComposer() {
  return {
    editor: valtioRef(createEditor(createEditorConfig())),
    $$body: '',
    isTyping: {},
  };
}

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    info?: ThreadInfo;
  }
) {
  store.workspaces[props.workspaceId].composers[props.threadId] ||= initComposer();
  const { workspaceId, threadId } = props;
  const { appId, userId } = getConfig(store);
  store.sync.subscribeThread({
    appId,
    userId,
    workspaceId,
    threadId,
    subs: store.subs,
    onTimelineEventAdded: (event: TimelineChangeEvent) => {
      store.workspaces[event.workspaceId].timeline[event.threadId] ||= {};
      store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId] ||= event.event;
    },
    onThreadTypingChange: ({ workspaceId, threadId, userId, isTyping }: TypingEvent) => {
      store.workspaces[workspaceId].composers[threadId].isTyping[userId] = isTyping;
    },
    onThreadSeenByUser: (event: ThreadSeenEvent) => {
      store.workspaces[event.workspaceId].seenBy[event.threadId] ||= {};
      store.workspaces[event.workspaceId].seenBy[event.threadId][event.userId] = event.data;
    },
  });
}
