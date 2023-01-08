import { parse } from 'csv/sync';
import { readFileSync } from 'fs';
import { pinecone } from './setup.js';
import pMap from 'p-map';
import { MultiProgressBars } from 'multi-progress-bars';
import type { Transaction, Query } from './types.js';
import { getEmbeddingForTransaction } from './getEmbeddingForTransaction.js';
import { getEmbeddingForQuery } from './getEmbeddingForQuery.js';
import { newTransactionFromRow } from './newTransactionFromRow.js';
import { computeAggregateQueries } from './computeAggregateQueries.js';

export const MAPPING: { [x: string]: string } = {
  'Date (UTC)': 'date',
  'Time (UTC)': 'time',
  Institution: 'institution',
  Contact: 'contact',
  'Account Name': 'accountName',
  Reference: 'reference',
  'Clean reference': 'cleanReference',
  Category: 'category',
  'Orig currency': 'originalCurrency',
  'Orig amount': 'originalAmount',
  'Payment currency': 'paymentCurrency',
  'Payment amount': 'paymentAmount',
};

async function processTransaction(transaction: Transaction) {
  return await getEmbeddingForTransaction(transaction);
}

async function processQuery(query: Query) {
  return await getEmbeddingForQuery(query);
}

export async function compute() {
  const rows = parse(readFileSync('./rebank-transactions-collabkit.csv', 'utf8'), {
    bom: true,
  });
  const header = rows.shift();
  const progress = new MultiProgressBars({
    initMessage: ' QueryKit ',
    anchor: 'top',
    persist: true,
    border: true,
  });

  let task = 'Compute Transaction Vectors';
  progress.addTask(task, { type: 'percentage' });
  let percentage = 0.0;
  let transactions: Transaction[] = [];
  let vectors = await pMap(
    rows,
    async (row: string[]) => {
      percentage += 1 / rows.length;
      progress.updateTask(task, { percentage });
      const transaction = newTransactionFromRow(header, row);
      transactions.push(transaction);
      return await processTransaction(transaction);
    },
    {
      concurrency: 10,
    }
  );
  progress.done(task);
  task = 'Compute Aggregate Queries';
  progress.addTask(task, { type: 'indefinite' });
  const queries = await computeAggregateQueries(transactions);
  progress.done(task);
  task = 'Compute Query Vectors';
  percentage = 0.0;
  progress.addTask(task, { type: 'percentage' });
  const queryVectors = await pMap(
    queries,
    async (query: Query) => {
      percentage += 1 / queries.length;
      progress.updateTask(task, { percentage });
      return await processQuery(query);
    },
    {
      concurrency: 10,
    }
  );
  progress.done(task);
  task = 'Delete all data in Pinecone Index';
  progress.addTask(task, { type: 'indefinite' });
  await fetch(`${process.env.VITE_PINECONE_BASE_URL}/vectors/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': process.env.VITE_PINECONE_API_KEY!,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      deleteAll: true,
    }),
  });
  progress.done(task);
  task = 'Upload to Pinecone';
  progress.addTask(task, { type: 'percentage' });
  percentage = 0.0;
  vectors = vectors.concat(queryVectors);
  const batchedVectors = [];
  while (vectors.length > 0) batchedVectors.push(vectors.splice(0, 50));
  await pMap(
    batchedVectors,
    async (batch) => {
      percentage += 1 / batchedVectors.length;
      progress.updateTask(task, { percentage });
      await pinecone.upsert({ vectors: batch, batchSize: 100 });
    },
    { concurrency: 2 }
  );
  progress.done(task);
  process.exit(0);
}
