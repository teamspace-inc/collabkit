import type { PinTarget, Store } from '@collabkit/core';

export function showPinPreview(store: Store, props: { target: PinTarget }) {
    store.previewingPinId = props.target;
}
