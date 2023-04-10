// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { OpenAI } from 'langchain';
import { initializeAgentExecutor } from 'langchain/agents';
import { DynamicTool } from 'langchain/tools';
import { CREATE_ISSUE, GET_ISSUES, UPDATE_ISSUE } from './helpers/githubApi';
import { CallbackManager } from 'langchain/dist/callbacks';

export async function processCommand({
  OWNER,
  REPO,
  command,
}: {
  OWNER: string;
  REPO: string;
  command: string;
}) {
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
        args.owner = OWNER;
        args.repo = REPO;
        return CREATE_ISSUE(args);
      },
    }),
    new DynamicTool({
      name: 'Get all issues',
      description: `Gets all existing issues. Use this to answers questions about issues. Output is a list of issues of format : [#"issue_number": number,"title": "string","description": "string","state":"string","assignees":["string"],"labels": ["string"]$] . Example output : [#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"open","assignees":["meetcshah19","nc"],"labels": ["website","html"]$,#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"closed","assignees":["meetcshah19","nc"],"labels": ["website","html"]$]`,
      func: async (input: string) => {
        let output: any[] = [];
        let res = await GET_ISSUES({ owner: OWNER, repo: REPO, headers: {} });
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
        args.owner = OWNER;
        args.repo = REPO;
        return UPDATE_ISSUE(args);
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
  if (
    process.env.APP_ID == undefined ||
    process.env.PRIVATE_KEY == undefined ||
    process.env.OPENAI_API_KEY == undefined
  ) {
    res.status(500).send('Environment not set');
    return;
  }
  const { OWNER, REPO, command } = req.body;
  const output = await processCommand({ OWNER, REPO, command });
  res.status(200).send(output);
}
