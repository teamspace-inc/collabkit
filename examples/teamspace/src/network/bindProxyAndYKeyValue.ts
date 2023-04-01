import type { Array as YArray } from 'yjs';
import { YKeyValue } from 'y-utility/y-keyvalue';
import { subscribe } from 'valtio/vanilla';

import {
  deepKeys,
  deleteProperty,
  getProperty,
  setProperty,
  stringifyPath,
  isObject,
  joinPaths,
  Path,
  Op,
} from './nestedProperty';

export type Change<T> =
  | { action: 'delete'; oldValue: T }
  | { action: 'update'; oldValue: T; newValue: T }
  | { action: 'add'; newValue: T };

export function bindProxyAndYKeyValue(
  store: any,
  yArray: YArray<{ key: string; val: any }>,
  transactionOrigin: unknown,
  callbacks: {
    onAdded?: (key: string, value: any) => void;
    onProxyChanged?: () => void;
  } = {}
) {
  if (!yArray.doc) {
    throw new Error('[bindProxyAndYKeyValue] no doc');
  }
  const doc = yArray.doc;
  let isUpdatingProxy = true;
  const keyValue = new YKeyValue(yArray);

  // load initial state
  keyValue.map.forEach((kv, _) => {
    if (kv.val?.$$object$$) {
      if (!getProperty(store, kv.key)) {
        setProperty(store, kv.key, {});
      }
    } else {
      setProperty(store, kv.key, kv.val);
    }
  });
  isUpdatingProxy = false;

  keyValue.on('change', kvChanged);

  let promise: Promise<void> | undefined;
  const batchedOps: Op[] = [];
  const unsubscribe = subscribe(
    store,
    ([op]: Op[]) => {
      if (isUpdatingProxy) {
        return;
      }
      batchedOps.push(op);
      if (!promise) {
        promise = Promise.resolve().then(() => {
          promise = undefined;
          proxyChanged(batchedOps.splice(0));
        });
      }
    },
    /* notifyInSync: */ true
  );

  function kvChanged(changes: Map<string, Change<any>>) {
    try {
      isUpdatingProxy = true;
      for (const [key, change] of changes.entries()) {
        switch (change.action) {
          case 'add':
          case 'update': {
            // $$object$$ marks the non-leaf node placeholders that we
            // store in the YKeyValue, but don't pass to the proxy object.
            if (change.newValue == null || !change.newValue.$$object$$) {
              setProperty(store, key, change.newValue);
            }
            break;
          }
          case 'delete': {
            deleteProperty(store, key);
            break;
          }
        }
      }
    } finally {
      isUpdatingProxy = false;
    }
    if (callbacks.onAdded) {
      for (const [key, change] of changes.entries()) {
        if (change.action === 'add') {
          callbacks.onAdded(key, change.newValue);
        }
      }
    }
  }

  function proxyChanged(ops: Op[]) {
    doc.transact(() => {
      for (const op of ops) {
        switch (op[0]) {
          case 'set': {
            setKeyValue(keyValue, op[1], op[2], op[3]);
            break;
          }
          case 'delete': {
            deleteKeyValue(keyValue, op[1], op[2]);
            break;
          }
          default: {
            console.warn('[proxyChanged] ignored op', op);
            break;
          }
        }
      }
    }, transactionOrigin);

    callbacks.onProxyChanged?.();
  }

  return {
    keyValue,
    unsubscribe: () => {
      unsubscribe();
      keyValue.destroy();
    },
  };
}

function setKeyValue(keyValue: YKeyValue<any>, path: Path, value: unknown, prevValue: unknown) {
  const root = stringifyPath(path);

  // Delete any nested keys that previosly existed under this path.
  for (const child of deepKeys(prevValue)) {
    keyValue.delete(joinPaths(root, child.key));
  }

  // Simple case: set a primitive value, no nested keys.
  if (!isObject(value)) {
    keyValue.set(root, value);
    return;
  }

  // Set a placeholder to mark a non-leaf node.
  // (The placeholder is needed to make sure it's possible to delete the parent node later.)
  keyValue.set(root, { $$object$$: true });

  for (const child of deepKeys(value)) {
    if (child.isLeaf) {
      const nestedValue = getProperty(value, child.key);
      keyValue.set(joinPaths(root, child.key), nestedValue);
    } else {
      // Set a placeholder in each non-leaf child.
      keyValue.set(joinPaths(root, child.key), { $$object$$: true });
    }
  }
}

function deleteKeyValue(keyValue: YKeyValue<any>, path: Path, prevValue: unknown) {
  const root = stringifyPath(path);

  // Delete nested keys.
  for (const child of deepKeys(prevValue)) {
    keyValue.delete(joinPaths(root, child.key));
  }
  // Delete the key itself.
  keyValue.delete(root);
}
