import { actions, createStore } from '@collabkit/client';
import { reactive } from 'vue';

export type Actions = typeof actions;

export function createVueStore() {
  return reactive(createStore());
}
