import type { Store } from '@collabkit/core';

export function closeEmojiReactionPicker(store: Store) {
  store.reactingId = null;
}
