import { Transaction, Query } from './types.js';

function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

// precompute answers
export async function computeAggregateQueries(transactions: Transaction[]) {
  const references = transactions.map((t) => t.cleanReference).filter(onlyUnique);
  const categories = transactions.map((t) => t.category).filter(onlyUnique);

  let queries: Query[] = [];

  queries = queries.concat(
    references.map((reference) => {
      const matching = transactions.filter((t) => t.cleanReference === reference);
      const sum = matching.reduce(
        (acc, t) => acc + parseFloat(t.originalAmount.replace(',', '').replace('NaN', '0')),
        0
      );
      const input = `Reference: ${reference} in total`;
      const query: Query = {
        id: `sum-reference: ${matching[0].cleanReference}`,
        input,
        transactions: matching,
        value: sum.toFixed(2).toString(),
      };
      return query;
    })
  );

  queries = queries.concat(
    categories.map((category) => {
      const matching = transactions.filter((t) => t.category === category);
      const sum = matching.reduce(
        (acc, t) => acc + parseFloat(t.originalAmount.replace(',', '')),
        0
      );
      const input = `Category: ${sum} in total`;
      const query: Query = {
        id: `sum-category: ${matching[0].category}`,
        input,
        transactions: matching,
        value: sum.toFixed(2).toString(),
      };
      return query;
    })
  );

  queries = queries.concat(
    categories.map((category) => {
      const matching = transactions.filter((t) => t.category === category);
      const sum = matching.reduce(
        (acc, t) => acc + parseFloat(t.originalAmount.replace(',', '')),
        0
      );
      const input = `Category: ${sum} in total`;
      const query: Query = {
        id: `sum-category: ${matching[0].category}`,
        input,
        transactions: matching,
        value: sum.toFixed(2).toString(),
      };
      return query;
    })
  );

  return queries;
}
