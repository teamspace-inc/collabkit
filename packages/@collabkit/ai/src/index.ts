import { Configuration, OpenAIApi } from 'openai';
import { PineconeClient } from 'pinecone-client';
import type { PineconeClient as PineconeClientGeneric, Vector } from 'pinecone-client';

const pinecone = new PineconeClient<any>({
  apiKey: process.env.PINECONE_API_KEY,
  baseUrl: process.env.PINECONE_BASE_URL,
  namespace: process.env.PINECONE_NAMESPACE,
});
