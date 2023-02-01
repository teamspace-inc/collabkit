import { createUserToken } from '@collabkit/node';

const token = createUserToken({
  apiKey: '<your API Key here>',
  userId: '<your user ID here>',
  workspaceId: '<your workspace ID here>'
});
