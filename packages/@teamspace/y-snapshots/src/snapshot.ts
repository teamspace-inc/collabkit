import { toUint8Array, fromUint8Array } from 'js-base64';
import * as Y from 'yjs';
import { proxy } from 'valtio';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { bindProxyAndYArray } from 'valtio-yjs';
import { Snapshot } from './types';
import diff from 'microdiff';

type Branch = { [key: string]: string };

// export const branches = proxy<Branch>({});
export const snapshots = proxy<Snapshot[]>([]);
// export const branches = proxy<Branch>();

export function useYSnapshot(doc: Y.Doc) {
  if (!doc) {
    throw new Error('blank Y.Doc passed to useYSnapshot');
  }

  useEffect(() => {
    bindProxyAndYArray(snapshots, doc.getArray('snapshots'), {
      transactionOrigin: () => 'snapshots',
    });
    // bindProxyAndYMap(branches, doc.getMap('branches'), { transactionOrigin: () => 'branches' });
  }, [doc]);
}

export function takeSnapshot(snapshots: Snapshot[], mainDoc: Y.Doc, branchName: string) {
  // console.log('[snap takeSnapshot]', snapshots, mainDoc);
  const prevSnapshot = snapshots.length === 0 ? null : snapshots[snapshots.length - 1];

  const prevSnapshotY =
    prevSnapshot === null ? Y.emptySnapshot : Y.decodeSnapshotV2(toUint8Array(prevSnapshot.y));

  const snapshot = Y.snapshot(mainDoc);

  // !!! todo this is probably needed in practise
  //
  // if (prevSnapshot != null) {
  //   // account for the action of adding a version to Y.Doc
  //   const prevCid = prevSnapshotY.sv.get(prevSnapshot.cid);
  //   if (prevCid) {
  //     prevSnapshotY.sv.set(prevSnapshot.cid, prevCid + 1);
  //   }
  // }

  if (!Y.equalSnapshots(prevSnapshotY, snapshot)) {
    const newSnapshot: Snapshot = {
      ts: new Date().getTime(),
      y: fromUint8Array(Y.encodeSnapshotV2(snapshot)),
      cid: mainDoc.clientID,
      id: nanoid(),
      bn: branchName,
    };

    snapshots.push(newSnapshot);
    return newSnapshot;
  }

  return;
}

// restore snapDoc into mainDoc
// by tranversing the YJS type returned
// by typeFn (.e.g (doc) => doc.getMap('items))
//
// first compute JSON diff
// then for each change
// apply it directly to the mainDoc
export function _restoreV2(
  snapDoc: Y.Doc,
  mainDoc: Y.Doc,
  typeFn: (doc: Y.Doc) => Y.Map<any> | Y.Array<any>
) {
  const snap = typeFn(snapDoc).toJSON();
  const main = typeFn(mainDoc).toJSON();
  const type = typeFn(mainDoc);

  const differences = diff(main, snap);

  mainDoc.transact(
    () => {
      // console.log(differences);

      // because removing an element from
      // an array shortens it, we must keep track
      // of what has been deleted so far
      // and offset the existing path against it
      //
      // arrDelete keeps track of this keyed on
      // the parent path of the array
      let arrDelete = new Map<string, number>();

      for (const diff of differences) {
        let node = type;
        let i = 0;

        for (const key of diff.path) {
          const isLeafNode = i === diff.path.length - 1;
          const isMap = typeof key === 'string';
          const isArr = typeof key === 'number';

          if (isLeafNode) {
            if (node) {
              if (isMap) {
                const mapNode = node as Y.Map<any>;
                switch (diff.type) {
                  case 'CHANGE':
                  case 'CREATE':
                    mapNode.set(key as string, diff.value);
                    break;
                  case 'REMOVE':
                    mapNode.delete(key as string);
                    break;
                }
              } else if (isArr) {
                const arrNode = node as Y.Array<any>;
                switch (diff.type) {
                  case 'CHANGE':
                    arrNode.delete(key as number);
                    arrNode.insert(key as number, [diff.value]);
                    break;
                  case 'REMOVE':
                    const path = diff.path.slice(0, -2).join('.');
                    const arrDeleteCount = arrDelete.get(path) || 0;
                    const deleteIndex = (key as number) - arrDeleteCount;
                    arrNode.delete(deleteIndex as number);
                    arrDelete.set(path, arrDeleteCount + 1);
                    break;
                  case 'CREATE':
                    arrNode.insert(key as number, [diff.value]);
                    break;
                }
              } else {
                console.debug(diff.type, 'unsupported key', key);
              }
            } else {
              console.log('leaf but no node !');
            }
          } else {
            if (isMap) {
              node = (node as Y.Map<any>).get(key as string);
            } else if (isArr) {
              node = (node as Y.Array<any>).get(key as number);
            } else {
              console.debug(diff.type, 'unsupported key', key);
            }
          }

          i += 1;
        }
      }
    },
    { origin: '_restoreV2' }
  );

  return mainDoc;
}

