import { isValidSeenBy } from '../../../actions/helpers/isValidSeenBy';

describe('isValidSeenBy', () => {
  it('anything', () => {
    expect(isValidSeenBy(12345)).toBeFalsy();
    expect(isValidSeenBy(null)).toBeFalsy();
  });
  it('undefined', () => {
    expect(isValidSeenBy(undefined)).toBeFalsy();
  });
  it('blank object', () => {
    expect(isValidSeenBy({})).toBeTruthy();
  });
  it('checks all users', () => {
    expect(
      isValidSeenBy({
        user1: {
          seenUntilId: 'event1',
          seenAt: 1232132134123,
        },
        user2: {
          seenUntilId: 'event1',
          seenAt: 1232132134123,
        },
        user3: {
          seenUntilId: 'event1',
          seenAt: 1232132134123,
        },
      })
    ).toBeTruthy();
  });
});
