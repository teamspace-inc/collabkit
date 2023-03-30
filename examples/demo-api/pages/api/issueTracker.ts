// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { OpenAI } from 'langchain';
import { initializeAgentExecutor } from 'langchain/agents';
import { DynamicTool } from 'langchain/tools';
import * as fs from 'fs';
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

  const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.5 });

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
      return 'Isuue created.';
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

  const tools = [
    new DynamicTool({
      name: 'Create issue',
      description: `Creates a new issue inside the issue tracker. Only use when the action wants to create a new issue. Input should be of format: #"title": "string","description": "string","labels": ["string"]$ . Example input : #title": "create landing page","description": "make a react app and deploy it","labels": ["website","html"]$`,
      func: async (input: string) => {
        console.log('CREATE ISSUE : ', input);
        input = input.replaceAll('#', '{');
        input = input.replaceAll('$', '}');
        console.log(input);
        const args = JSON.parse(input);
        return CREATE_ISSUE(args);
      },
    }),
    new DynamicTool({
      name: 'Get all issues',
      description: `Gets all existing issues. Use this to answers questions about issues. Output is a list of issues of format : [#"issue_number": number,"title": "string","description": "string","labels": ["string"]$] . Example output : [#"issue_number": 168, "title": "create landing page","description": "make a react app and deploy it","labels": ["website","html"]$]`,
      func: async (input: string) => {
        let output: any[] = [];
        let res = await GET_ISSUES();
        res.forEach((element: { labels: any[]; id: any; title: any; body: any }) => {
          let labelNames: string[] = [];
          element.labels.forEach((label) => {
            if (label.name) labelNames.push(label.name);
          });
          output.push({
            issue_number: element.id,
            title: element.title,
            description: element.body,
            labels: labelNames,
          });
        });
        return JSON.stringify(output).replaceAll('{', '#').replaceAll('}', '$');
      },
    }),
  ];
  const executor = await initializeAgentExecutor(tools, model, 'zero-shot-react-description', true);
  console.log('Loaded agent.');
  const result = await executor.call({ input: command });
  res.status(200).send(result.output);
}
