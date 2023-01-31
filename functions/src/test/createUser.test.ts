import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { createUserImpl } from '../createUser';

const mockHttp = (props: { path?: string; query?: object; body?: object; headers?: object }) => {
  const req = {
    path: '',
    method: 'PUT',
    headers: { origin: '' },
    query: {},
    body: {},
    ...props,
  } as functions.https.Request;

  return {
    req: req,
    res: {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      set: sinon.stub().returnsThis(),
    } as unknown as functions.Response<any>,
  };
};

it('createUser: appId not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
});

it('createUser: apiKey not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
    },
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
});

it('createUser: workspaceId not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
    },
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('createUser: userId not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
      workspaceId: 'workspaceId',
    },
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" not provided' });
});

it('createUser: user not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
      workspaceId: 'workspaceId',
    },
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" not provided' });
});

it('createUser: user not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
      workspaceId: 'workspaceId',
    },
    path: '/userId',
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"user" not provided' });
});

it('createUser: "user" object is invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
      workspaceId: 'workspaceId',
      user: undefined,
    },
    path: '/userId',
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"user" object is invalid' });
});

it('createUser: "apiKey" is invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
      workspaceId: 'workspaceId',
      user: {
        name: 'name',
        email: 'email',
      },
    },
    path: '/userId',
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
});

it('createUser: sucess', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
      workspaceId: 'collabkit',
      user: {
        name: 'name',
        email: 'email',
      },
    },
    path: '/userId',
  });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual('Created/Updated User Successfully.');
});
