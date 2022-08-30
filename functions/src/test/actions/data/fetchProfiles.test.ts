import { fetchProfiles } from '../../../actions/data/fetchProfiles';

describe('fetchProfiles', () => {
  it('profile does not exist', async () => {
    expect(
      await fetchProfiles({ appId: 'h9UlqR5HPxigSOoj--yL3', profileIds: ['bob'] })
    ).toStrictEqual({
      profiles: {},
    });
  });

  it('profile exists', async () => {
    expect(
      await fetchProfiles({ appId: 'QLVIR4HE-wvV_mTjoMJP5', profileIds: ['jane'] })
    ).toStrictEqual({
      profiles: {
        jane: {
          email: 'jane@example.com',
          color: expect.any(String),
          name: 'Jane',
        },
      },
    });
  });
});
