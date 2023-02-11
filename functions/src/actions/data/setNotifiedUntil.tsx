import { ref } from './refs';

export function setNotifiedUntil(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  profileId: string;
  notifiedUntilId: string;
}) {
  return ref`/notifiedUntil/${props.appId}/${props.workspaceId}/${props.threadId}/${props.profileId}`.set(
    props.notifiedUntilId
  );
}
