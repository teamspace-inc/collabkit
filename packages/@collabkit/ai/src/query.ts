import { pinecone, openai } from './setup.js';
// import TerminalKit from 'terminal-kit';

async function main() {
  const query = process.argv[2];
  const { data: embed } = await openai.createEmbedding({
    input: query,
    model: 'text-embedding-ada-002',
  });

  const vectors = await pinecone.query({
    vector: embed.data[0].embedding,
    topK: 1,
    includeMetadata: true,
    includeValues: false,
  });

  const cells = vectors.matches.map((match) => {
    let result: string[] = [];
    result.push(match.score.toString());
    switch (match.metadata.type) {
      case 'transaction':
        result.push(match.metadata.date);
        result.push(match.metadata.reference);
        result.push(match.metadata.category);
        result.push(match.metadata.accountName);
        result.push(match.metadata.institution);
        result.push(match.metadata.contact);
        result.push(match.metadata.originalCurrency);
        result.push(match.metadata.originalAmount);
        break;
      case 'query':
        result.push(match.metadata.input);
        result.push(match.metadata.value);
        break;
    }
    return result;
  });

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `question: How much did we spend on Github?
    context:  
    Reference: Uber Trip in total -351 USD
    Reference: Github in total -9644 USD
    answer: You spent 9644 USD on Github.
    
    instructions: If the answer is not in context say "I don't know"
    question: How much did we spend at Disneyland?
    context: 
    Reference: Vercel Pro in total -200 USD
    Reference: Disney Plus in total -230 USD
    answer: I don't know
    
    question: ${query}
    context: ${cells[0].join(',')} USD`,
    max_tokens: 256,
    temperature: 0,
  });

  console.log(response.data.choices[0].text?.replace('answer: ', '') ?? "I don't know");

  // TerminalKit.terminal.table(cells);
  // console.log(JSON.stringify(res, null, 2));
}

main().catch((err) => {
  console.error('error', err);
  process.exit(1);
});
