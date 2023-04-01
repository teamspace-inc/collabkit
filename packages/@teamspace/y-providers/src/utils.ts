import type { TransactionOrigin } from './types';

export function assert(condition: any, message: string = ''): asserts condition {
  if (!condition) {
    throw new Error(`assert failed ${message} ${condition}`);
  }
}

export function isTypedArray(obj: any) {
  return !!obj && obj.byteLength !== undefined;
}

const DEBUG = window.location.toString().includes('ydebug');

export const log = DEBUG
  ? (action: string, payload: any, level: 'log' | 'debug' = 'log') => {
      const timestamp = new Date().toTimeString().slice(0, 8);

      console.groupCollapsed(
        `[${timestamp}] y%c ${action}%c`,
        `color: #03A9F4; font-weight: bold`,
        `color: inherit; font-weight: normal`
      );

      console[level](`%c y`, `color: #03A9F4; font-weight: bold`, action, payload);

      console.groupEnd();
    }
  : () => {};

export const debug = DEBUG
  ? (action: string, payload: any) => log(action, payload, 'debug')
  : () => {};

export function isValidOrigin(origin: unknown): origin is TransactionOrigin {
  return (
    (typeof origin === 'object' &&
      origin != null &&
      typeof (origin as any).clientId === 'string' &&
      typeof (origin as any).txId === 'number') ??
    false
  );
}

export class TransactionHistory {
  _clients = new Map<string, Set<number>>();

  add(clientId: string, transactionId: number) {
    const transactions = this._clients.get(clientId);
    if (transactions) {
      transactions.add(transactionId);
    } else {
      this._clients.set(clientId, new Set([transactionId]));
    }
  }

  has(clientId: string, transactionId: number) {
    return this._clients.get(clientId)?.has(transactionId) ?? false;
  }
}
