import { isValidApp } from '../../../actions/helpers/isValidApp';

describe('isValidApp', () => {
  it('anything', () => {
    expect(isValidApp('foo')).toBeFalsy();
    expect(isValidApp(null)).toBeFalsy();
    expect(isValidApp(undefined)).toBeFalsy();
    expect(isValidApp({})).toBeFalsy();
  });
  it('cashboard (dev)', () => {
    expect(
      isValidApp({
        accentColor: '#36B374',
        emailBatchDelayMs: 1000,
        isEmailDisabled: false,
        keys: {
          Pmma0nDwWysDH_MKdwrwf: true,
          jUM4S6TvXxrdAN7Fi8Voq: true,
        },
        logoUrl:
          'https://firebasestorage.googleapis.com/v0/b/collabkit-dev.appspot.com/o/apps%2Flogos%2FCashboard.png?alt=media&token=28572955-4e60-4fb9-b171-184944027ef8',
        mode: 'UNSECURED',
        name: 'Cashboard (dev)',
      })
    ).toBeTruthy();
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
