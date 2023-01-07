import { pinecone, openai } from './setup';

async function main() {
  const query = process.argv[2];
  const { data: embed } = await openai.createEmbedding({
    input: query,
    model: 'text-embedding-ada-002',
  });

  const res = await pinecone.query({
    vector: embed.data[0].embedding,
    topK: 10,
    includeMetadata: true,
    includeValues: false,
  });

  console.log(JSON.stringify(res, null, 2));
}

main().catch((err) => {
  console.error('error', err);
  process.exit(1);
});
