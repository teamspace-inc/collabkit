import { Store } from '../constants';

export function closeEmojiReactionPicker(store: Store) {
  store.reactingId = null;
}
