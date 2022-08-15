import { ref, set, onChildAdded, onChildRemoved, update, onValue, child } from 'firebase/database';
import { CreateApp, CreateOrg, FunctionResponse } from './devTypes';
import { database } from './database';
import { devStore } from './devStore';
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from './database';
import { devEvents } from './devEvents';

export const devActions = {
  setEmail: (email: string) => {
    devStore.forms.enterEmail = { email };
  },

  verifyEmailLink: async () => {
    // Confirm the link is a sign-in with email link.
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = devStore.forms.enterEmail?.email;
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        devStore.authState = 'confirmEmailPrompt';
      } else {
        await devActions.signIn();
      }
    }
  },

  subscribeAuthState: () => {
    devStore.subs['user'] = onAuthStateChanged(auth, (user) => {
      if (user) {
        devStore.user = user;
        devStore.authState = 'signedIn';
        devActions.subscribeApps();
      } else {
        devStore.user = null;
        devStore.authState = 'signedOut';
        devActions.unsubscribe();
      }
    });
  },

  unsubscribe: () => {
    Object.values(devStore.subs).forEach((sub) => sub());
  },

  subscribeApps: () => {
    console.log('subscribing apps');
    if (!devStore.user) {
      console.warn('tried to subscribe to apps without a user');
      return;
    }
    devActions.subscribeOrgs();
  },

  signIn: async () => {
    console.log('signIn');
    // The client SDK will parse the code from the link for you.
    await signInWithEmailLink(auth, devStore.forms.enterEmail?.email!)
      .then((result) => {
        // Clear email from storage.
        devStore.user = result.user;
        devStore.authState = 'signedIn';
        // window.localStorage.removeItem('emailForSignIn');
        window.history.pushState({}, '', '/devs');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        console.error(error);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  },

  sendMagicLink: async () => {
    const { forms } = devStore;
    const email = forms.enterEmail?.email;
    if (!email) {
      console.warn('tried to send magic link without an email');
      return;
    }

    const actionCodeSettings = {
      url: window.location.origin + '/signedIn',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      devStore.authState = 'magicLinkSent';
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  changeAppName: async (props: { appId: string; newName: string }) => {
    await set(ref(database, `/apps/${props.appId}/name`), props.newName);
  },

  deleteApp: async (appId: string) => {
    if (!devStore.user) {
      console.warn('tried to delete app without a user');
      return;
    }
    const data = {
      [`/apps/${appId}`]: null,
      [`/adminApps/${devStore.user.uid}/${appId}`]: null,
    };
    try {
      await update(ref(database), data);
    } catch (e) {
      console.error('errro deleting app', e);
    }
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
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },

  subscribeOrgs: () => {
    if (!devStore.user) {
      console.warn('tried to subscribe to org without a user');
      return;
    }
    console.log('subscribing orgs');
    devStore.subs.orgs = onChildAdded(
      ref(database, `/adminOrgs/${devStore.user.uid}`),
      (childSnapshot) => {
        console.log('got org', childSnapshot.key);
        if (childSnapshot.key) {
          devStore.subs['orgAppAdded'] = onChildAdded(
            ref(database, `/orgApps/${childSnapshot.key}`),
            devEvents.onOrgAppAdded
          );
          devStore.subs['orgAppRemoved'] = onChildRemoved(
            ref(database, `/orgApps/${childSnapshot.key}`),
            devEvents.onOrgAppRemoved
          );
          devStore.subs[`org-${childSnapshot.key}`] = onValue(
            ref(database, `/orgs/${childSnapshot.key}`),
            (snapshot) => {
              console.log('org', snapshot.val());
              devStore.org = snapshot.val();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
    );
  },

  createOrg: async () => {
    if (!devStore.user) {
      console.warn('tried to create org without a user');
      return;
    }
    const name = devStore.forms.createOrg?.name;
    if (!name) {
      console.warn('tried to create org without a name');
      return;
    }
    const idToken = await devStore.user.getIdToken(true);
    const response = await fetch(`/api/createOrg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const json = (await response.json()) as FunctionResponse<CreateOrg>;
      if (json.status === 200 || json.status === 201) {
        devStore.apps[json.data.app.appId] = json.data.app;
        devStore.org = json.data.org;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },
};
