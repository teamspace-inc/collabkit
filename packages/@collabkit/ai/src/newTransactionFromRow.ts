import objectHash from 'object-hash';
import { MAPPING } from './compute.js';

export function newTransactionFromRow(header: any, row: string[]) {
  const o = header.reduce((obj: any, k: number, i: number) => ({ ...obj, [k]: row[i] }), {});
  const transaction = Object.keys(o).reduce(
    (obj: any, k: string) => ({ ...obj, [MAPPING[k]]: o[k] }),
    {}
  );
  transaction.id = objectHash(transaction);
  return transaction;
}
