import type { Store, UserProps } from '@collabkit/core';
import type { Color } from '@collabkit/colors';
import { getRandomColor } from '@collabkit/colors';

export async function saveProfile(store: Store) {
  const { config } = store;
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot save profile in read-only mode');
    return;
  }
  // only support client side profile saving
  // for UNSECURED mode
  if ('apiKey' in config) {
    try {
      const userId = config.user?.userId ?? config.user?.id;

      if (!userId) {
        return;
      }

      const existingProfile = await store.sync.getProfile({ appId: config.appId, userId });

      let profile: Partial<UserProps> & { color?: Color } = { ...config.user };

      if (!existingProfile) {
        profile.color = getRandomColor();
      }

      delete profile.userId;

      if (!userId) {
        console.log('missing userId');
        return;
      }

      const workspaceId = store.workspaceId ?? config.workspace?.id;

      if (!workspaceId) {
        console.log('CollabKit: cannot save profile without workspaceId');
        return;
      }

      store.sync.saveProfile({ appId: config.appId, userId, workspaceId, profile });

      store.profiles[userId] = profile;
    } catch (e) {
      console.error('CollabKit: saveProfile failed', e);
    }
  }
}
