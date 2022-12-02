import { isValidNotifiedUntilId } from '../helpers/isValidNotifiedUntilId';
import { ref } from './refs';

export async function fetchNotifiedUntilId(props: {
  appId: string;
  workspaceId: string;
  profileId: string;
  threadId: string;
}) {
  const { appId, workspaceId, profileId, threadId } = props;
  const notifiedUntil = (
    await ref`/notifiedUntil/${appId}/${workspaceId}/${threadId}/${profileId}`.get()
  ).val();

  if (notifiedUntil === null) {
    return undefined;
  }

  if (!isValidNotifiedUntilId(notifiedUntil)) {
    console.debug('invalid notifiedUntil, skipping', notifiedUntil);
    throw new Error('invalid notifiedUntil');
  }

  return notifiedUntil;
}
