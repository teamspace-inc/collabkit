import * as admin from 'firebase-admin';

const db = admin.database();
const CONNECTION_TIMEOUT_MS = 2000;

// export type TimelineEvent = {
//   type: 'message' | 'reaction' | 'adminMessage' | 'system';
//   body: string;
//   system?: 'resolve' | 'reopen';
//   createdAt: number | object;
//   createdById: string;
//   parentId?: string;
// };
// export type WithName<T> = T & {
//   name: string;
// };
// export type WithID<T> = T & {
//   id: string;
// };
// type BasicProfile = {
//   name?: string | null;
//   avatar?: string | null;
//   email?: string | null;
// };
// interface Profile extends BasicProfile {}
// type Events = {
//   [eventId: string]: TimelineEvent;
// };
// interface SeenBy {
//   [userId: string]: { seenAt: number; seenUntilId: string };
// }
// type InApp<A> = {
//   [appId: string]: A;
// };
// type InWorkspace<W> = {
//   [workspaceId: string]: W;
// };
// type InThread<T> = {
//   [threadId: string]: T;
// };
// type InUser<U> = {
//   [userId: string]: U;
// };
// type Workspace = {
//   name?: string;
//   profiles?: InUser<BasicProfile>;
// };
// type App = {
//   name?: string;
//   admins: {
//     [uid: string]: true;
//   };
//   keys: {
//     [key: string]: true;
//   };
//   mode: 'UNSECURED' | 'SECURED';
//   isEmailDisabled?: boolean;
// };
// type ThreadInfo = {
//   name?: string;
//   url?: string;
// };
// type Seen = {
//   seenAt: number;
//   seenUntilId: string;
// };
// type Workspaces = InApp<InWorkspace<Workspace>>;
// type Apps = InApp<App>;
// type Profiles = InApp<InUser<BasicProfile>>;
// type ThreadInfos = InApp<InWorkspace<InThread<ThreadInfo>>>;
// type Timelines = InApp<InWorkspace<InThread<TimelineEvent>>>;
// type NotifiedUntils = InApp<InWorkspace<InThread<InUser<string>>>>;
// type Seens = InApp<InUser<InWorkspace<InThread<Seen>>>>;
// type Inbox = InApp<InWorkspace<InThread<InUser<string>>>>;

export function onConnect() {
  return new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      reject('timed out');
    }, CONNECTION_TIMEOUT_MS);
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val()) {
        clearTimeout(timeoutID);
        resolve(true);
      }
    });
  });
}
