import { ref, DataSnapshot, onValue } from 'firebase/database';

import React from 'react';
import { devActions } from './devActions';
import { database } from './database';
import { devStore } from './devStore';

export const devEvents = {
  onAppChanged: (snapshot: DataSnapshot) => {
    // console.log('onAppChanged');
    if (snapshot.key) {
      const app = { ...snapshot.val(), appId: snapshot.key };
      // console.log('adding app', app);
      devStore.apps[snapshot.key] = app;
    }
  },

  onEmailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    devActions.setEmail(e.target.value);
  },

  onAuthFormSubmit: () => {
    devActions.sendMagicLink();
  },

  onDeleteAppButtonClick: (props: { appId: string; e: React.MouseEvent }) => {
    devActions.deleteApp(props.appId);
  },

  onAdminAppAdded: (snapshot: DataSnapshot) => {
    // console.log('admin app added', snapshot.key, snapshot.val());
    if (snapshot.key) {
      devStore.adminApps[snapshot.key] = snapshot.val();
      devStore.subs[snapshot.key] = onValue(
        ref(database, `/apps/${snapshot.key}`),
        devEvents.onAppChanged
      );
    }
  },

  onAdminAppRemoved: (snapshot: DataSnapshot) => {
    if (snapshot.key) {
      delete devStore.adminApps[snapshot.key];
      delete devStore.apps[snapshot.key];
    }
  },

  onCreateAppButtonClick: (e: React.MouseEvent) => {
    devActions.createApp();
  },

  onAppNameChange: (props: { appId: string; e: React.ChangeEvent<HTMLInputElement> }) => {
    devActions.changeAppName({ appId: props.appId, newName: props.e.target.value });
  },
};
