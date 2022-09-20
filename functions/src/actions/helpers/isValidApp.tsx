import has from 'has';
import { App } from '../../types';

export function isValidApp(data: unknown): data is App {
  if (typeof data === undefined) {
    return false;
  }
  if (typeof data !== 'object') {
    return false;
  }
  if (data === null) {
    return false;
  }

  const nameValid = has(data, 'name') ? typeof data.name === 'string' : true;
  const isEmailDisabledValid = has(data, 'isEmailDisabled')
    ? typeof data.isEmailDisabled === 'boolean'
    : true;
  const logoUrlValid = has(data, 'logoUrl') ? typeof data.logoUrl === 'string' : true;
  const webhookValid = has(data, 'webhook') ? typeof data.webhook === 'string' : true;
  const adminsValid = has(data, 'admins') ? typeof data.admins === 'object' : true;
  const keysValid =
    has(data, 'keys') &&
    typeof data.keys === 'object' &&
    data.keys !== null &&
    Object.keys(data.keys).length > 0 &&
    Object.values(data.keys).every((value) => typeof value === 'boolean');
  const modeValid =
    has(data, 'mode') &&
    typeof data.mode === 'string' &&
    (data.mode === 'SECURED' || data.mode === 'UNSECURED');

  const accentColorValid = has(data, 'accentColor') ? typeof data.accentColor === 'string' : true;

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
