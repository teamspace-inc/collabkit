import { App } from '../../types';

export function isValidApp(data: any): data is App {
  if (typeof data === undefined) {
    return false;
  }
  if (typeof data !== 'object') {
    return false;
  }
  if (data === null) {
    return false;
  }

  const nameValid = 'name' in data ? typeof data.name === 'string' : true;
  const isEmailDisabledValid =
    'isEmailDisabled' in data ? typeof data.isEmailDisabled === 'boolean' : true;
  const logoUrlValid = 'logoUrl' in data ? typeof data.logoUrl === 'string' : true;
  const webhookValid = 'webhook' in data ? typeof data.webhook === 'string' : true;
  const adminsValid = 'admins' in data && typeof data.admins === 'object';
  const keysValid =
    'keys' in data &&
    typeof data.keys === 'object' &&
    Object.keys(data.keys).length > 0 &&
    Object.values(data.keys).every((value) => typeof value === 'boolean');
  const modeValid =
    'mode' in data &&
    typeof data.mode === 'string' &&
    (data.mode === 'SECURED' || data.mode === 'UNSECURED');

  const accentColorValid = 'accentColor' in data ? typeof data.accentColor === 'string' : true;

  return (
    nameValid &&
    isEmailDisabledValid &&
    logoUrlValid &&
    webhookValid &&
    adminsValid &&
    keysValid &&
    modeValid &&
    accentColorValid
  );
}
