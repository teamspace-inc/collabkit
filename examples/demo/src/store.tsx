import { User } from './types';
import { proxy, subscribe } from 'valtio';

export const store = proxy<{ user: User | null }>(
  JSON.parse(localStorage.getItem('store') ?? '{ "user": null }') || { user: null }
);
subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store));
});
