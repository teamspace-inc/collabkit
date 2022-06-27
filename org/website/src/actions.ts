import { ref, set, remove } from 'firebase/database';
import { database } from './database';
import { store } from './store';

export const actions = {
  changeAppName: async (props: { appId: string; newName: string }) => {
    await set(ref(database, `/apps/${props.appId}/name`), props.newName);
  },

  deleteApp: async (appId: string) => {
    await remove(ref(database, `/apps/${appId}`));
  },

  createApp: async () => {
    if (!store.user) {
      return;
    }
    const idToken = await store.user.getIdToken(true);
    const response = await fetch(`/api/createApp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.ok) {
      const json = (await response.json()) as FunctionResponse<CreateApp>;
      if (json.status === 200 || json.status === 201) {
        store.apps[json.data.app.appId] = json.data.app;
        store.adminApps[json.data.app.appId] = json.data.adminApp !== null;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },
};
