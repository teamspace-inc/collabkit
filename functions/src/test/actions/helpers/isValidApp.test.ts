import { isValidApp } from '../../../actions/helpers/isValidApp';

describe('isValidApp', () => {
  it('anything', () => {
    expect(isValidApp('foo')).toBeFalsy();
    expect(isValidApp(null)).toBeFalsy();
    expect(isValidApp(undefined)).toBeFalsy();
    expect(isValidApp({})).toBeFalsy();
  });

  it('required', () => {
    expect(
      isValidApp({
        name: 'ACME',
        admins: {
          user1: true,
        },
        keys: {
          key1: true,
        },
        mode: 'SECURED',
      })
    ).toBeTruthy();
  });
  it('required + optional', () => {
    expect(
      isValidApp({
        name: 'ACME',
        logoUrl: 'https://example.com/logo.png',
        isEmailDisabled: true,
        accentColor: '#ff0000',
        admins: {
          user1: true,
        },
        keys: {
          key1: true,
        },
        mode: 'SECURED',
      })
    ).toBeTruthy();
  });
});
