import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { sendAPI } from '../sendAPI';

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

it('sendAPI: apiKey not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
});

it('sendAPI: appId not provided', async () => {
  const http = mockHttp({ query: {}, body: { apiKey: 'testkey' } });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
});

it('sendAPI: apiKey invalid', async () => {
  const http = mockHttp({ query: {}, body: { apiKey: 'testkey', appId: 'testid' } });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" is invalid' });
});

it('sendAPI: userId invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: 'baduserId',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" is invalid' });
});

it('sendAPI: userId is not in workspace', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '123456789',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" is not in workspace' });
});

it('sendAPI: workspaceId not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('sendAPI: threadId not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'testid',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"threadId" not provided' });
});

it('sendAPI: message body not provided', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'testid',
      threadId: 'testid',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: 'message "body" not provided' });
});

it('sendAPI: body is not a string', async () => {
  const http = mockHttp({
    body: {
      appId: '-3jf3F_LNBbcya2uHr4O_',
      apiKey: 'D3cnLLd29_4wQNeFazjXu',
      userId: '107328433542458292407',
      workspaceId: 'testid',
      threadId: 'testid',
      body: {},
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: 'message "body" is not a string' });
});

it('sendAPI: message sent', async () => {
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
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(typeof args[0]).toBe("string");
});
