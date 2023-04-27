import { App } from 'octokit';

async function setupLibrary({ OWNER, REPO }: { OWNER: string; REPO: string }) {
  if (
    process.env.SHAPE_ASSISTANT_GITHUB_APP_ID == undefined ||
    process.env.SHAPE_ASSISTANT_GITHUB_PRIVATE_KEY == undefined ||
    process.env.OPENAI_API_KEY == undefined
  ) {
    return null;
  }
  const app = new App({
    appId: process.env.SHAPE_ASSISTANT_GITHUB_APP_ID,
    privateKey: process.env.SHAPE_ASSISTANT_GITHUB_PRIVATE_KEY,
  });
  await app.octokit.rest.apps.getAuthenticated();
  const response = await app.octokit.request(`GET /repos/${OWNER}/${REPO}/installation`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return await app.getInstallationOctokit(response.data.id);
}

export const createIssue = async ({
  owner,
  repo,
  title = '',
  description = '',
  assignees = [],
  labels = [],
  headers = {
    'X-GitHub-Api-Version': '2022-11-28',
  },
}: {
  owner: string;
  repo: string;
  title: string;
  description: string;
  assignees: string[];
  labels: string[];
  headers: {};
}) => {
  const octokit = await setupLibrary({ OWNER: owner, REPO: repo });
  if (!octokit) {
    return 'Problem accessing github repo';
  }
  const res = await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
    owner: owner,
    repo: repo,
    title: title,
    body: description,
    assignees: assignees,
    labels: labels,
    headers: headers,
  });
  if (res.status == 201) {
    return 'Issue created.';
  } else {
    return 'Issue creation failed.';
  }
};

export const getIssues = async ({
  owner,
  repo,
  headers = {
    'X-GitHub-Api-Version': '2022-11-28',
  },
}: {
  owner: string;
  repo: string;
  headers: {};
}) => {
  const octokit = await setupLibrary({ OWNER: owner, REPO: repo });
  if (!octokit) {
    return 'Problem accessing github repo';
  }
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

export const updateIssue = async ({
  owner,
  repo,
  title = '',
  description = '',
  assignees = [],
  labels = [],
  headers = {
    'X-GitHub-Api-Version': '2022-11-28',
  },
  issue_number = undefined,
  state = undefined,
}: {
  owner: string;
  repo: string;
  title: string;
  description: string;
  assignees: string[];
  labels: string[];
  headers: {};
  issue_number: number | undefined;
  state: 'open' | 'closed' | undefined;
}) => {
  const octokit = await setupLibrary({ OWNER: owner, REPO: repo });
  if (!octokit) {
    return 'Problem accessing github repo';
  }
  try {
    await octokit.request(`PATCH /repos/${owner}/${repo}/issues/${issue_number}`, {
      owner: owner,
      repo: repo,
      title: title,
      body: description,
      assignees: assignees,
      labels: labels,
      headers: headers,
      issue_number: issue_number,
      state: state,
    });

    return 'Issue updated.';
  } catch (error) {
    console.error('Could not update issue', error);
    return 'Something went wrong and I could not update the issue.';
  }
};
