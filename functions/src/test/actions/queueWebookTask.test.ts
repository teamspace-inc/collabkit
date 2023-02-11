import { it, describe, expect } from 'vitest';
import sinon from 'sinon';

import { createTask } from '../../actions/helpers/createTask';

const createTaskSpy = sinon.spy(() => {});

import { queueWebhookTask } from '../../actions/queueWebhookTask';

describe('queueWebhookTask', () => {
  it('calls createTask with the right args', async () => {
    await queueWebhookTask(
      {
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme',
        threadId: 'thread-1',
        eventId: 'event-1',
        projectId: 'project-1',
        event: {
          type: 'message',
          body: 'Hello, world!',
          createdById: 'alice',
          createdAt: 1660844360801,
        },
      },
      createTaskSpy as unknown as typeof createTask
    );

    expect(createTaskSpy.getCalls()[0].args).toStrictEqual([
      {
        payload: {
          appId: 'QLVIR4HE-wvV_mTjoMJP5',
          event: {
            body: 'Hello, world!',
            createdAt: 1660844360801,
            createdById: 'alice',
            type: 'message',
          },
          eventId: 'event-1',
          threadId: 'thread-1',
          url: 'https://example.com/webhook',
          workspaceId: 'acme',
        },
        projectId: 'project-1',
        queue: 'webhooks',
        url: 'https://test-api.collabkit.dev/triggerWebhook',
      },
    ]);
  });
});
