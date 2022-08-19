import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { handleRequest } from '../generateToken';

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
  it('generateToken: appId not provided', async () => {
    const http = mockHttp({ query: { mode: 'UNSECURED' }, body: {} });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
  });

  it('generateToken: apiKey not provided', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId: 'h9UlqR5HPxigSOoj--yL3' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
  });

  it('generateToken: apiKey invalid', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId: 'h9UlqR5HPxigSOoj--yL3', apiKey: 'foo' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" invalid' });
  });

  it('generateToken: generates a token', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId: 'h9UlqR5HPxigSOoj--yL3', apiKey: 'ea7Q5CcwNTPYkZUVy9J5E' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({
      status: 201,
      data: {
        appId: 'h9UlqR5HPxigSOoj--yL3',
        mode: 'UNSECURED',
        token: expect.any(String),
      },
    });
  });
});

describe('SECURED', () => {
  it('generateToken: appId not provided', async () => {
    const http = mockHttp({ query: { mode: 'UNSECURED' }, body: {} });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
  });

  it('generateToken: apiKey not provided', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId: 'QLVIR4HE-wvV_mTjoMJP5' },
      body: {},
    });
    await handleRequest(http.req, http.res);
    const send = http.res.send as sinon.SinonSpy;
    const { args } = send.getCalls()[0];
    expect(args[0]).toEqual({ status: 400, error: '"apiKey" not provided' });
  });

  it('generateToken: apiKey invalid', async () => {
    const http = mockHttp({
      query: { mode: 'UNSECURED', appId: 'QLVIR4HE-wvV_mTjoMJP5', apiKey: 'foo' },
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
      body: { appId: 'QLVIR4HE-wvV_mTjoMJP5', apiKey: 'P7R7nNkFvykMKK17G4URU' },
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
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        apiKey: 'P7R7nNkFvykMKK17G4URU',
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
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        apiKey: 'P7R7nNkFvykMKK17G4URU',
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
    const http = mockHttp({
      query: { mode: 'SECURED' },
      body: {
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        apiKey: 'P7R7nNkFvykMKK17G4URU',
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
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        mode: 'SECURED',
        token: expect.any(String),
        workspaceId: 'acme',
        userId: 'alice',
      },
    });
  });
});
