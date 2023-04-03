import { proxy } from 'valtio';
import { YKeyValue } from 'y-utility/y-keyvalue';
import { applyUpdateV2, Doc } from 'yjs';

import { bindProxyAndYKeyValue } from './bindProxyAndYKeyValue';

type Row = Record<string, number | string>;
type Table = Record<string, Row>;
type TableStore = Record<string, Table>;

describe('bindProxyAndYKeyValue', () => {
  let doc1: Doc;
  let store1: TableStore;

  let doc2: Doc;
  let store2: TableStore;

  let kv1: YKeyValue<any>;
  let kv2: YKeyValue<any>;

  beforeEach(() => {
    doc1 = new Doc({ guid: 'doc1' });
    doc2 = new Doc({ guid: 'doc2' });

    doc1.on('updateV2', (update: Uint8Array) => applyUpdateV2(doc2, update));
    doc2.on('updateV2', (update: Uint8Array) => applyUpdateV2(doc1, update));

    store1 = proxy<TableStore>({});
    store2 = proxy<TableStore>({});
    ({ keyValue: kv1 } = bindProxyAndYKeyValue(store1, doc1.getArray('kv'), () => {}));
    ({ keyValue: kv2 } = bindProxyAndYKeyValue(store2, doc2.getArray('kv'), () => {}));
  });

  test('set', async () => {
    const table1 = {
      row1: {
        species: 'lion',
        totalLength: 200,
        weight: 190,
      },
      row2: {
        species: 'tiger',
        totalLength: 250,
        weight: 300,
      },
    };
    store1.table1 = table1;

    await Promise.resolve();

    expect(store1).toStrictEqual({ table1 });
    expect(store2).toStrictEqual(store1);
    expect(kv1.yarray.toJSON()).toMatchInlineSnapshot(`
      Array [
        Object {
          "key": "table1",
          "val": Object {
            "$$object$$": true,
          },
        },
        Object {
          "key": "table1.row1",
          "val": Object {
            "$$object$$": true,
          },
        },
        Object {
          "key": "table1.row1.species",
          "val": "lion",
        },
        Object {
          "key": "table1.row1.totalLength",
          "val": 200,
        },
        Object {
          "key": "table1.row1.weight",
          "val": 190,
        },
        Object {
          "key": "table1.row2",
          "val": Object {
            "$$object$$": true,
          },
        },
        Object {
          "key": "table1.row2.species",
          "val": "tiger",
        },
        Object {
          "key": "table1.row2.totalLength",
          "val": 250,
        },
        Object {
          "key": "table1.row2.weight",
          "val": 300,
        },
      ]
    `);
  });

  test('set mixed depth', async () => {
    store1.table1 = {
      row1: {
        species: 'lion',
        totalLength: 200,
        weight: 190,
      },
    };
    store1.table1.row2 = {
      species: 'tiger',
      totalLength: 250,
    };
    store1.table1.row2.weight = 300;

    await Promise.resolve();

    expect(store2).toStrictEqual(store1);
  });

  test('delete leaf', async () => {
    store1.table1 = {
      row1: {
        species: 'lion',
        totalLength: 200,
        weight: 190,
      },
    };
    await Promise.resolve();
    expect(store2).toHaveProperty(['table1', 'row1', 'species']);

    delete store1.table1.row1.species;
    await Promise.resolve();
    expect(store2).toStrictEqual({
      table1: { row1: { totalLength: 200, weight: 190 } },
    });
    expect(store2).toStrictEqual(store1);
  });

  test('delete tree', async () => {
    store1.table1 = {
      row1: {
        species: 'lion',
        totalLength: 200,
        weight: 190,
      },
    };
    await Promise.resolve();
    expect(store2).toHaveProperty(['table1', 'row1', 'species']);

    delete store1.table1;
    await Promise.resolve();

    expect(store2).toStrictEqual({});
    expect(store2).toStrictEqual(store1);
    expect(kv1.yarray.toJSON()).toStrictEqual([]);
    expect(kv2.yarray.toJSON()).toStrictEqual([]);
  });

  test('delete subtree', async () => {
    store1.table1 = {
      row1: {
        species: 'lion',
        totalLength: 200,
        weight: 190,
      },
    };
    await Promise.resolve();
    expect(store2).toHaveProperty(['table1', 'row1']);

    delete store1.table1.row1;
    await Promise.resolve();

    expect(store2).not.toHaveProperty(['table1', 'row1']);
  });
});
