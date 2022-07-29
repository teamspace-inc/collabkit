import { IdentifyProps, Store } from '../constants';
import { Color, getRandomColor } from '../colors';
import { getConfig } from './index';

export async function saveProfile(store: Store) {
  const { appId, userId, workspaceId } = getConfig(store);
  const { config } = store;
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot save profile in read-only mode');
    return;
  }
  try {
    const color = getRandomColor();

    let profile: Partial<IdentifyProps> & { color: Color } = { ...config.identify, color };

    delete profile.userId;

    store.sync.saveProfile({ appId, userId, workspaceId, profile });

    store.profiles[userId] = profile;
  } catch (e) {
    console.error('CollabKit: saveProfile failed', e);
  }
}
