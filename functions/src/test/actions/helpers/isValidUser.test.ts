import { isValidUser } from '../../../actions/helpers/isValidUser';

describe('isValidUser', () => {
  it('undefined', () => {
    expect(isValidUser(undefined)).toBeFalsy();
  });
  it('null', () => {
    expect(isValidUser(undefined)).toBeFalsy();
  });
  it('name', () => {
    expect(isValidUser({ name: 'foo' })).toBeTruthy();
  });
  it('email', () => {
    expect(isValidUser({ email: 'foo@example.com' })).toBeTruthy();
  });
  it('avatar', () => {
    expect(isValidUser({ avatar: 'https://example.com/foo.png' })).toBeTruthy();
  });
  it('avatar invalid url', () => {
    expect(isValidUser({ avatar: 'foo' })).toBeFalsy();
  });
});
