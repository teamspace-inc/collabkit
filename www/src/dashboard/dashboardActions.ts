import { ref, set, onChildAdded, onChildRemoved, update, onValue } from 'firebase/database';
import { CreateApp, CreateOrg, FunctionResponse } from './dashboardTypes';
import { database } from './database';
import { dashboardStore } from './dashboardStore';
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from './database';
import { dashboardEvents } from './dashboardEvents';

export const dashboardActions = {
  setEmail: (email: string) => {
    dashboardStore.forms.enterEmail = { email };
  },

  verifyEmailLink: async () => {
    // Confirm the link is a sign-in with email link.
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = dashboardStore.forms.enterEmail?.email;
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        dashboardStore.authState = 'confirmEmailPrompt';
      } else {
        await dashboardActions.signIn();
      }
    }
  },

  subscribeAuthState: () => {
    dashboardStore.subs['user'] = onAuthStateChanged(auth, (user) => {
      if (user) {
        dashboardStore.user = user;
        dashboardStore.authState = 'signedIn';
        dashboardActions.subscribeApps();
      } else {
        dashboardStore.user = null;
        dashboardStore.authState = 'signedOut';
        dashboardActions.unsubscribe();
      }
    });
  },

  unsubscribe: () => {
    Object.values(dashboardStore.subs).forEach((sub) => sub());
  },

  subscribeApps: () => {
    console.log('subscribing apps');
    if (!dashboardStore.user) {
      console.warn('tried to subscribe to apps without a user');
      return;
    }
    dashboardActions.subscribeOrgs();
  },

  signIn: async () => {
    console.log('signIn');
    // The client SDK will parse the code from the link for you.
    await signInWithEmailLink(auth, dashboardStore.forms.enterEmail?.email!)
      .then((result) => {
        // Clear email from storage.
        dashboardStore.user = result.user;
        dashboardStore.authState = 'signedIn';
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
    const { forms } = dashboardStore;
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
      dashboardStore.authState = 'magicLinkSent';
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  changeAppName: async (props: { appId: string; newName: string }) => {
    await set(ref(database, `/apps/${props.appId}/name`), props.newName);
  },

  deleteApp: async (appId: string) => {
    if (!dashboardStore.user) {
      console.warn('tried to delete app without a user');
      return;
    }
    const data = {
      [`/apps/${appId}`]: null,
      [`/adminApps/${dashboardStore.user.uid}/${appId}`]: null,
    };
    try {
      await update(ref(database), data);
    } catch (e) {
      console.error('errro deleting app', e);
    }
  },

  createApp: async () => {
    if (!dashboardStore.user) {
      return;
    }
    const idToken = await dashboardStore.user.getIdToken(true);
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
        dashboardStore.apps[json.data.app.appId] = json.data.app;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },

  subscribeOrgs: () => {
    if (!dashboardStore.user) {
      console.warn('tried to subscribe to org without a user');
      return;
    }
    console.log('subscribing orgs');
    dashboardStore.subs.orgs = onChildAdded(
      ref(database, `/adminOrgs/${dashboardStore.user.uid}`),
      (childSnapshot) => {
        console.log('got org', childSnapshot.key);
        if (childSnapshot.key) {
          dashboardStore.subs['orgAppAdded'] = onChildAdded(
            ref(database, `/orgApps/${childSnapshot.key}`),
            dashboardEvents.onOrgAppAdded
          );
          dashboardStore.subs['orgAppRemoved'] = onChildRemoved(
            ref(database, `/orgApps/${childSnapshot.key}`),
            dashboardEvents.onOrgAppRemoved
          );
          dashboardStore.subs[`org-${childSnapshot.key}`] = onValue(
            ref(database, `/orgs/${childSnapshot.key}`),
            (snapshot) => {
              console.log('org', snapshot.val());
              dashboardStore.org = snapshot.val();
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
    if (!dashboardStore.user) {
      console.warn('tried to create org without a user');
      return;
    }
    const name = dashboardStore.forms.createOrg?.name;
    if (!name) {
      console.warn('tried to create org without a name');
      return;
    }
    const idToken = await dashboardStore.user.getIdToken(true);
    const response = await fetch(`https://us-central1-collabkit-dev.cloudfunctions.net/createOrg`, {
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
        dashboardStore.apps[json.data.app.appId] = json.data.app;
        dashboardStore.org = json.data.org;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },
};
