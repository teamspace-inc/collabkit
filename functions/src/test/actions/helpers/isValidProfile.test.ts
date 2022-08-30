import { isValidProfile } from '../../../actions/helpers/isValidProfile';

describe('isValidProfile', () => {
  it('anything', () => {
    expect(isValidProfile(12345)).toBeFalsy();
    expect(isValidProfile(null)).toBeFalsy();
  });
  it('undefined', () => {
    expect(isValidProfile(undefined)).toBeFalsy();
  });
  it('blank object', () => {
    expect(isValidProfile({})).toBeFalsy();
  });
  it('name', () => {
    expect(isValidProfile({ name: 'Foo' })).toBeTruthy();
  });
  it('avatar', () => {
    expect(isValidProfile({ avatar: 'https://foo.com/avatar.png' })).toBeTruthy();
  });
  it('color', () => {
    expect(isValidProfile({ color: 'red' })).toBeTruthy();
  });
  it('email', () => {
    expect(isValidProfile({ color: 'foo@example.com' })).toBeTruthy();
  });
  it('all attrs', () => {
    expect(
      isValidProfile({
        name: 'Foo',
        avatar: 'https://foo.com/avatar.png',
        color: 'red',
        email: 'foo@example.com',
      })
    ).toBeTruthy();
  });
});
