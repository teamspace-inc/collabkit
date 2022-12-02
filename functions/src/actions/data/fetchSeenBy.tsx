import { isValidSeenBy } from '../helpers/isValidSeenBy';
import { ref } from './refs';
import * as FirebaseId from './FirebaseId';
import { SeenBy } from '../../types';

export async function fetchSeenBy(props: { appId: string; workspaceId: string; threadId: string }) {
  const snapshot =
    await ref`/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}/`.get();
  const result = snapshot.val();

  if (!isValidSeenBy(result)) {
    console.debug('invalid seenBy, exiting', result);
    throw new Error('invalid seenBy');
  }

  const seenBy: SeenBy = {};
  for (const [userId, data] of Object.entries(result ?? {})) {
    seenBy[FirebaseId.decode(userId)] = data;
  }

  return seenBy;
}
