import { deleteUser } from '@collabkit/node';

await deleteUser({
  appId: '<your app ID>',
  apiKey: '<your API key>',
  userId: '<user ID>',
});
