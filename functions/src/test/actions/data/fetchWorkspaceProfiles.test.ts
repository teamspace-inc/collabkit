import { it, describe, expect } from 'vitest';
import { fetchWorkspaceProfiles } from '../../../actions/data/fetchWorkspaceProfiles';

describe('fetchWorkspaceProfiles', () => {
  it('gets profile ids', async () => {
    const profileIds = await fetchWorkspaceProfiles({
      appId: 'h9UlqR5HPxigSOoj--yL3',
      workspaceId: 'ice',
    });
    expect(profileIds).toStrictEqual(['ville']);
  });
});
