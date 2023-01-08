import objectHash from 'object-hash';
import { openai } from './setup.js';
import { Embedding, Query } from './types.js';

export async function getEmbeddingForQuery(query: Query): Promise<Embedding> {
  const { data: embedding } = await openai.createEmbedding({
    input: query.input,
    model: 'text-embedding-ada-002',
  });

  const vector = {
    id: objectHash(query.id),
    metadata: {
      type: 'query' as const,
      input: query.input,
      id: query.id,
      value: query.value,
    },
    values: embedding.data[0].embedding as number[],
  };

  return vector;
}
