import { ref, DataSnapshot, onValue } from 'firebase/database';

import React from 'react';
import { dashboardActions } from './dashboardActions';
import { database } from './database';
import { dashboardStore } from './dashboardStore';

export const dashboardEvents = {
  onAppChanged: (snapshot: DataSnapshot) => {
    console.log('onAppChanged');
    if (snapshot.key) {
      const app = { ...snapshot.val(), appId: snapshot.key };
      console.log('adding app', app);
      dashboardStore.apps[snapshot.key] = app;
    }
  },

  onEmailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    dashboardActions.setEmail(e.target.value);
  },

  onAuthFormSubmit: () => {
    if (
      dashboardStore.authState === 'confirmEmailPrompt' &&
      window.localStorage.getItem('emailForSignIn')! === dashboardStore.forms.enterEmail?.email
    ) {
      dashboardActions.signIn();
    } else {
      dashboardActions.sendMagicLink();
    }
  },

  onDeleteAppButtonClick: (props: { appId: string; e: React.MouseEvent }) => {
    dashboardActions.deleteApp(props.appId);
  },

  onOrgValue: (snapshot: DataSnapshot) => {
    console.log('on org value');
    if (snapshot.key) {
      const org = { ...snapshot.val(), orgId: snapshot.key };
      console.log('adding org', org);
      dashboardStore.org = org;
    }
  },

  onOrgAppAdded: (snapshot: DataSnapshot) => {
    console.log('org app added', snapshot.key, snapshot.val());
    if (snapshot.key) {
      dashboardStore.subs[snapshot.key] = onValue(
        ref(database, `/apps/${snapshot.key}`),
        dashboardEvents.onAppChanged
      );
    }
  },

  onOrgAppRemoved: (snapshot: DataSnapshot) => {
    if (snapshot.key) {
      dashboardStore.subs[snapshot.key]?.();
      delete dashboardStore.apps[snapshot.key];
    }
  },

  onCreateAppButtonClick: (e: React.MouseEvent) => {
    dashboardActions.createApp();
  },

  onCreateOrgButtonClick: (e: React.MouseEvent) => {
    dashboardActions.createOrg();
  },

  onCreateOrgInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    dashboardStore.forms.createOrg = { name: e.target.value };
  },

  onAppNameChange: (props: { appId: string; e: React.ChangeEvent<HTMLInputElement> }) => {
    dashboardActions.changeAppName({ appId: props.appId, newName: props.e.target.value });
  },
};
