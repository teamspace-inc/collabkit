import { ref, DataSnapshot, onValue } from 'firebase/database';

import React from 'react';
import { actions } from './actions';
import { database } from './database';
import { store } from './store';

export const events = {
  onAppChanged: (snapshot: DataSnapshot) => {
    // console.log('onAppChanged');
    if (snapshot.key) {
      const app = { ...snapshot.val(), appId: snapshot.key };
      // console.log('adding app', app);
      store.apps[snapshot.key] = app;
    }
  },

  onDeleteAppButtonClick: (props: { appId: string; e: React.MouseEvent }) => {
    actions.deleteApp(props.appId);
  },

  onAdminAppAdded: (snapshot: DataSnapshot) => {
    // console.log('admin app added', snapshot.key, snapshot.val());
    if (snapshot.key) {
      store.adminApps[snapshot.key] = snapshot.val();
      store.subs[snapshot.key] = onValue(
        ref(database, `/apps/${snapshot.key}`),
        events.onAppChanged
      );
    }
  },

  onAdminAppRemoved: (snapshot: DataSnapshot) => {
    if (snapshot.key) {
      delete store.adminApps[snapshot.key];
      delete store.apps[snapshot.key];
    }
  },

  onCreateAppButtonClick: (e: React.MouseEvent) => {
    actions.createApp();
  },

  onAppNameChange: (props: { appId: string; e: React.ChangeEvent<HTMLInputElement> }) => {
    actions.changeAppName({ appId: props.appId, newName: props.e.target.value });
  },
};
