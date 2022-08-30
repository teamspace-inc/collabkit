import { isValidNotifiedUntilId } from '../../../actions/helpers/isValidNotifiedUntilId';

describe('isValidNotifiedUntilId', () => {
  it('anything', () => {
    expect(isValidNotifiedUntilId(12345)).toBeFalsy();
    expect(isValidNotifiedUntilId(null)).toBeFalsy();
    expect(isValidNotifiedUntilId({})).toBeFalsy();
  });
  it('undefined', () => {
    expect(isValidNotifiedUntilId(undefined)).toBeTruthy();
  });
  it('string', () => {
    expect(isValidNotifiedUntilId('event1')).toBeTruthy();
  });
});
