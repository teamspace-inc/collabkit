import { getUserToken } from '../src/getUserToken';

it('getUserToken: gets a token', async () => {
  const response = await getUserToken({
    appId: '-N4l4ZUeP5xdp79y7uAZ',
    apiKey: '-Mtc89OiV1Pc8RHxJmpEN',
    workspaceId: 'acme',
    userId: 'alice',
    user: { email: 'alice@example.com' },
    workspace: { name: 'Acme' },
  });

  expect(response).toStrictEqual({
    status: 201,
    data: {
      appId: '-N4l4ZUeP5xdp79y7uAZ',
      mode: 'SECURED',
      token: expect.any(String),
      workspaceId: 'acme',
      userId: 'alice',
    },
  });
});
