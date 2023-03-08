import type { Store, ComposerTarget } from '@collabkit/core';

export function setComposer(store: Store, props: { target: ComposerTarget }) {
  store.composerId = props.target;
}
