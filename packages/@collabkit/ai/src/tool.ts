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

async function chat(assistant: string, command: string) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: assistant },
      { role: 'user', content: command },
    ],
  });
  return completion.data.choices[0].message;
}

async function shell(command: string) {
  let assistant = `You a shell script developer. For a given task you output the zsh command that can be used to complete it. Only write the code. Do not explain how it works. Output markdown.`;
  console.log(await chat(assistant, command));
  process.exit();
}

async function react(command: string) {
  let assistant = `You a React developer. For a given task you output a React Component that can be used to complete it. Only write the code. Do not explain how it works. Output markdown.`;
  console.log(await chat(assistant, command));
  process.exit();
}

// run();
// react('Create a react component that displays a list of Github issues');
shell('find all ts files in the current directory and subdirectories');

// Create a react component that displays a list of Github issues