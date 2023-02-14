import { expect, it, describe, beforeEach } from 'vitest';
import sinon from 'sinon';
import * as functions from 'firebase-functions';
import { handleRequest } from '../generateToken';
import admin from 'firebase-admin';
import * as testUtils from '../../../packages/@collabkit/test-utils/src';
import { nanoid } from 'nanoid';

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

it('generateToken: mode not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await handleRequest(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"mode" not provided' });
});

describe('UNSECURED', () => {
  let appId: string;
  let apiKey: string;

  beforeEach(async () => {
    appId = nanoid();
    apiKey = nanoid();
    await testUtils.setupApp({ appId, apiKey });
  });

  it('generateToken: appId not provided', async () => {
    const http = mockHttp({ query: { mode: 'UNSECURED' }, body: {} });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
  });

  it('generateToken: apiKey not provided', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
  });

  it('generateToken: apiKey invalid', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId, apiKey: 'foo' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
  });

  it('generateToken: generates a token', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId, apiKey },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 201,
      data: {
        appId,
        mode: 'UNSECURED',
        token: expect.any(String),
      },
    });
  });
});

describe('SECURED', () => {
  let appId: string;
  let apiKey: string;

  beforeEach(async () => {
    appId = nanoid();
    apiKey = nanoid();
    await testUtils.setupApp({ appId, apiKey });
  });

  it('generateToken: appId not provided', async () => {
    const http = mockHttp({ query: { mode: 'UNSECURED' }, body: {} });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
  });

  it('generateToken: apiKey not provided', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
  });

  it('generateToken: apiKey invalid', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId, apiKey: 'foo' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
  });

  it('generateToken: "workspaceId" not provided', async () => {
    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: { appId, apiKey },
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 400,
      error: '"workspaceId" not provided',
      workspaceId: undefined,
    });
  });

  it('generateToken: "userId" not provided', async () => {
    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: {
        appId,
        apiKey,
        workspaceId: 'acme',
      },
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 400,
      error: '"userId" not provided',
      userId: undefined,
    });
  });

  it('generateToken: "user" not provided', async () => {
    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: {
        appId,
        apiKey,
        workspaceId: 'acme',
        userId: 'alice',
      },
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 400,
      error: '"user" not provided',
      workspaceId: 'acme',
      userId: 'alice',
      user: undefined,
    });
  });

  it('generateToken: generates a token', async () => {
    const workspaceId = 'acme';
    const userId = 'alice';

    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: {
        appId,
        apiKey,
        workspaceId: 'acme',
        userId: 'alice',
        user: { email: 'alice@example.com' },
        workspace: { name: 'Acme' },
      },
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 201,
      data: {
        appId,
        mode: 'SECURED',
        token: expect.any(String),
        workspaceId: 'acme',
        userId: 'alice',
      },
    });

    const profile = await (await admin.database().ref(`profiles/${appId}/${userId}`).get()).val();
    expect(profile).toStrictEqual({ email: 'alice@example.com', color: expect.any(String) });

    const workspace = await (
      await admin.database().ref(`workspaces/${appId}/${workspaceId}`).get()
    ).val();
    expect(workspace).toStrictEqual({
      name: 'Acme',
      profiles: {
        [userId]: true,
      },
    });

    const workspaceProfile = await (
      await admin.database().ref(`views/workspaceProfiles/${appId}/${workspaceId}/${userId}`).get()
    ).val();
    expect(workspaceProfile).toStrictEqual(profile);
  });
});

describe('SECURED workspaceId=default', () => {
  let appId: string;
  let apiKey: string;

  beforeEach(async () => {
    appId = nanoid();
    apiKey = nanoid();
    await testUtils.setupApp({ appId, apiKey });
  });

  it('generateToken: generates a token', async () => {
    console.log('appId', appId);
    const workspaceId = 'default';
    const userId = 'alice';
    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: {
        appId,
        apiKey,
        workspaceId,
        userId,
        user: { email: 'alice@example.com' },
      },
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 201,
      data: {
        appId,
        mode: 'SECURED',
        token: expect.any(String),
        workspaceId: 'default',
        userId: 'alice',
      },
    });

    const profile = await (await admin.database().ref(`/profiles/${appId}/${userId}`).get()).val();
    expect(profile).toStrictEqual({ email: 'alice@example.com', color: expect.any(String) });

    const workspace = await (
      await admin.database().ref(`workspaces/${appId}/${workspaceId}`).get()
    ).val();
    expect(workspace).toBe(null);

    const workspaceProfile = await (
      await admin.database().ref(`views/workspaceProfiles/${appId}/${workspaceId}/${userId}`).get()
    ).val();
    expect(workspaceProfile).toBe(null);
  });
});
