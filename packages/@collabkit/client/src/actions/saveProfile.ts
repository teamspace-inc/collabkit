import type { Profile, Store, UserProps } from '@collabkit/core';
import { isColor } from '@collabkit/colors';
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
      const partialProfile: Partial<UserProps> & { color?: string; id: string } = {
        ...existingProfile,
        ...config.user,
        id: userId,
      };
      delete partialProfile.userId;
      const profile = ensureColor(partialProfile);

      const workspaceId = store.workspaceId ?? config.workspace?.id;
      if (!workspaceId) {
        console.log('CollabKit: cannot save profile without workspaceId');
        return;
      }
      store.sync.saveProfile({ appId: config.appId, userId, workspaceId, profile });
      if (config.workspace) {
        store.sync.saveWorkspace({ appId: config.appId, workspaceId, workspace: config.workspace });
      }
      store.profiles[userId] = profile;
    } catch (e) {
      console.error('CollabKit: saveProfile failed', e);
    }
  }
}

export function ensureColor(profile: Partial<UserProps> & { color?: string; id: string }): Profile {
  let color = profile.color;
  if (isColor(color)) {
    return { ...profile, color };
  } else {
    return { ...profile, color: getRandomColor() };
  }
}
