import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { comment } from '../comment';

const mockHttp = (props: { query?: object; body?: object; headers?: object }) => {
  const req = { headers: { origin: '' }, query: {}, body: {}, ...props } as functions.https.Request;

  return {
    req: req,
    res: {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      set: sinon.stub().returnsThis(),
    } as unknown as functions.Response<any>,
  };
};

it('comment: apiKey not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
});

it('comment: appId not provided', async () => {
  const http = mockHttp({ query: {}, body: { apiKey: 'testkey' } });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
});

it('comment: apiKey invalid', async () => {
  const http = mockHttp({ query: {}, body: { apiKey: 'testkey', appId: 'testid' } });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" is invalid' });
});

it('comment: userId invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: 'baduserId',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" is invalid' });
});

it('comment: workspaceId not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('comment: userId is not in workspace', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '123456789',
      workspaceId: 'collabkit',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" is not in workspace' });
});

it('comment: threadId not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'collabkit',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"threadId" not provided' });
});

it('comment: message body not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'collabkit',
      threadId: 'testid',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: 'message "body" not provided' });
});

it('comment: body is not a string', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'collabkit',
      threadId: 'testid',
      body: {},
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: 'message "body" is not a string' });
});

it('comment: message sent', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      userId: '107328433542458292407',
      workspaceId: 'collabkit',
      threadId: 'new-your-thread-id2',
      body: 'test',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
    },
  });
  await comment(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(typeof args[0]).toBe('string');
});
