import { TLPointerInfo } from '@tldraw/core';
import type { State, TextCardTarget } from 'state/constants';

export const selectSearchResult = (state: State, info: TLPointerInfo<TextCardTarget>) => {
  state.store.search.selectedId = info.target;
};
