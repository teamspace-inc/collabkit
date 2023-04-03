import { TransactionHistory } from '../src/utils';

describe('TransactionHistory', () => {
  it('can track applied transactions by clientId and transactionId', () => {
    const transactionHistory = new TransactionHistory();

    transactionHistory.add('clientA', 0);
    transactionHistory.add('clientA', 1);
    transactionHistory.add('clientA', 2);
    transactionHistory.add('clientB', 2);

    expect(transactionHistory.has('clientA', 0)).toBe(true);
    expect(transactionHistory.has('clientA', 1)).toBe(true);
    expect(transactionHistory.has('clientA', 2)).toBe(true);
    expect(transactionHistory.has('clientB', 2)).toBe(true);

    expect(transactionHistory.has('clientB', 1)).toBe(false);
    expect(transactionHistory.has('clientX', 1)).toBe(false);
    expect(transactionHistory.has('clientA', NaN)).toBe(false);
  });
});
