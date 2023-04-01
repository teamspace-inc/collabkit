import * as Y from 'yjs';
import { _restoreV2, takeSnapshot, restoreSnapshot, readSnapshot } from '../src/index';
import { proxy } from 'valtio';
import { toUint8Array } from 'js-base64';

describe('ySnapshot', () => {
  describe('takeSnapshot', () => {
    test('takeSnapshot is undefined if doc is empty', () => {
      const s = proxy([]);
      const doc = new Y.Doc({ gc: false });
      const snap = takeSnapshot(s, doc, 'main');
      expect(snap).toBeUndefined();
    });

    test('takeSnapshot creates a snapshot', () => {
      const s = proxy([]);
      const doc = new Y.Doc({ gc: false });
      doc.getMap('items').set('foo', 'bar');
      const snap = takeSnapshot(s, doc, 'main');
      expect(snap).toStrictEqual({
        bn: 'main',
        cid: expect.any(Number),
        id: expect.any(String),
        ts: expect.any(Number),
        y: expect.any(String),
      });
    });

    test('takeSnapshot adds it to provided array', () => {
      const s = proxy([]);
      const doc = new Y.Doc({ gc: false });
      doc.getMap('items').set('foo', 'bar');
      takeSnapshot(s, doc, 'main');
      expect(s[0]).toStrictEqual({
        bn: 'main',
        cid: expect.any(Number),
        id: expect.any(String),
        ts: expect.any(Number),
        y: expect.any(String),
      });
    });
  });

  describe('readSnapshot', () => {
    test('readSnapshot returns a doc', () => {
      const s = proxy([]);
      const doc = new Y.Doc({ gc: false });
      doc.getMap('items').set('foo', 'bar');
      takeSnapshot(s, doc, 'main');
      const newDoc = readSnapshot(s[0], doc);
      expect(newDoc.getMap('items').toJSON()).toStrictEqual({
        foo: 'bar',
      });
    });

    test('takeSnapshot (multiple calls) then readSnapshot', () => {
      const s = proxy([]);
      const doc = new Y.Doc({ gc: false });
      const map = doc.getMap('items');

      map.set('foo', 'bar');
      takeSnapshot(s, doc, 'main');

      map.set('foo', 'hello world');
      takeSnapshot(s, doc, 'main');

      map.set('something else', 'is here');
      takeSnapshot(s, doc, 'main');

      expect(s.length).toBe(3);

      const newDoc = readSnapshot(s[1], doc);
      expect(newDoc.getMap('items').toJSON()).toStrictEqual({
        foo: 'hello world',
      });
    });
  });

  describe('_restoreV2', () => {
    describe('shallow', () => {
      describe('Y.Map', () => {
        test('change -> set', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          map.set('foo', 'bar');
          takeSnapshot(s, doc, 'main');

          map.set('foo', 'hello world');

          expect(map.toJSON()).toStrictEqual({ foo: 'hello world' });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({ foo: 'bar' });
        });

        test('remove -> set new', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          map.set('foo', 'bar');
          takeSnapshot(s, doc, 'main');

          map.set('bar', 'hello world');

          expect(map.toJSON()).toStrictEqual({ foo: 'bar', bar: 'hello world' });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({ foo: 'bar' });
        });

        test('create -> delete', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          map.set('foo', 'bar');
          map.set('bar', 'hello world');
          takeSnapshot(s, doc, 'main');

          map.delete('bar');

          expect(map.toJSON()).toStrictEqual({ foo: 'bar' });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({ foo: 'bar', bar: 'hello world' });
        });
      });

      describe('Y.Array', () => {
        test('remove -> push', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const arr = doc.getArray('items');

          arr.push(['foo', 'bar']);
          takeSnapshot(s, doc, 'main');

          arr.push(['hello', 'world']);

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar', 'hello', 'world']);

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getArray('items'));

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar']);
        });

        test('remove -> insert', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const arr = doc.getArray('items');

          arr.push(['foo', 'bar']);
          takeSnapshot(s, doc, 'main');

          arr.insert(0, ['bar']);

          expect(arr.toJSON()).toStrictEqual(['bar', 'foo', 'bar']);

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getArray('items'));

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar']);
        });

        test('insert -> delete', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const arr = doc.getArray('items');

          arr.push(['foo', 'bar']);
          takeSnapshot(s, doc, 'main');

          arr.delete(1);

          expect(arr.toJSON()).toStrictEqual(['foo']);

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getArray('items'));

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar']);
        });
      });
    });

    describe('nested', () => {
      describe('Y.Map', () => {
        test('one level of nesting', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          const map2 = new Y.Map();
          map2.set('howdy', 'there');

          map.set('foo', map2);

          takeSnapshot(s, doc, 'main');

          (map.get('foo') as Y.Map<any>).set('howdy', 'hey');

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: 'there',
            },
          });
        });

        test('multiple levels of nesting', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          const map3 = new Y.Map();
          map3.set('what', 'up');

          const map2 = new Y.Map();
          map2.set('howdy', map3);

          map.set('foo', map2);

          takeSnapshot(s, doc, 'main');

          (map.get('foo') as Y.Map<any>).set('howdy', 'hey');

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: 'hey',
            },
          });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
              },
            },
          });
        });

        test('multiple levels of nesting, many edits', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          const map3 = new Y.Map();
          map3.set('what', 'up');

          const map2 = new Y.Map();
          map2.set('howdy', map3);

          map.set('foo', map2);
          map.set('another', 'edit');

          takeSnapshot(s, doc, 'main');

          (map.get('foo') as Y.Map<any>).get('howdy').set('foo', 'bar');

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
                foo: 'bar',
              },
            },
            another: 'edit',
          });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
              },
            },
            another: 'edit',
          });
        });

        test('multiple levels of nesting, many edits (contd.)', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          const map3 = new Y.Map();
          map3.set('what', 'up');

          const map2 = new Y.Map();
          map2.set('howdy', map3);

          map.set('foo', map2);
          map.set('another', 'edit');

          takeSnapshot(s, doc, 'main');

          map.set('another', 'foo');
          (map.get('foo') as Y.Map<any>).get('howdy').set('foo', 'bar');
          (map.get('foo') as Y.Map<any>).get('howdy').set('another', 'foo');
          (map.get('foo') as Y.Map<any>).set('foo', 'bar');

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
                foo: 'bar',
                another: 'foo',
              },
              foo: 'bar',
            },
            another: 'foo',
          });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
              },
            },
            another: 'edit',
          });
        });

        test('multiple levels of nesting, creates', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const map = doc.getMap('items');

          const map3 = new Y.Map();
          map3.set('what', 'up');

          const map2 = new Y.Map();
          map2.set('howdy', map3);

          map.set('foo', map2);
          map.set('another', 'edit');

          takeSnapshot(s, doc, 'main');

          map.delete('foo');

          expect(map.toJSON()).toStrictEqual({
            another: 'edit',
          });

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

          expect(map.toJSON()).toStrictEqual({
            foo: {
              howdy: {
                what: 'up',
              },
            },
            another: 'edit',
          });
        });
      });

      describe('Y.Array', () => {
        test('Y.Array inside Y.Array', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const arr = doc.getArray('items');

          const arr2 = new Y.Array();
          arr2.push(['one', 'two']);

          arr.push(['foo', 'bar', arr2]);
          takeSnapshot(s, doc, 'main');

          (arr.get(2) as Y.Array<any>).delete(0);

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar', ['two']]);

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getArray('items'));

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar', ['one', 'two']]);
        });

        test('[Y.Array, Y.Array] inside Y.Array', () => {
          const s = proxy([]);
          const doc = new Y.Doc({ gc: false });
          const arr = doc.getArray('items');

          const arr2 = new Y.Array();
          arr2.push(['one', 'two']);

          const arr3 = new Y.Array();
          arr3.push(['three', 'four']);

          arr.push(['foo', 'bar', arr2, arr3]);
          takeSnapshot(s, doc, 'main');

          (arr.get(2) as Y.Array<any>).delete(0);
          (arr.get(3) as Y.Array<any>).delete(0);

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar', ['two'], ['four']]);

          _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getArray('items'));

          expect(arr.toJSON()).toStrictEqual(['foo', 'bar', ['one', 'two'], ['three', 'four']]);
        });
      });
    });

    describe('complex', () => {
      describe('Y.Map > Y.Array', () => {
        describe('one level of nesting', () => {
          test('push', () => {
            const s = proxy([]);
            const doc = new Y.Doc({ gc: false });
            const map = doc.getMap('items');

            const arr = new Y.Array();
            arr.push(['howdy', 'there']);

            map.set('foo', arr);

            takeSnapshot(s, doc, 'main');

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });

            (map.get('foo') as Y.Array<any>).push(['yo']);

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there', 'yo'],
            });

            _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });
          });

          test('delete', () => {
            const s = proxy([]);
            const doc = new Y.Doc({ gc: false });
            const map = doc.getMap('items');

            const arr = new Y.Array();
            arr.push(['howdy', 'there']);

            map.set('foo', arr);

            takeSnapshot(s, doc, 'main');

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });

            (map.get('foo') as Y.Array<any>).delete(0);

            expect(map.toJSON()).toStrictEqual({
              foo: ['there'],
            });

            _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });
          });

          test('delete all', () => {
            const s = proxy([]);
            const doc = new Y.Doc({ gc: false });
            const map = doc.getMap('items');

            const arr = new Y.Array();
            arr.push(['howdy', 'there']);

            map.set('foo', arr);

            takeSnapshot(s, doc, 'main');

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });

            map.delete('foo');

            expect(map.toJSON()).toStrictEqual({});

            _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });
          });

          test('many', () => {
            const s = proxy([]);
            const doc = new Y.Doc({ gc: false });
            const map = doc.getMap('items');

            const arr = new Y.Array();
            arr.push(['howdy', 'there']);

            map.set('foo', arr);

            takeSnapshot(s, doc, 'main');

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });

            (map.get('foo') as Y.Array<any>).delete(0);

            expect(map.toJSON()).toStrictEqual({
              foo: ['there'],
            });

            _restoreV2(readSnapshot(s[0], doc), doc, (_) => _.getMap('items'));

            expect(map.toJSON()).toStrictEqual({
              foo: ['howdy', 'there'],
            });
          });
        });
      });
    });
  });

  test('takeSnapshot can be restored', async () => {
    const s = proxy([]);
    const doc = new Y.Doc({ gc: false });
    const map = doc.getMap('items');

    map.set('foo', 'bar');
    map.set('foo2', 'bar');
    map.set('foo3', 'bar');
    takeSnapshot(s, doc, 'main');

    map.set('foo2', 'hello world');
    map.set('newFoo', 'hello world');
    map.delete('foo3');
    takeSnapshot(s, doc, 'main');

    {
      expect(
        Y.equalSnapshots(
          Y.decodeSnapshotV2(toUint8Array(s[0].y)),
          Y.decodeSnapshotV2(toUint8Array(s[0].y))
        )
      ).toBe(true);

      expect(
        Y.equalSnapshots(
          Y.decodeSnapshotV2(toUint8Array(s[1].y)),
          Y.decodeSnapshotV2(toUint8Array(s[1].y))
        )
      ).toBe(true);

      expect(
        Y.equalSnapshots(
          Y.decodeSnapshotV2(toUint8Array(s[0].y)),
          Y.decodeSnapshotV2(toUint8Array(s[1].y))
        )
      ).toBe(false);
    }

    await restoreSnapshot(s[0], doc, (snapDoc, mainDoc) =>
      _restoreV2(snapDoc, mainDoc, (_) => _.getMap('items'))
    );

    expect(map.toJSON()).toStrictEqual({
      foo: 'bar',
      foo2: 'bar',
      foo3: 'bar',
    });
  });
});
