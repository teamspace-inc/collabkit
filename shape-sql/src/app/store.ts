import { proxy } from 'valtio';

type Store = {
  query: string;
  response: { data: string } | null;
};

export const store = proxy<Store>({
  query: '',
  response: null,
});
