import { ref, set, remove } from 'firebase/database';
import { CreateApp, FunctionResponse } from './devTypes';
import { database } from './database';
import { devStore } from './devStore';
import { sendVerificationEmail } from './sendVerificationEmail';

export const devActions = {
  setEmail: (email: string) => {
    devStore.email = email;
  },

  sendMagicLink: async () => {
    if (await sendVerificationEmail(devStore.email)) {
      devStore.authState = 'magicLinkSent';
    }
  },

  changeAppName: async (props: { appId: string; newName: string }) => {
    await set(ref(database, `/apps/${props.appId}/name`), props.newName);
  },

  deleteApp: async (appId: string) => {
    await remove(ref(database, `/apps/${appId}`));
  },

  createApp: async () => {
    if (!devStore.user) {
      return;
    }
    const idToken = await devStore.user.getIdToken(true);
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
        devStore.apps[json.data.app.appId] = json.data.app;
        devStore.adminApps[json.data.app.appId] = json.data.adminApp !== null;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },
};
