import { Composer, Event } from '@collabkit/core';
import { useSnapshot, INTERNAL_Snapshot } from 'valtio';

export function usePinAttachment(store: Composer | Event | INTERNAL_Snapshot<Event>) {
  const { attachments } = useSnapshot(store);
  const pinId = attachments
    ? Object.keys(attachments).find((id) => attachments[id].type === 'pin')
    : null;
  return pinId ? { id: pinId, ...attachments![pinId] } : null;
}
