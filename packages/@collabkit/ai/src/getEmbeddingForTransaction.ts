import { openai } from './setup.js';
import { Embedding, Transaction } from './types.js';

export async function getEmbeddingForTransaction(transaction: Transaction): Promise<Embedding> {
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
    metadata: { type: 'transaction', ...transaction } as const,
    values: embedding.data[0].embedding as number[],
  };

  return vector;
}
