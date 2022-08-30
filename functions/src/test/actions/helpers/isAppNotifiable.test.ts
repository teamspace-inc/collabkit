import { isAppNotifiable } from '../../../actions/helpers/isAppNotifiable';
import { App } from '../../../types';

describe('isAppNotifiable', () => {
  let app: App;
  beforeEach(() => {
    app = {
      admins: {},
      keys: {},
      mode: 'UNSECURED',
      // isEmailDisabled: true,
      name: 'bar',
      emailBatchDelayMs: 300000,
      // accentColor: '#ff0000',
      // logoUrl: 'https://example.com/logo.png',
    };
  });
  it('is not notifiable by default', () => {
    expect(isAppNotifiable({ app })).toBeFalsy();
  });
  it('is notifiable with accentColor and logoUrl', () => {
    app.accentColor = '#ff0000';
    app.logoUrl = 'https://example.com/logo.png';
    expect(isAppNotifiable({ app })).toBeTruthy();
  });
  it('is not notifiable if isEmailDisabled is true', () => {
    app.isEmailDisabled = true;
    expect(isAppNotifiable({ app })).toBeFalsy();
  });
});
