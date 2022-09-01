import type { Mention, Store } from '@collabkit/core';
import { getRandomColor } from '@collabkit/colors';

export async function saveMentionableUsers(store: Store, mentionableUsers: readonly Mention[]) {
  const { workspaceId } = store;
  if (!workspaceId) {
    return;
  }

  const { appId } = store.config;

  mentionableUsers.forEach((mentionableUser) => {
    if (store.profiles[mentionableUser.id]) {
      store.mentionableUsers[mentionableUser.id] = {
        ...store.profiles[mentionableUser.id],
        workspaceId,
      };

      // only support saving colors for users like this
      // if unsecured mode, as we don't need to verify the user
    } else if ('apiKey' in store.config) {
      if (!store.mentionableUsers[mentionableUser.id]) {
        store.mentionableUsers[mentionableUser.id] = {
          id: mentionableUser.id,
          color: getRandomColor(),
          workspaceId,
        };
      }
      store.sync.saveProfile({
        appId,
        userId: mentionableUser.id,
        workspaceId,
        profile: store.mentionableUsers[mentionableUser.id],
      });
    }
  });
}
