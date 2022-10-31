import { App } from '../../types';

export function isAppNotifiable(props: { app: App }) {
  const { app } = props;
  if (app.isEmailDisabled) {
    console.debug('app has email disabled');
    return false;
  }

  if (!app.name) {
    console.debug('app.name is blank');
    return false;
  }

  if (!app.accentColor) {
    console.debug('app.accentColor is blank');
    return false;
  }

  if (!app.logoUrl) {
    console.debug('app.logoUrl is blank');
    return false;
  }

  if (!app.defaultNotificationPreference) {
    console.debug('app.defaultNotificationPreference is blank');
    return false;
  }

  if (app.defaultNotificationPreference === 'off') {
    console.debug('app.defaultNotificationPreference is off');
    return false;
  }

  return true;
}
