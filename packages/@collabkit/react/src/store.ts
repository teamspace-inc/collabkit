import { ref } from 'valtio';
import { proxyWithComputed } from 'valtio/utils';
import { Config, Store, SyncAdapter } from './constants';
import { createStore, actions } from '@collabkit/client';

type Reactions = {
  [threadId: string]: {
    [eventId: string]: EventReactions;
  };
};

type EventReactions = { [emoji: string]: { count: number; userIds: string[] } };

const DELETE_ID = 'delete-';

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxyWithComputed(createStore(), {
    reactions: (snapshot) => {
      const reactions: Reactions = {};
      const { workspaceId } = snapshot;
      if (!workspaceId) return reactions;
      const workspace = snapshot.workspaces[workspaceId];
      if (!workspace) return reactions;
      if (!workspace.timeline) return reactions;
      for (const threadId in workspace.timeline) {
        const thread = workspace.timeline[threadId];
        reactions[threadId] ||= {};
        for (const eventId in thread) {
          const event = thread[eventId];
          if (event.type === 'reaction') {
            const { parentId } = event;
            if (!parentId) continue;
            const isDelete = event.body.startsWith(DELETE_ID);
            const emojiU = isDelete ? event.body.split(DELETE_ID)[1] : event.body;
            reactions[threadId][parentId] ||= {};
            reactions[threadId][parentId][emojiU] ||= { count: 0, userIds: [] };
            const reaction = reactions[threadId][parentId][emojiU];
            if (!isDelete) {
              reaction.count++;
              reaction.userIds.push(event.createdById);
            } else {
              reaction.count--;
              const index = reaction.userIds.findIndex((userId) => userId === event.createdById);
              if (index > -1) {
                reaction.userIds.splice(index, 1);
              }
              if (reaction.count <= 0) {
                delete reactions[threadId][parentId][emojiU];
              }
            }
          }
        }
      }
      return reactions;
    },
    allPins: (snapshot) => {
      const { workspaceId } = snapshot;
      if (!workspaceId) return {};
      const workspace = snapshot.workspaces[workspaceId];
      if (!workspace) return {};
      const pins = Object.entries(workspace?.openPins ?? {})
        .map(([objectId, pinMap]) => Object.values(pinMap).map((pin) => ({ ...pin, objectId })))
        .flat();

      for (const threadId in workspace.composers) {
        const composers = workspace.composers[threadId];
        for (const eventId in composers) {
          const composer = composers[eventId];
          const { pendingPin } = composer;
          if (pendingPin) {
            const exists = pins.find((pin) => pin.id === pendingPin.id);
            if (!exists) {
              pins.push(pendingPin);
            }
          }
        }
      }
      return pins;
    },
  });

  if (config.callbacks) {
    store.callbacks = config.callbacks;
  }
  actions.init(store, config, ref(sync));
  return store as Store;
}
