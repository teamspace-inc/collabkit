import { isValidSeenByUser } from '../../../actions/helpers/isValidSeenByUser';

describe('isValidSeenByUser', () => {
  it('anything', () => {
    expect(isValidSeenByUser(12345)).toBeFalsy();
    expect(isValidSeenByUser(null)).toBeFalsy();
    expect(isValidSeenByUser({})).toBeFalsy();
  });
  it('just seenUntil', () => {
    expect(
      isValidSeenByUser({
        seenUntilId: 'event1',
      })
    ).toBeFalsy();
  });
  it('just seenAt', () => {
    expect(
      isValidSeenByUser({
        seenAt: 123124345,
      })
    ).toBeFalsy();
  });
  it('incorrect seenUntilId + correct seenAt', () => {
    expect(
      isValidSeenByUser({
        seenUntilId: null,
        seenAt: 1232132134123,
      })
    ).toBeFalsy();
  });
  it('correct seenUntilId + incorrect seenAt', () => {
    expect(
      isValidSeenByUser({
        seenUntilId: 'event1',
        seenAt: 'foo',
      })
    ).toBeFalsy();
  });
  it('correct seenUntilId + correct seenAt', () => {
    expect(
      isValidSeenByUser({
        seenUntilId: 'event1',
        seenAt: 1232132134123,
      })
    ).toBeTruthy();
  });
});
