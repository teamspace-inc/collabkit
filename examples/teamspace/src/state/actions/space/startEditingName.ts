import { TLFocusInfo } from '@tldraw/core';
import { EditableTarget, State } from 'state/constants';
import actions from '..';

export const startEditingName = (state: State, info: TLFocusInfo<EditableTarget>) => {
  const { editing } = state.store;
  editing.editingId = info.target;
  editing.selectedIds = [];
  actions.enter(state, 'spaceName.editing');
};
