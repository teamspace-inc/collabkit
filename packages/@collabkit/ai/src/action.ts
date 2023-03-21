import { openai } from './setup.js';

const query = process.argv[2];

const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `
  For each command, write the json associated with it.

  command: Send 500 dollars to John Doe
  json: {
    type: 'payment',
    amount: 500,
    currency: 'USD',
    to: 'John Doe',
  }

  command: Send an email to John Doe
  json: {
    type: 'email',
    text: null,
    to: 'John Doe',
  }

  command: Connect my Slack to my Github
  json: {
    type: 'connect',
    from: 'Slack',
    to: 'Github',
  }

  command: ${query}
  json:
  `,
  max_tokens: 256,
  temperature: 0,
});

console.log(response.data.choices[0]);
