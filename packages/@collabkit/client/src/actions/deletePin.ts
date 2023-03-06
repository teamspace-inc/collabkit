import type { Store } from '@collabkit/core';
import { removeAttachment } from './removeAttachment';

export async function deletePin(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    eventId: string;
    pinId: string;
    objectId: string;
  }
) {
  // console.warn('deletePin is not implemented', props);
  // const { workspaceId } = props;
  // const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];
  // for (const id in composer.attachments) {
  //   const attachment = composer.attachments[id];
  //   if (attachment.type === 'pin') {
  //     removeAttachment(store, {
  //       workspaceId,
  //       threadId: props.threadId,
  //       eventId: props.eventId,
  //       attachmentId: id,
  //     });
  //   }
  // }
}
