import { Store } from '@collabkit/core';
import { useApp } from './useApp';

type AsRef = {
  $$valtioRef: true;
};
type AnyFunction = (...args: any[]) => any;
type Snapshot<T> = T extends AnyFunction
  ? T
  : T extends AsRef
  ? T
  : T extends Promise<infer V>
  ? Snapshot<V>
  : {
      readonly [K in keyof T]: Snapshot<T[K]>;
    };

export function useStore(): Store {
  const { store } = useApp();
  return store;
}
