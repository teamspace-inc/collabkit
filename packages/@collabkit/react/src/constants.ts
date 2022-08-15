import { getDatabase } from 'firebase/database';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDYl8MwTEgsIzXO7EHgBlvuN5BLVJqPZ6k',
  authDomain: 'collabkit-dev.firebaseapp.com',
  databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'collabkit-dev',
  storageBucket: 'collabkit-dev.appspot.com',
  messagingSenderId: '927079647438',
  appId: '1:927079647438:web:3535f7ba40a758167ee89f',
};

export const CollabKitFirebaseApp = initializeApp(firebaseConfig, 'CollabKit');

export const DB = getDatabase(CollabKitFirebaseApp);

export const API_HOST = 'https://us-central1-collabkit-dev.cloudfunctions.net';

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
  IdentifyProps,
  SetupProps,
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
} from '@collabkit/core';
