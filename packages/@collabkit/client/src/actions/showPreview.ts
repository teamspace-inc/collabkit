import type { Store, Target, ThreadTarget } from '@collabkit/core';
import { isEqual } from '@collabkit/core';

export function showPreview(store: Store, props: { target: Target }) {
  // console.log('showPreview', props);

  // todo @nc:
  // for some reason on hover, this action is triggered twice
  // for now to avoid doubling the re-renders we check if the target
  // is the same as the one we are already previewing
  if (!isEqual(store.previewingId, props.target)) {
    store.previewingId = props.target;
  }
}
