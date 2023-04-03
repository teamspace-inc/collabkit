import { TLTarget } from '@tldraw/core';
import { State, Target } from 'state/constants';
import { targetEqual } from 'state/helpers/targetEqual';

export function isEditing(state: State, target: TLTarget | null) {
  let _target = target as Target;

  if (_target == null) {
    return false;
  }

  if (state.currentSpace && _target.type === 'shape') {
    const item = state.currentSpace.items[_target.id];
    if (item.type === 'table') {
      _target = { type: 'table', id: item.docId };
    } else if (item.type === 'card') {
      _target = { type: 'card', id: item.docId };
    }
  }

  return targetEqual(state.store.editing.editingId, _target);
}
