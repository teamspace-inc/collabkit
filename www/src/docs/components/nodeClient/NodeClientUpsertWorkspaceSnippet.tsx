import { upsertWorkspace } from '@collabkit/node';

await upsertWorkspace({
  apiKey: '<your API Key here>',
  workspaceId: '<your workspace ID here>',
  appId: '<your app ID here>',
  workspace: {
    name: '<Name of the workspace>',
  },
});
