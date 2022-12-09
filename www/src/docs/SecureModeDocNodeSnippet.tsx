import { getUserToken } from '@collabkit/node';

const response = await getUserToken({
  appId: 'your APP ID here',
  apiKey: 'your API Key here',
  userId: 'jane',
  workspaceId: 'acme',
  user: {
    name: 'Jane Doe', // optional
    email: 'jane@example.com', // optional
    avatar: 'https://example.com/jane.jpg', // optional
  },
  workspace: {
    name: 'ACME Corporation', // optional
  },
});

let token;
if (response?.status === 201) {
  token = response.data.token;
  // pass token to client
} else {
  throw new Error('Failed to generate token');
}
