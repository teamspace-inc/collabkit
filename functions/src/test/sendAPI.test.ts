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

it('sendAPI: workspaceId not provided', async () => {
  const http = mockHttp({
    body: { appId: 'h9UlqR5HPxigSOoj--yL3', apiKey: 'ea7Q5CcwNTPYkZUVy9J5E' },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('sendAPI: threadId not provided', async () => {
  const http = mockHttp({
    body: {
      appId: 'h9UlqR5HPxigSOoj--yL3',
      apiKey: 'ea7Q5CcwNTPYkZUVy9J5E',
      workspaceId: 'testid',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('sendAPI: message body not provided', async () => {
  const http = mockHttp({
    body: {
      appId: 'h9UlqR5HPxigSOoj--yL3',
      apiKey: 'ea7Q5CcwNTPYkZUVy9J5E',
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
      appId: 'h9UlqR5HPxigSOoj--yL3',
      apiKey: 'ea7Q5CcwNTPYkZUVy9J5E',
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
      appId: 'h9UlqR5HPxigSOoj--yL3',
      apiKey: 'ea7Q5CcwNTPYkZUVy9J5E',
      workspaceId: 'testid',
      threadId: 'testid',
      body: 'test message',
    },
  });
  await sendAPI(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 200 });
});
