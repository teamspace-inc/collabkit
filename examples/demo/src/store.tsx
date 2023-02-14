import { User } from './types';
import { proxy, subscribe } from 'valtio';

const initialData =
  typeof window === 'undefined'
    ? { user: null }
    : JSON.parse(window.localStorage?.getItem('store') ?? '{ "user": null }') || { user: null };

export const store = proxy<{ user: User | null }>(initialData);
subscribe(store, () => {
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem('store', JSON.stringify(store));
  }
});
