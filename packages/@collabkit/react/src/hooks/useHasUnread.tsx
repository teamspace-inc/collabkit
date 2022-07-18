import { Workspace } from '../constants';

export function useHasUnread(props: { pinId: string; workspace: Workspace }) {
  const seenUntilId = props.workspace.seen[props.pinId];
  const eventIds =
    props.workspace.timeline && props.workspace.timeline[props.pinId]
      ? Object.keys(props.workspace.timeline[props.pinId])
      : [];
  return eventIds[eventIds.length - 1] > seenUntilId;
}
