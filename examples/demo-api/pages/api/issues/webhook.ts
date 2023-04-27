import type { NextApiRequest, NextApiResponse } from 'next';

import { OpenAI } from 'langchain';
import { initializeAgentExecutor } from 'langchain/agents';
import { DynamicTool } from 'langchain/tools';
import { createIssue, getIssues, updateIssue } from '../helpers/githubApi';
import { CallbackManager } from 'langchain/callbacks';
import { postComment } from '../helpers/postComment';
import { setStatus, clearStatus } from '../helpers/status';

export async function processCommand({
  owner,
  repo,
  command,
}: {
  owner: string;
  repo: string;
  command: string;
}) {
  console.log(`Processing command "${command}"`);
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2,
    maxTokens: 1024,
  });

  const tools = [
    new DynamicTool({
      name: 'Create issue',
      description: `Creates a new issue inside the issue tracker. Only use when the action wants to create a new issue. Use labels only when specified. Input should be of format: #"title": "string","description": "string","assignees":["string"],"labels": ["string"]$ . Example input : #title": "create landing page","description": "make a react app and deploy it","assignees":["meetcshah19"],"labels": ["website","html"]$`,
      func: async (input: string) => {
        input = input.replaceAll('#', '{');
        input = input.replaceAll('$', '}');
        console.log(input);
        const args = JSON.parse(input);
        args.owner = owner;
        args.repo = repo;
        return createIssue(args);
      },
    }),
    new DynamicTool({
      name: 'Get all issues',
      description: `Gets all existing issues. Use this to answers questions about issues. Output is a list of issues of format : [#"issue_number": number,"title": "string","description": "string","state":"string","assignees":["string"],"labels": ["string"]$] . Example output : [#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"open","assignees":["meetcshah19","nc"],"labels": ["website","html"]$,#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"closed","assignees":["meetcshah19","nc"],"labels": ["website","html"]$]`,
      func: async (input: string) => {
        let output: any[] = [];
        let res = await getIssues({ owner: owner, repo: repo, headers: {} });
        res.forEach(
          (element: {
            labels: any[];
            number: any;
            title: any;
            body: any;
            state: any;
            assignees: any[];
          }) => {
            let labelNames: string[] = [];
            element.labels.forEach((label) => {
              if (label.name) labelNames.push(label.name);
            });
            let assigneeNames: string[] = [];
            element.assignees.forEach((assignee) => {
              if (assignee.login) assigneeNames.push(assignee.login);
            });
            output.push({
              issue_number: element.number,
              title: element.title,
              description: element.body,
              labels: labelNames,
              state: element.state,
              assignees: assigneeNames,
            });
          }
        );
        return JSON.stringify(output).replaceAll('{', '#').replaceAll('}', '$');
      },
    }),
    new DynamicTool({
      name: 'Update issue with issue_number',
      description: `Updates an existing issue inside the issue tracker. If issue_number is unknown find it using Get all issues. Only use when the action wants to update an existing issue and the issue_number is known. Use labels only when specified. Input should be of format: #"issue_number":number,"title": "string","description": "string","state":"open or closed","assignees":["string"],"labels":["string"]$ . Example input : #"issue_number":127,"title": "create landing page","description": "make a react app and deploy it","state":"closed","assignees":["meetcshah19","nc"],"labels":["website","html"]$`,
      func: async (input: string) => {
        input = input.replaceAll('#', '{');
        input = input.replaceAll('$', '}');
        console.log(input);
        const args = JSON.parse(input);
        args.owner = owner;
        args.repo = repo;
        return updateIssue(args);
      },
    }),
  ];
  const callbackManager = CallbackManager.fromHandlers({
    async handleLLMNewToken(token: string) {
      console.log('token', { token });
    },
    async handleLLMStart(llm, _prompts: string[]) {
      console.log('handleLLMStart', { llm });
    },
    async handleChainStart(chain) {
      console.log('handleChainStart', { chain });
    },
    async handleAgentAction(action) {
      console.log('handleAgentAction', action);
    },
    async handleToolStart(tool) {
      console.log('handleToolStart', { tool });
    },
  });
  const executor = await initializeAgentExecutor(
    tools,
    model,
    'zero-shot-react-description',
    true,
    callbackManager
  );
  console.log('Loaded agent.');
  const result = await executor.call({ input: command });
  return result.output;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.SHAPE_ASSISTANT_GITHUB_APP_ID) {
    throw new Error('SHAPE_ASSISTANT_GITHUB_APP_ID is not set');
  }
  if (!process.env.SHAPE_ASSISTANT_GITHUB_PRIVATE_KEY) {
    throw new Error('SHAPE_ASSISTANT_GITHUB_PRIVATE_KEY is not set');
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  if (!process.env.SHAPE_ASSISTANT_GITHUB_REPO) {
    throw new Error('SHAPE_ASSISTANT_GITHUB_REPO is not set');
  }
  if (!process.env.SHAPE_ASSISTANT_GITHUB_OWNER) {
    throw new Error('SHAPE_ASSISTANT_GITHUB_OWNER is not set');
  }
  if (!process.env.BOT_API_KEY) {
    throw new Error('BOT_API_KEY is not set');
  }
  if (!process.env.BOT_USER_ID) {
    throw new Error('BOT_USER_ID is not set');
  }

  const { action, payload } = req.body;
  const { appId, event, threadId, workspaceId } = payload;

  if (action !== 'new-event') {
    res.status(200).send(`Ignored action "${action}"`);
    return;
  }
  if (event.type !== 'message') {
    res.status(200).send(`Ignored event type "${payload.event.type}"`);
    return;
  }
  if (appId !== process.env.SHAPE_ASSISTANT_APP_ID) {
    // Limited to one app for now
    // TODO: Support multiple apps. Doing this in a secure way requires authentication for webhooks.
    res.status(200).send(`Ignored event from app "${appId}"`);
    return;
  }

  const owner = process.env.SHAPE_ASSISTANT_GITHUB_OWNER;
  const repo = process.env.SHAPE_ASSISTANT_GITHUB_REPO;

  const props = {
    appId,
    workspaceId,
    threadId,
    userId: process.env.BOT_USER_ID,
    apiKey: process.env.BOT_API_KEY,
  };
  await setStatus(props);
  try {
    const body = await processCommand({ owner, repo, command: payload.event.body });
    const eventId = await postComment({ body, ...props });
    res.status(200).send({ eventId });
  } finally {
    await clearStatus(props);
  }
}
