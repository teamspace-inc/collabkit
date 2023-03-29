import * as functions from 'firebase-functions';
import { App } from 'octokit';

const OPENAI_API_KEY = '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';
const APP_ID = 311155;
const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2dce98/i4DO8Hx1Bn1v4zOUVCUNkWrC0oRbphbUlatmQWCbE
WDMiRzwxzKidJQEaBnszPWqL4byq3SkuZsxDFga6AnxIzbp1lniCetccomLBBN/V
ZenWGVrOUJG51DXg8XbLbpIE5f8EYT+LMRNaEkOUDlX56H/p46EmFycOiOJ9/l1Z
hytJ83WoYpISDQUqyrZban1uAJ6GX8SN3nwIRi3wwzLqIbz/MO4PFG71NZWpwlIJ
mmu0XYHwVHgctdEMrCe85aSimGR3pVV4cZhf5r/ryY/eZhU9gDgS5hwfHp9vBeVm
QIRo/EeZD3uJ++uT5laaGAPUwSt0cZipWoz0oQIDAQABAoIBAFUEIMDkMA4CAtQ9
zcOM2F/Ws8wGsh62wffwgji9hpnZyPyuPIiThDg65NCTqaiscmS/JjM85tS1lhV0
IfjalP/+pg+cQ6mOsJ+F7p5UX4d8dQoa9SSuCvGgP86v4M9SK7TxANnpQOImEaaG
byM7AzcHirvBkCPN8BD3bm8wvfprefmrW++BNaohNpxYY/10VNowXrFTTPJbr66r
5W7mFwZTXAZFcTgO5l/ZUdMBa5S60NLb9f8d0Gjf+hQodiYqLsxU2Ipp+8bbqDFw
1I1Hwd/HpA+aE6GvSP9MVK+HErzOfF/JojJbne/JYO53X/NvmW0S6ki5U/gwjs+f
5hu8XsECgYEA9bdGpyg28PNcMinLvlbgWx8s9/tjW6unjdFXh5i7I/0Xgev87s6H
6OEwYVMw1dl+8hdJyqpChLtM3Axja/X+iUPK0EBAJIGWGUZVpSs3iGPdZXkVI9VZ
IzucOxSOQkq/0oNV19hiLcGP9TvpP+funtsCFyj7OQdOmp2btz8VHvkCgYEA4vUr
9bZ4vrLH/b95yO2pE7S7kx6wjdiljrAKUJTPLOL2R9RNt9lyYL2pqfz74IqyV3wk
aaAuUL8ZdHJVWG8GwrgrEiWsLM7Bzo0HyuLixFvTGjb+wUs2kNlE4ARxOWbp0ZhP
azcZ/bM2YvrQSnhnH7xiwrwSXDGa4bF9bxAu5OkCgYEA46blZ9ODa6QdZECDCxtU
jDgLIsofWPxlpagxz2h64jIICJBK7Dofg2y3tUQtN8RlsAhRjtpF/NHHuQwlRQ5J
wIU1r9IHW4tQNKSMjxXGQrA7nFsdcfClwFXnPnmh/9tfc7vI2c0Z0UjHhq72QQYy
d61zd1+5ujGB6xBhB9sDR4kCgYAUUjd5bLkq+f8GLVrOLtlwtkIFTj4otTk9qW2D
AY/7SOccT1oWGBYxq0nBurEizchiJO9ttbXv7OxujL4viOFmFe9lVJIyAOFBiUcl
V2NOiZpBQqNU01MzbQDJvhwVM63D4otZ4jkliiJYgnSb9mPlZ4zAOu656ocfpjDA
/QX14QKBgAWpcftxlIKw2+YcY8tSkIDXu33NI6B2EUMrE2Co4pDetCosxBivybPl
JYwayCZvcUM7ynwrb573py9QMGssQhghqsdS/c41QFM4r5FQv8GBy15eaPIKZ5Jl
1eUfWf6vWXaQ1U53bFv2qG1EvxFspJpdTiuH5cUQRrRDO4dL7fKf
-----END RSA PRIVATE KEY-----
`;

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export async function issueTrackerImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const { OpenAI } = await import('langchain');
  const { initializeAgentExecutor } = await import('langchain/agents');
  const { DynamicTool } = await import('langchain/tools');

  const { OWNER, REPO, command } = request.body;
  const app = new App({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
  });
  const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
  const res = await app.octokit.request(`GET /repos/${OWNER}/${REPO}/installation`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const octokit = await app.getInstallationOctokit(res.data.id);

  const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.5 });

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
        input = replaceAll(input, '#', '{');
        input = replaceAll(input, '$', '}');
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
        return replaceAll(replaceAll(JSON.stringify(output), '{', '#'), '}', '$');
      },
    }),
  ];
  const executor = await initializeAgentExecutor(tools, model, 'zero-shot-react-description', true);
  console.log('Loaded agent.');
  const result = await executor.call({ command });
  response.send(result.output);
}
export const issueTracker = functions.https.onRequest(async (request, response) => {
  issueTrackerImpl(request, response);
});
