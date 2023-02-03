import type { ComposerTarget, Store } from '@collabkit/core';

export function startSelecting(store: Store, target: ComposerTarget) {
  store.uiState = 'selecting';
  store.composerId = target;
}
