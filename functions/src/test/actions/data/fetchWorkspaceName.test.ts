import { fetchWorkspaceName } from '../../../actions/data/fetchWorkspaceName';

describe('fetchWorkspaceName', () => {
  it('gets name', async () => {
    const { workspaceName } = await fetchWorkspaceName({
      appId: 'QLVIR4HE-wvV_mTjoMJP5',
      workspaceId: 'acme',
    });
    expect(workspaceName).toStrictEqual('Acme');
  });
});
