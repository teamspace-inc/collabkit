import { it, expect } from 'vitest';
import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { generateCustomTokenImpl } from '../generateCustomToken';

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

it('generateCustomToken: appId not provided', async () => {
  const http = mockHttp({ query: {}, body: {} });
  await generateCustomTokenImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"appId" not provided' });
});

it('generateCustomToken: userToken invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
    },
  });
  await generateCustomTokenImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userToken" invalid' });
});

it('generateCustomToken: jwt payload Invalid', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.a9YmVM13mRhw2IzFzRLWTabhJ0bahXvpYtgvzQ9SQZI',
    },
  });
  await generateCustomTokenImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"jwt payload" not valid' });
});

it('generateCustomToken: userId not found', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3Jrc3BhY2VJZCI6ImNvbGxhYmtpdCIsInVzZXJJZCI6Im5vaWQifQ.SboXlssz0ARVqsg2af7AAiUsQuhyhoZOVvkF2xtfjOg',
    },
  });
  await generateCustomTokenImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 400, error: '"userId" not found' });
});

it('generateCustomToken: success', async () => {
  const http = mockHttp({
    query: {},
    body: {
      appId: '0mO-P6YhtUwKsZNwnDSt9',
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3Jrc3BhY2VJZCI6ImNvbGxhYmtpdCIsInVzZXJJZCI6Im1lZXRjc2hhaDE5In0.npD9lOG5_hsBUCYKXwpJDoeWsDxautsO0U8SqDBof1w',
    },
  });
  await generateCustomTokenImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual(
    expect.objectContaining({
      status: 201,
    })
  );
});
