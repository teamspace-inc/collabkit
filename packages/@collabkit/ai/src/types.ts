export type Transaction = {
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

export type Query = {
  id: string;
  input: string;
  transactions: Transaction[];
  value: string;
};

export type Embedding = {
  id: string;
  metadata: Metadata;
  values: number[];
};

export type QueryMetadata = {
  type: 'query';
  input: string;
  id: string;
  value: string;
};

export type TransactionMetadata = {
  type: 'transaction';
} & Transaction;

export type Metadata = QueryMetadata | TransactionMetadata;
