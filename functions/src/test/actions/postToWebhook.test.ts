import sinon from 'sinon';
import fetch from 'node-fetch';

const fetchSpy = sinon.spy(fetch);

import { postToWebhook } from '../../actions/postToWebhook';

describe('postToWebhook', () => {
  it('calls fetch with the right args', async () => {
    await postToWebhook(
      {
        url: 'https://example.com/webhook',
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme',
        threadId: 'thread-1',
        eventId: 'event-1',
        event: {
          type: 'message',
          body: 'Hello, world!',
          createdById: 'alice',
          createdAt: 1660844360801,
        },
      },
      fetchSpy as unknown as typeof fetch
    );

    expect(fetchSpy.getCalls()[0].args[0]).toStrictEqual('https://example.com/webhook');

    expect(JSON.parse(fetchSpy.getCalls()[0].args[1]?.body?.toString() || '{}')).toStrictEqual({
      action: 'new-event',
      payload: {
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme',
        threadId: 'thread-1',
        eventId: 'event-1',

        event: {
          type: 'message',
          body: 'Hello, world!',
          createdById: 'alice',
          createdAt: 1660844360801,
        },
        context: {
          seenBy: null,
          threadInfo: {
            name: 'Your first thread',
            url: 'https://example.com',
          },
        },
      },
    });

    expect(fetchSpy.getCalls()[0].args[1]?.headers).toStrictEqual({
      'Content-Type': 'application/json',
    });

    expect(fetchSpy.getCalls()[0].args[1]?.method).toStrictEqual('POST');
  });
});
