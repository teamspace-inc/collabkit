import Fuse from 'fuse.js';
import { State } from 'state/constants';
import { isEditing, isInCurrentSpace } from 'state/helpers';
import { IndexItem } from '../../../types';

export function filterSearchResults(result: Fuse.FuseResult<IndexItem>, state: State) {
  return isInCurrentSpace(state, result.item.target);
}

export function filterAutocompleteResults(result: Fuse.FuseResult<IndexItem>, state: State) {
  return (
    result.item.target.type === 'card' &&
    result.item.title &&
    isInCurrentSpace(state, result.item.target) &&
    !isEditing(state, result.item.target)
  );
}
