import { ComposerTarget, Store } from '@collabkit/core';

export function disableSendButton(store: Store, props: { target: ComposerTarget }) {
  store.workspaces[props.target.workspaceId].composers[props.target.threadId].sendButtonDisabled =
    true;
}
