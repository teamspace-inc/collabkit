export const API_HOST = 'https://token.collabkit.dev';
import { FirebaseConfig } from '@collabkit/core';
import { initializeApp } from 'firebase/app';

declare global {
  var _firebaseConfig: FirebaseConfig;
}

const firebaseConfig =
  '_firebaseConfig' in globalThis
    ? globalThis._firebaseConfig
    : {
        apiKey: 'AIzaSyDYl8MwTEgsIzXO7EHgBlvuN5BLVJqPZ6k',
        authDomain: 'collabkit-dev.firebaseapp.com',
        databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'collabkit-dev',
        storageBucket: 'collabkit-dev.appspot.com',
        messagingSenderId: '927079647438',
        appId: '1:927079647438:web:3535f7ba40a758167ee89f',
      };

initializeApp(firebaseConfig, 'CollabKit');

export type {
  SyncAdapter,
  Target,
  Commentable,
  CommentType,
  BasicPinProps,
  PinTarget,
  CommentableContainer,
  FloatingCommentButtonTarget,
  ComposerTarget,
  ThreadTarget,
  CommentButtonTarget,
  ClickedOutsidePinTarget,
  CommentReactionTarget,
  ThreadResolveButtonTarget,
  ReopenThreadButtonTarget,
  ThreadCloseButtonTarget,
  CommentTarget,
  Event,
  WithName,
  WithID,
  Config,
  MentionProps,
  Mention,
  BasicProfile,
  Profile,
  Timeline,
  Composer,
  SeenBy,
  Pin,
  Workspace,
  Store,
  Subscriptions,
  ConfigProps,
  SecureProps,
  UnsecureProps,
} from '@collabkit/core';
