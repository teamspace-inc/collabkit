import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { handleRequest } from '../generateToken';
import { createUserImpl } from '../createUser';

const mockHttp = (props: { query?: object; body?: object; headers?: object }) => {
  const req = { method:'PUT', headers: { origin: '' }, query: {}, body: {}, ...props } as functions.https.Request;

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
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
});

it('createUser: workspaceId not provided', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('createUser: userId not provided', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" not provided' });
});

it('createUser: user not provided', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" not provided' });
});

it('createUser: user not provided', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
    userId: 'userId',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"user" not provided' });
});


it('createUser: "user" object is invalid', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
    userId: 'userId',
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"user" object is invalid' });
});

it('createUser: "user" object is invalid', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
    userId: 'userId',
    user: {
      name: 'name',
      email: 'email',
    },
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
});

it('createUser: sucess', async () => {
  const http = mockHttp({ query: {}, body: {
    appId: 'appId',
    apiKey: 'apiKey',
    workspaceId: 'workspaceId',
    userId: 'userId',
    user: {
      name: 'name',
      email: 'email',
    },
  } });
  await createUserImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual('Created/Updated User Successfully.');
});