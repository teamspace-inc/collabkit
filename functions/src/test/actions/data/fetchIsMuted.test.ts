import { fetchIsMuted } from '../../../actions/data/fetchIsMuted';

describe('fetchIsMuted', () => {
  it('is not muted', async () => {
    expect(
      await fetchIsMuted({
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme',
        profileId: 'jane',
        threadId: 'thread-1',
      })
    ).toStrictEqual(false);
  });
});
