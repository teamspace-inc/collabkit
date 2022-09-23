import { proxy } from 'valtio';

type Store = {
  path: string[];
};

export const store = proxy<Store>({
  path: ['Introduction'],
});
