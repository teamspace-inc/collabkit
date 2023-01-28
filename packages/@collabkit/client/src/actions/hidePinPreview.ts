import type { PinTarget, Store } from '@collabkit/core';

export function hidePinPreview(store: Store, props: { target: PinTarget }) {
    store.previewingPinId = null;
}
