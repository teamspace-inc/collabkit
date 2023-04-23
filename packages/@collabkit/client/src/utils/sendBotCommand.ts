const apiHost = 'https://collabkit-demo-api-git-meet-issue-copilot-demo.teamspace.dev'; // todo change this to API_HOST

export async function sendBotCommand({
  command,
  appId,
  workspaceId,
  threadId,
}: {
  command: string;
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  console.log('sendBotCommand', command, appId, workspaceId, threadId);
  try {
    const response = await fetch(`${apiHost}/api/issueCopilotBot`, {
      method: 'POST',
      body: JSON.stringify({
        OWNER: 'meetcshah19',
        REPO: 'relier',
        appId: appId,
        threadId: threadId,
        workspaceId: workspaceId,
        command: command,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    const res = await response.json();
    if (response.ok) {
      return 'Bot command successful';
    } else {
      console.error('Bot command fail', response.status, res);
      throw new Error('Token authentication failed');
    }
  } catch (e) {
    console.error('Bot command fail', e);
  }
}
