import { set, ref } from 'firebase/database';
import { DB, IdentifyProps, Store } from '../constants';
import { Color, getRandomColor } from '../colors';
import { getConfig } from './index';

export async function saveProfile(store: Store) {
  const { appId, userId, workspaceId } = getConfig(store);
  const { config } = store;

  try {
    const color = getRandomColor();

    let profile: Partial<IdentifyProps> & { color: Color } = { ...config.identify, color };

    delete profile.userId;

    try {
      await set(ref(DB, `/profiles/${appId}/${userId}`), profile);
    } catch (e) {
      console.error('CollabKit: failed to set profile', e);
    }

    try {
      await set(ref(DB, `/workspaces/${appId}/${workspaceId}/profiles/${userId}`), true);
    } catch (e) {
      console.error('CollabKit: failed to join workspace', e);
    }

    store.profiles[userId] = profile;

    if (store.appState === 'config') {
      store.appState = 'ready';
    }
  } catch (e) {
    console.error('CollabKit: saveProfile failed', e);
  }
}
