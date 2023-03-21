import type { ChannelToggleShowResolvedTarget, Store } from '@collabkit/core';

export function toggleShowResolved(store: Store, target: ChannelToggleShowResolvedTarget) {
  store.resolvedVisible[target.channelId] = !store.resolvedVisible[target.channelId];
}
