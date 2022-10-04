import type { ComposerTarget, Store } from '@collabkit/core';

export function disableComposerCommentButton(store: Store, props: { target: ComposerTarget }) {
  store.workspaces[props.target.workspaceId].composers[props.target.threadId].enabled[
    props.target.eventId
  ] = false;
}
