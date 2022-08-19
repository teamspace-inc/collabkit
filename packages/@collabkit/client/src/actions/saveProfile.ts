import { Store } from '@collabkit/core';
import { Color, getRandomColor } from '@collabkit/colors';
import { UserProps } from '@collabkit/core';

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
      const color = getRandomColor();

      const userId = config.user?.userId ?? config.user?.id;

      let profile: Partial<UserProps> & { color: Color } = { color, ...config.user };

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
