import { it, expect } from 'vitest';
import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { putUser } from '../user';
import { nanoid } from 'nanoid';

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
  await putUser(http.req, http.res);
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
  await putUser(http.req, http.res);
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
  await putUser(http.req, http.res);
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
  await putUser(http.req, http.res);
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
    path: '/v1/userId',
  });
  await putUser(http.req, http.res);
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
      user: {
        name: {},
      },
    },
    path: '/v1/userId',
  });
  await putUser(http.req, http.res);
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
    path: '/v1/userId',
  });
  await putUser(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 403, error: '"apiKey" invalid' });
});

it('createUser: success', async () => {
  const userId = nanoid();
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
      workspaceId: 'collabkit',
      user: {
        name: 'Firstname Lastname',
        email: 'email@xample.com',
      },
    },
    path: `/v1/${userId}`,
  });
  await putUser(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({
    id: userId,
    name: 'Firstname Lastname',
    email: 'email@xample.com',
    color: expect.stringMatching(/^[a-z]+$/),
  });
});

it('create anonymous user', async () => {
  const userId = nanoid();
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
      workspaceId: 'collabkit',
      user: {},
    },
    path: `/v1/${userId}`,
  });
  await putUser(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({
    id: userId,
    color: expect.stringMatching(/^[a-z]+$/),
  });
});

it('update existing user', async () => {
  const userId = nanoid();
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
      workspaceId: 'collabkit',
      user: {
        name: 'Firstname Lastname',
        email: 'email@xample.com',
      },
    },
    path: `/v1/${userId}`,
  });
  await putUser(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  const createdUser = args[0];

  const httpUpdate = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
      workspaceId: 'collabkit',
      user: {
        name: 'Bob B. Lastname',
        email: 'updated-email@example.org',
      },
    },
    path: `/v1/${userId}`,
  });
  await putUser(httpUpdate.req, httpUpdate.res);
  const updatedUser = (httpUpdate.res.send as sinon.SinonSpy).getCalls()[0].args[0];
  expect(updatedUser).toEqual({
    ...createdUser,
    name: 'Bob B. Lastname',
    email: 'updated-email@example.org',
  });
});
