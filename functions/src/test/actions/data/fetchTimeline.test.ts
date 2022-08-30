import { fetchTimeline } from '../../../actions/data/fetchTimeline';

describe('fetchTimeline', () => {
  it('gets events', async () => {
    const { timeline } = await fetchTimeline({
      appId: 'QLVIR4HE-wvV_mTjoMJP5',
      workspaceId: 'acme',
      threadId: 'thread-1',
    });
    expect(timeline).toStrictEqual({
      'event-1': {
        type: 'message',
        body: 'Hello, world!',
        createdById: 'alice',
        createdAt: 1660844360801,
        id: 'event-1',
      },
    });
  });
});
