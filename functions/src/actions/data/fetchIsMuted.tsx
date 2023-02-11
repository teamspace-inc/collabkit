import { ref } from './refs';

export async function fetchIsMuted(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  profileId: string;
}): Promise<boolean> {
  const isMuted =
    (await (
      await ref`/notificationPreferences/${props.appId}/${props.workspaceId}/${props.threadId}/${props.profileId}/isMuted`.get()
    ).val()) ?? false;

  if (typeof isMuted !== 'boolean') {
    console.debug('invalid isMuted, exiting', isMuted);
    throw new Error('invalid isMuted');
  }

  return isMuted;
}
