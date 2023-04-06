import { proxy } from 'valtio';

export const store = proxy<{ token: string | null }>({
  token: null,
});
