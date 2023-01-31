import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { createWorkspaceImpl } from '../createWorkspace';

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

it('createWorkspace: appId not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
});

it('createWorkspace: apiKey not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
    },
  });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
});

it('creatWorkspace: workspaceId not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
    },
  });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"workspaceId" not provided' });
});

it('createWorkspace: apiKey invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: 'appId',
      apiKey: 'apiKey',
    },
    path: '/workspaceId',
  });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
});

it('createWorkspace: workspace not provided', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
    },
    path: '/workspaceId',
  });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error:  '"workspace" not provided' });
});

it('createWorkspace: success', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      apiKey: 'dHchccA9yszQ3EFftTEQm',
    },
    path: '/workspaceId',
  });
  await createWorkspaceImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual('Created/Updated Workspace Successfully.');
});

