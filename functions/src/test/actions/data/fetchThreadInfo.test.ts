import { it, describe, expect } from 'vitest';
import { fetchThreadInfo } from '../../../actions/data/fetchThreadInfo';

describe('fetchThreadInfo', () => {
  it('thread info', async () => {
    const threadInfo = await fetchThreadInfo({
      appId: 'QLVIR4HE-wvV_mTjoMJP5',
      workspaceId: 'acme',
      threadId: 'thread-1',
    });
    expect(threadInfo).toStrictEqual({
      name: 'Your first thread',
      url: 'https://example.com',
    });
  });
});
