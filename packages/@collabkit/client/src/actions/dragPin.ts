import type { Store } from '@collabkit/core';

export function dragPin({
  store,
  visibility,
  pinObjectId
}: {
  store: Store;
  visibility: boolean;
  pinObjectId: string;
}) {
    if (pinObjectId && !visibility) {
      store.dragPinObjectId = pinObjectId;
    } else if (pinObjectId && visibility) {
      store.dragPinObjectId = '';
      store.dragPinUpdate = [];
    }
  
}
