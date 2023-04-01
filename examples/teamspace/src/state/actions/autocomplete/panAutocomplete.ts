import { TLPointerInfo } from '@tldraw/core';
import type { State } from 'state/constants';

export const panAutocomplete = (
  state: State,
  info: TLPointerInfo | { delta: number[]; point?: number[] }
) => {
  if (!state.store.editing.autocomplete) {
    console.warn('[panAutocomplete]: blank autocomplete');
    return;
  }

  const { scrollTop } = state.store.editing.autocomplete;
  const max = (state.store.editing.autocomplete.results.length - 5) * 33;

  let top = (scrollTop ?? 0) - info.delta[1];

  top = Math.min(0, top);
  top = Math.max(top, -max);

  state.store.editing.autocomplete.scrollTop = top;
  state.store.editing.autocomplete.navigatedBy = 'mouse';
};
