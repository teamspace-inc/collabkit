import { Configuration, OpenAIApi } from 'openai';
import { PineconeClient } from 'pinecone-client';
import { loadEnv } from 'vite';
import { Metadata } from './types.js';

// load env variables
Object.assign(process.env, {
  ...process.env,
  ...loadEnv('development', './../../../env'),
});

const pinecone = new PineconeClient<Metadata>({
  apiKey: process.env.VITE_PINECONE_API_KEY,
  baseUrl: process.env.VITE_PINECONE_BASE_URL,
  namespace: process.env.VITE_PINECONE_NAMESPACE,
});

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  })
);

export { pinecone, openai };
