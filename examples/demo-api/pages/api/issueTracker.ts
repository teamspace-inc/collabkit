// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { OpenAI } from 'langchain';
import { initializeAgentExecutor } from 'langchain/agents';
import { DynamicTool } from 'langchain/tools';
import { App } from 'octokit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { OWNER, REPO, command } = req.body;
  console.log(process.env.APP_ID, process.env.PRIVATE_KEY, process.env.OPENAI_API_KEY);
  if (
    process.env.APP_ID == undefined ||
    process.env.PRIVATE_KEY == undefined ||
    process.env.OPENAI_API_KEY == undefined
  ) {
    res.status(500).send('Environment not set');
    return;
  }
  const app = new App({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
  });
  const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
  const response = await app.octokit.request(`GET /repos/${OWNER}/${REPO}/installation`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const octokit = await app.getInstallationOctokit(response.data.id);

  const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.2, maxTokens: 1024 });

  // GITHUB API
  const CREATE_ISSUE = async ({
    owner = OWNER,
    repo = REPO,
    title = '',
    description = '',
    assignees = [],
    milestone = null,
    labels = [],
    headers = {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  } = {}) => {
    const res = await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
      owner: owner,
      repo: repo,
      title: title,
      body: description,
      assignees: assignees,
      milestone: milestone,
      labels: labels,
      headers: headers,
    });
    if (res.status == 201) {
      return 'Issue created.';
    } else {
      return 'Issue creation failed.';
    }
  };

  const GET_ISSUES = async ({
    owner = OWNER,
    repo = REPO,
    headers = {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  } = {}) => {
    const res = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
      owner: owner,
      repo: repo,
      headers: headers,
    });
    if (res.status == 200) {
      return res.data;
    } else {
      return 'Issue fetch failed.';
    }
  };

  const UPDATE_ISSUE = async (
    {
      owner = OWNER,
      repo = REPO,
      title = '',
      description = '',
      assignees = [],
      milestone = null,
      labels = [],
      headers = {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      issue_number = undefined,
      state = undefined,
    } = { state: 'open' || 'closed' }
  ) => {
    const res = await octokit.request(`PATCH /repos/${owner}/${repo}/issues/${issue_number}`, {
      owner: owner,
      repo: repo,
      title: title,
      body: description,
      assignees: assignees,
      milestone: milestone,
      labels: labels,
      headers: headers,
      issue_number: issue_number,
      state: state,
    });
    if (res.status == 200) {
      return 'Issue updated.';
    } else {
      return 'Issue updation failed.';
    }
  };

  const tools = [
    new DynamicTool({
      name: 'Create issue',
      description: `Creates a new issue inside the issue tracker. Only use when the action wants to create a new issue. Use labels only when specified. Input should be of format: #"title": "string","description": "string","assignees":["string"],"labels": ["string"]$ . Example input : #title": "create landing page","description": "make a react app and deploy it","assignees":["neetcshah19"],"labels": ["website","html"]$`,
      func: async (input: string) => {
        input = input.replaceAll('#', '{');
        input = input.replaceAll('$', '}');
        console.log(input);
        const args = JSON.parse(input);
        return CREATE_ISSUE(args);
      },
    }),
    new DynamicTool({
      name: 'Get all issues',
      description: `Gets all existing issues. Use this to answers questions about issues. Output is a list of issues of format : [#"issue_number": number,"title": "string","description": "string","state":"string","assignees":["string"],"labels": ["string"]$] . Example output : [#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"open","assignees":["meetcshah19","nc"],"labels": ["website","html"]$,#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","state":"closed","assignees":["meetcshah19","nc"],"labels": ["website","html"]$]`,
      func: async (input: string) => {
        let output: any[] = [];
        let res = await GET_ISSUES();
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
        return UPDATE_ISSUE(args);
      },
    }),
  ];
  const executor = await initializeAgentExecutor(tools, model, 'zero-shot-react-description', true);
  console.log('Loaded agent.');
  const result = await executor.call({ input: command });
  res.status(200).send(result.output);
}
