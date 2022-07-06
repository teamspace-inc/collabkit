import { set, ref, update } from 'firebase/database';
import { DB, IdentifyProps, Store } from '../constants';
import { Color, getRandomColor } from '../colors';
import { getConfig } from './index';

export async function saveProfile(store: Store) {
  const { workspaceId, appId, userId } = getConfig(store);
  const { config } = store;

  try {
    const color = getRandomColor();

    let profile: Partial<IdentifyProps> & { color: Color } = { ...config.identify, color };

    delete profile.workspaceId;
    delete profile.workspaceName;
    delete profile.userId;

    let workspace: Pick<IdentifyProps, 'workspaceId' | 'workspaceName'> = {
      workspaceId,
    };

    // only if the user has explicitly passed workspaceName do
    // we want to apply it as a change
    if (config.identify?.hasOwnProperty('workspaceName')) {
      workspace.workspaceName = config.identify.workspaceName;
    }

    await update(ref(DB, `/workspaces/${appId}/${workspaceId}/`), workspace);

    await set(ref(DB, `/workspaces/${appId}/${workspaceId}/profiles/${userId}`), true);

    await set(ref(DB, `/profiles/${appId}/${userId}`), profile);

    store.profiles[userId] = profile;

    if (store.appState === 'config') {
      store.appState = 'ready';
    }
  } catch (e) {
    console.error(e);
  }
}
