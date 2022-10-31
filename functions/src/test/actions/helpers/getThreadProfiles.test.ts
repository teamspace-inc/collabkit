import { getThreadProfiles } from '../../../actions/helpers/getThreadProfiles';

describe('getThreadProfiles', () => {
  it('getThreadProfiles`', () => {
    expect(
      getThreadProfiles({
        timeline: {
          event1: {
            type: 'message',
            body: 'Hello',
            createdById: 'user1',
            createdAt: Date.now(),
          },
          event2: {
            type: 'reaction',
            body: '+',
            createdById: 'user2',
            createdAt: Date.now(),
            parentId: 'event1',
          },
          event3: {
            type: 'system',
            body: '',
            system: 'resolve',
            createdById: 'user3',
            createdAt: Date.now(),
            parentId: 'event2',
            mentions: {
              user4: true,
            },
          },
          event4: {
            type: 'edit',
            body: 'Hello friend',
            createdById: 'user1',
            createdAt: Date.now(),
            parentId: 'event1',
          },
        },
      })
    ).toStrictEqual(['user1', 'user2', 'user3', 'user4']);
  });
});
