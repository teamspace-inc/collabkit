import { upsertUser } from '@collabkit/node';

const status = upsertUser({
  apiKey: '<your API Key here>',
  userId: '<your user ID here>',
  workspaceId: '<your workspace ID here>',
  appId: '<your app ID here>',
  user: {
    name: '<Name of the user>',
    email: '<Email of the user>',
    avatar: '<Avatar URL of the user>',
  }
});