// this doesn't really work !
// it seems to fail to recreate deleted items
//
async function _restore(snapDoc: Y.Doc, mainDoc: Y.Doc, types: Y.AbstractType<any>) {
  // console.log('[snap restore]', snapDoc.toJSON());

  if (types.doc !== snapDoc) {
    throw new Error('tried tracking types not on `src` Y.Doc');
  }

  // generate an origin for this restore
  const origin = `migrate-${nanoid()}`;

  // set up an undo manager to track any changes on snapDoc
  const undoManager = new Y.UndoManager(types, {
    trackedOrigins: new Set([origin]),
    captureTimeout: 0,
  });

  // const undoTracked = new Promise((resolve) => {
  //   undoManager.on('stack-item-added', () => resolve(true));
  // });

  // calculate the diff between snapDoc and mainDoc
  // and apply it to snapDoc
  // this effectively fast-forwards (or rewinds!) the
  // snapDoc to mainDocs state.
  const snapSv = Y.encodeStateVector(snapDoc);
  const snapDiff = Y.encodeStateAsUpdateV2(mainDoc, snapSv);
  Y.applyUpdateV2(snapDoc, snapDiff, origin);
  // console.log('[snap restore] n updates:', undoManager.undoStack.length);

  // await undoTracked;

  // since we set up an undoManager it has
  // captured that update, we now undo it
  // so this means snapDoc now has
  // first been updated to mainDoc and now
  // has an 'inverse' update that undos changes
  for (const _ of undoManager.undoStack) {
    undoManager.undo();
  }

  // we can now update mainDoc with the snapDoc
  // changes, this means mainDoc gets it's own
  // changes applied (no effect), and then the
  // undo, which 'reverts' it's state back to
  // that of snapDoc, effectively moving it
  // back to the snapDoc's state.
  const mainSv = Y.encodeStateVector(mainDoc);

  const mainDiff = Y.encodeStateAsUpdateV2(snapDoc, mainSv);
  Y.applyUpdateV2(mainDoc, mainDiff, `migrate-${origin}-complete`);
  // console.log('[snap restore] applied', snapDoc.toJSON());

  return mainDoc;
}

export function restoreSnapshot(
  snapshot: Snapshot,
  mainDoc: Y.Doc,
  merge: (snapDoc: Y.Doc, mainDoc: Y.Doc) => Y.Doc
) {
  const snapDoc = readSnapshot(snapshot, mainDoc);
  merge(snapDoc, mainDoc);
}

export function readSnapshot(snapshot: Snapshot, mainDoc: Y.Doc) {
  const newDoc = new Y.Doc({ gc: false });
  Y.createDocFromSnapshot(mainDoc, Y.decodeSnapshotV2(toUint8Array(snapshot.y)), newDoc);
  return newDoc;
}
