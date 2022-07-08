import { Store } from '../constants';
import { createEditor } from 'lexical';
import { createEditorConfig } from '../components/Composer';
import { ref as valtioRef } from 'valtio';
import { getConfig } from './index';
import { subscribeToTimeline, subscribeThreadIsTyping, subscribeThreadSeenBy } from './startThread';

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    pin?: { selector: string; url: string; point?: { x: number; y: number } };
  }
) {
  // initialise the store
  store.workspaces[props.workspaceId] ||= {
    inbox: {},
    pins: {},
    name: store.config.identify?.workspaceName || '',
    composers: {
      [props.threadId]: {
        editor: valtioRef(createEditor(createEditorConfig())),
        $$body: '',
        isTyping: {},
      },
    },
    timeline: {},
    seen: {},
    seenBy: {},
  };

  store.workspaces[props.workspaceId].composers[props.threadId] ||= {
    editor: valtioRef(createEditor(createEditorConfig())),
    $$body: '',
    isTyping: {},
  };

  const { appId, userId } = getConfig(store);
  // if (store.openId) {
  //   store.subs[timelineRef(store, props.workspaceId, props.threadId).toString()]?.();
  // }
  subscribeToTimeline(store, props);
  subscribeThreadIsTyping(store, props.workspaceId, props.threadId);
  subscribeThreadSeenBy(store, { appId, userId, ...props });
}
