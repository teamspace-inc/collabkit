import type { Store } from '@collabkit/core';

export function setPinVisibility({
  store,
  visibility,
}: {
  store: Store;
  visibility: boolean;
}) {
    store.pinsVisible = visibility;
}
