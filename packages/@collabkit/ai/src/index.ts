import { parse } from 'csv/sync';
import { readFileSync } from 'fs';
import objectHash from 'object-hash';
// @ts-expect-error
import { pinecone, openai } from './setup.ts';
import pMap from 'p-map';
import { MultiProgressBars } from 'multi-progress-bars';

type Transaction = {
  id: string;
  date: string;
  time: string;
  accountName: string;
  institution: string;
  contact: string;
  reference: string;
  cleanReference: string;
  category: string;
  originalCurrency: string;
  originalAmount: string;
  paymentCurrency: string;
  paymentAmount: string;
};

const MAPPING: { [x: string]: string } = {
  'Date (UTC)': 'date',
  'Time (UTC)': 'time',
  Institution: 'institution',
  Contact: 'contact',
  'Account Name': 'accountName',
  Reference: 'reference',
  'Clean Reference': 'cleanReference',
  Category: 'category',
  'Orig Currency': 'originalCurrency',
  'Orig Amount': 'originalAmount',
  'Payment Currency': 'paymentCurrency',
  'Payment Amount': 'paymentAmount',
};

async function getEmbeddingForTransaction(transaction: Transaction) {
  const { data: embedding } = await openai.createEmbedding({
    input: `
      Reference: ${transaction.cleanReference} 
      Category: ${transaction.category} 
      Contact: ${transaction.contact} 
      AccountName: ${transaction.accountName} 
      Institution: ${transaction.institution} 
      Ammount: ${transaction.originalAmount} ${transaction.originalCurrency}`,
    model: 'text-embedding-ada-002',
  });

  const vector = {
    id: transaction.id,
    metadata: transaction,
    values: embedding.data[0].embedding,
  };

  return vector;
}

async function processRow(header: any, row: string[]) {
  const o = header.reduce((obj: any, k: number, i: number) => ({ ...obj, [k]: row[i] }), {});
  const transaction = Object.keys(o).reduce(
    (obj: any, k: string) => ({ ...obj, [MAPPING[k]]: o[k] }),
    {}
  );
  transaction.id = objectHash(transaction);
  return await getEmbeddingForTransaction(transaction);
}

async function run() {
  const transactions = parse(readFileSync('./rebank-transactions-collabkit.csv', 'utf8'), {
    bom: true,
  });
  const header = transactions.shift();
  const progress = new MultiProgressBars({
    initMessage: ' $ Example Fullstack Build ',
    anchor: 'top',
    persist: true,
    border: true,
  });
  let task = 'Semantic Search';
  progress.addTask(task, { type: 'percentage' });
  let percentage = 0.01;
  const vectors = await pMap(
    transactions,
    async (row: string[]) => {
      percentage += 1 / transactions.length;
      progress.updateTask(task, { percentage });
      return await processRow(header, row);
    },
    {
      concurrency: 10,
    }
  );
  progress.done(task);

  task = 'Upload to Pinecone';
  progress.addTask(task, { type: 'indefinite' });
  await pinecone.upsert({ vectors });
  progress.done(task);
}

run();
