import { proxy } from 'valtio';

type Store = {
  query: string;
  response: { 
    data: string;
    thoughts: string[] | null; 
    answer: string | null;
    sql: string | null;
    done: boolean;
  } | null;
};

export const store = proxy<Store>({
  query: '',
  response: null,
});
