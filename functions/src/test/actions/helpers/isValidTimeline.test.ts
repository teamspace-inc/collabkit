import { isValidTimeline } from '../../../actions/helpers/isValidTimeline';

describe('isValidTimeline', () => {
  it('anything', () => {
    expect(isValidTimeline(12345)).toBeFalsy();
    expect(isValidTimeline(null)).toBeFalsy();
  });
  it('undefined', () => {
    expect(isValidTimeline(undefined)).toBeFalsy();
  });
  it('blank object', () => {
    expect(isValidTimeline({})).toBeTruthy();
  });
  it('checks all events', () => {
    expect(
      isValidTimeline({
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
        },
        event4: {
          type: 'edit',
          body: 'Hello friend',
          createdById: 'user1',
          createdAt: Date.now(),
          parentId: 'event1',
        },
      })
    ).toBeTruthy();
  });
});
