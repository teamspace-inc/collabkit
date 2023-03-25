import { Configuration, OpenAIApi } from 'openai';
import { parse } from 'node-html-parser';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function fetchGithubIssuesDocs() {
  const issuesAPI = await fetch(
    'https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28'
  );
  const html = await issuesAPI.text();
  const root = parse(html);
  return root;
}

// async function scrapeAPI()

async function run() {
  const issuesDocs = await fetchGithubIssuesDocs();
  const fns = issuesDocs.querySelectorAll('.pb-8');

  let text = `You are Github API docs assistant. You are here to help users understand the Github API. You are  currently reading the docs for the \`issues\` endpoint. For a given task you can output a JSON array of API calls to complete it.
  
  Here is the Github Issues API:`;

  for (const fn of fns) {
    const fnName = fn?.querySelector('h2')?.innerText;
    const fnDescription = fn.innerHTML;
    text = `${text} \n${fnName} ${fnDescription}`;
    break;
  }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: text },
      { role: 'user', content: 'I want to create an issue' },
    ],
  });
  console.log(completion.data.choices[0].message);

  process.exit();
}

run();
