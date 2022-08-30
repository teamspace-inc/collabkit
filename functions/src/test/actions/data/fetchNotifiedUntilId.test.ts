import { fetchNotifiedUntilId } from '../../../actions/data/fetchNotifiedUntilId';

describe('fetchNotifiedUntilId', () => {
  it('is set', async () => {
    expect(
      await fetchNotifiedUntilId({
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme',
        profileId: 'jane',
        threadId: 'thread-1',
      })
    ).toStrictEqual('event-1');
  });
  it('is not set', async () => {
    expect(
      await fetchNotifiedUntilId({
        appId: 'QLVIR4HE-wvV_mTjoMJP5',
        workspaceId: 'acme2',
        profileId: 'jane',
        threadId: 'thread-1',
      })
    ).toStrictEqual(undefined);
  });
});
